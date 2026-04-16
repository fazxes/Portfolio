/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => { setImageError(true); }}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  links?: ReadonlyArray<{
    icon: React.ReactNode;
    type: string;
    href: string;
  }>;
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  const targetHref = href ?? "#";
  return (
    <div className={cn("relative h-full", className)}>
      <Link
        href={targetHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title}`}
        className="flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200 group"
      >
        <div className="relative shrink-0">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
        </div>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{title}</h3>
              <time className="text-xs text-muted-foreground">{dates}</time>
            </div>
            <ArrowUpRight
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
              aria-hidden
            />
          </div>
          <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                  variant="outline"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
      {links && links.length > 0 && (
        <div className="absolute top-2 right-2 flex flex-wrap gap-2 z-10">
          {links.map((link, idx) => (
            <Link
              href={link.href}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
                className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                variant="default"
              >
                {link.icon}
                {link.type}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
