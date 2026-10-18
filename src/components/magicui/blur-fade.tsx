import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface BlurFadeTiming {
  /** Seconds. */
  duration?: number;
  /** Seconds. */
  delay?: number;
  /** Pixels the element slides down from. */
  yOffset?: number;
  blur?: string;
}

/** Custom properties read by the `.blur-fade` keyframes in globals.css. */
function blurFadeStyle({ duration = 0.4, delay = 0, yOffset = 6, blur = "6px" }: BlurFadeTiming): CSSProperties {
  return {
    "--blur-fade-duration": `${duration}s`,
    "--blur-fade-delay": `${delay}s`,
    "--blur-fade-y": `${-yOffset}px`,
    "--blur-fade-blur": blur,
  } as CSSProperties;
}

interface BlurFadeProps extends BlurFadeTiming {
  children: ReactNode;
  className?: string;
}

/**
 * One-shot entrance (fade, slide, blur) in plain CSS: it starts with the first
 * paint, needs no JavaScript, and leaves no filter behind once it finishes.
 */
const BlurFade = ({ children, className, delay = 0, ...timing }: BlurFadeProps) => (
  <div className={cn("blur-fade", className)} style={blurFadeStyle({ ...timing, delay: 0.04 + delay })}>
    {children}
  </div>
);

export default BlurFade;
