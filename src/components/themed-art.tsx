/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

/**
 * Transparent card art that ships one file per theme:
 * `${src}-light.webp` and `${src}-dark.webp` (see `public/cards/`).
 */
export function ThemedArt({
  src,
  alt,
  className,
  onError,
}: {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
}) {
  return (
    <>
      <img
        src={`${src}-light.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(className, "dark:hidden")}
        onError={onError}
      />
      <img
        src={`${src}-dark.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(className, "hidden dark:block")}
        onError={onError}
      />
    </>
  );
}
