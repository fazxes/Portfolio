"use client"

import React, { useEffect, useRef } from "react"

import { resolveRgb } from "@/lib/resolve-color"
import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  /** Chance per second that a square changes. */
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

// The flicker reads the same at 10 fps as at 60, for a fraction of the work.
const FRAME_INTERVAL_MS = 100
// Squares snap to these opacity steps so fill styles are built once, not per draw.
const LEVELS = 8

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!container || !canvas || !ctx) {return}

    const cell = squareSize + gridGap
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let fills: string[] = []
    let levels = new Uint8Array(0)
    let rows = 0
    let dpr = 1
    let frame = 0
    let lastTick = 0
    let inView = false

    const buildFills = () => {
      const [r, g, b] = resolveRgb(color ?? "var(--foreground)")
      fills = Array.from(
        { length: LEVELS },
        (_, i) => `rgba(${r}, ${g}, ${b}, ${(maxOpacity * i) / (LEVELS - 1)})`
      )
    }

    const fillSquare = (i: number) => {
      const level = levels[i] ?? 0
      if (level === 0) {return}
      ctx.fillStyle = fills[level] ?? ""
      ctx.fillRect(
        Math.floor(i / rows) * cell * dpr,
        (i % rows) * cell * dpr,
        squareSize * dpr,
        squareSize * dpr
      )
    }

    const drawAll = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < levels.length; i++) {fillSquare(i)}
    }

    const resize = () => {
      const w = width ?? container.clientWidth
      const h = height ?? container.clientHeight
      dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      rows = Math.floor(h / cell)
      levels = Uint8Array.from(
        { length: Math.floor(w / cell) * rows },
        () => Math.floor(Math.random() * LEVELS)
      )
      drawAll()
    }

    const tick = (time: number) => {
      frame = requestAnimationFrame(tick)
      const elapsed = time - lastTick
      if (elapsed < FRAME_INTERVAL_MS) {return}
      lastTick = time

      // Same rate as before (flickerChance per square per second), but only
      // the squares that change are repainted.
      const changes = Math.round(levels.length * Math.min(1, flickerChance * (elapsed / 1000)))
      const s = squareSize * dpr
      for (let n = 0; n < changes; n++) {
        const i = Math.floor(Math.random() * levels.length)
        levels[i] = Math.floor(Math.random() * LEVELS)
        ctx.clearRect(Math.floor(i / rows) * cell * dpr, (i % rows) * cell * dpr, s, s)
        fillSquare(i)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const sync = () => {
      if (inView && !reducedMotion.matches) {
        if (!frame) {
          lastTick = performance.now()
          frame = requestAnimationFrame(tick)
        }
      } else {
        stop()
      }
    }

    buildFills()
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false
      sync()
    })
    intersectionObserver.observe(canvas)
    // `color` defaults to var(--foreground), which changes with the theme class.
    const themeObserver = new MutationObserver(() => {
      buildFills()
      drawAll()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    reducedMotion.addEventListener("change", sync)

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      reducedMotion.removeEventListener("change", sync)
    }
  }, [squareSize, gridGap, flickerChance, color, width, height, maxOpacity])

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  )
}
