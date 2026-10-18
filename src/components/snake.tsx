"use client";

import { resolveRgb } from "@/lib/resolve-color";
import { newGame, step, type SnakeGame } from "@/lib/snake";
import { useEffect, useRef } from "react";

const CELL = 12; // px per grid cell
const ROWS = 10;
const STEP_MS = 110; // about 9 moves a second
const RESTART_MS = 1200; // hold the last frame before a new round
const FOOD = "rgb(232, 106, 79)"; // coral, like the accents in the card art

/**
 * Decorative Snake that plays itself on a transparent canvas. Kept cheap: it
 * redraws only when the snake moves, pauses off screen, and shows one still
 * frame when the visitor prefers reduced motion.
 */
export function Snake() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) {return;}

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let game: SnakeGame = newGame(3, ROWS);
    let rgb = resolveRgb("var(--foreground)");
    let frame = 0;
    let last = 0;
    let restartAt = 0;
    let inView = false;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, game.cols * CELL, game.rows * CELL);

      ctx.fillStyle = FOOD;
      ctx.beginPath();
      ctx.arc(
        (game.food % game.cols) * CELL + CELL / 2,
        Math.floor(game.food / game.cols) * CELL + CELL / 2,
        CELL / 2 - 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Head at full strength, fading toward the tail.
      const [r, g, b] = rgb;
      game.body.forEach((cell, i) => {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1 - (i / game.body.length) * 0.6})`;
        ctx.fillRect((cell % game.cols) * CELL + 1, Math.floor(cell / game.cols) * CELL + 1, CELL - 2, CELL - 2);
      });
    };

    const layout = () => {
      const cols = Math.max(3, Math.floor(wrap.clientWidth / CELL));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = cols * CELL * dpr;
      canvas.height = ROWS * CELL * dpr;
      canvas.style.width = `${cols * CELL}px`;
      game = newGame(cols, ROWS);
      // Reduced motion: show a snake that has already eaten a few times.
      if (reducedMotion) {
        for (let i = 0; i < 80; i++) {game = step(game) ?? game;}
      }
      draw();
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - last < STEP_MS) {return;}
      last = now;
      if (restartAt) {
        if (now < restartAt) {return;}
        restartAt = 0;
        game = newGame(game.cols, game.rows);
      } else {
        const next = step(game);
        if (!next) {
          restartAt = now + RESTART_MS;
          return;
        }
        game = next;
      }
      draw();
    };
    const start = () => {
      if (!frame && inView && !reducedMotion) {frame = requestAnimationFrame(tick);}
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    layout();
    let width = wrap.clientWidth;
    const resize = new ResizeObserver(() => {
      if (wrap.clientWidth === width) {return;}
      width = wrap.clientWidth;
      layout();
    });
    resize.observe(wrap);
    const view = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      if (inView) {start();} else {stop();}
    });
    view.observe(canvas);
    const theme = new MutationObserver(() => {
      rgb = resolveRgb("var(--foreground)");
      draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      resize.disconnect();
      view.disconnect();
      theme.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full">
      {/* height set up front so the box doesn't jump when the script loads */}
      <canvas ref={canvasRef} aria-hidden="true" className="mx-auto block" style={{ height: ROWS * CELL }} />
    </div>
  );
}
