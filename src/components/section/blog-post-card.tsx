/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostThumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <div className="w-full aspect-video bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full aspect-video object-cover"
      onError={() => { setError(true); }}
    />
  );
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.href}
      target={post.external ? "_blank" : undefined}
      rel={post.external ? "noopener noreferrer" : undefined}
      className="group flex flex-col h-full rounded-xl border border-border overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200"
    >
      <div className="relative shrink-0 overflow-hidden">
        <PostThumbnail src={post.image} alt={post.title} />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <time className="tabular-nums">{formatDate(post.date)}</time>
              <span aria-hidden>&middot;</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden />
                {post.readTime}
              </span>
            </div>
            <h3 className="font-semibold text-sm leading-snug">{post.title}</h3>
          </div>
          {post.external && (
            <ArrowUpRight
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-none mt-0.5"
              aria-hidden
            />
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              className="text-[11px] font-medium border border-border h-6 w-fit px-2"
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
