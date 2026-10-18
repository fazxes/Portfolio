"use client";

import { cn } from "@/lib/utils";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const OPTIONS = [
  { value: "system", label: "System theme", icon: Monitor },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: MoonStar },
] as const;

const subscribe = () => () => undefined;

/** System / light / dark segmented switch. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  // The server can't know the visitor's choice, so nothing is marked selected until hydration.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div
      role="group"
      aria-label="Theme"
      // 24px tall overall (20px buttons + 1px padding + 1px border), matching the
      // 24px icon links beside it. gap-1 puts button centers 24px apart, which keeps
      // the 20px buttons within the minimum tap-target spacing.
      className={cn("inline-flex items-center gap-1 rounded-full border p-px", className)}
    >
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const selected = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={selected}
            title={label}
            onClick={() => { setTheme(value); }}
            className={cn(
              "flex size-5 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
              selected && "bg-muted text-foreground shadow-(--shadow-border)",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
