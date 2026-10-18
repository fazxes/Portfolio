import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;

const Dock = ({ className, children }: DockProps) => (
  <div className={cn("mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border", className)}>
    {children}
  </div>
);

// Hover grow is plain CSS. The scale sits on the outer wrapper so the caller's
// own transition classes (colors) don't override it.
const DockIcon = ({ className, children }: DockIconProps) => (
  <div
    style={{ width: BASE_SIZE, height: BASE_SIZE }}
    className="flex shrink-0 transition-transform duration-150 ease-out hover:scale-110 motion-reduce:transition-none"
  >
    <div className={cn("relative flex aspect-square items-center justify-center rounded-full", className)}>
      <div style={{ width: BASE_ICON_SIZE, height: BASE_ICON_SIZE }} className="flex items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
