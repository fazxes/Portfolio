/* eslint-disable @next/next/no-img-element */
"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  imageFit: "cover" | "contain";
  domain: string;
}

const PREVIEWS = DATA.linkPreviews as Record<string, LinkPreviewData>;

function hostFromHref(href: string): string | null {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkPreview({ href, children, className }: Props) {
  const host = hostFromHref(href);
  const preview = host ? PREVIEWS[host] : undefined;

  const anchor = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );

  if (!preview) {
    return anchor;
  }

  return (
    <HoverCard openDelay={120} closeDelay={100}>
      <HoverCardTrigger asChild>{anchor}</HoverCardTrigger>
      <HoverCardContent side="top" align="start" className="p-0">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block no-underline"
        >
          <div
            className={cn(
              "relative aspect-[1200/630] w-full overflow-hidden",
              preview.imageFit === "contain" ? "bg-black" : "bg-muted",
            )}
          >
            <img
              src={preview.image}
              alt=""
              className={cn(
                "size-full",
                preview.imageFit === "contain"
                  ? "object-contain"
                  : "object-cover",
              )}
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/55 to-transparent dark:from-black/55" />
          </div>
          <div className="flex flex-col gap-2 p-3.5">
            <div className="text-base font-semibold tracking-tight text-foreground line-clamp-1">
              {preview.title}
            </div>
            <p className="text-sm text-pretty text-muted-foreground line-clamp-2">
              {preview.description}
            </p>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted px-2 py-0.5 font-mono text-[0.625rem] tracking-wide tabular-nums text-muted-foreground">
                {preview.domain}
              </div>
              <ArrowUpRight
                className="ml-auto size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </div>
          </div>
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
