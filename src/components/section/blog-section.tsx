/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

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
    return (
      <div className="w-full aspect-video bg-muted" />
    );
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

export default function BlogSection() {
  return (
    <section id="blog" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Blog</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Writing on AI-native dev
            </h2>
            <p className="text-muted-foreground text-pretty text-center md:text-lg">
              Deep dives, reality checks, and announcements from the Orbit blog.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DATA.blog.slice(0, 4).map((post, idx) => (
            <BlurFade
              key={post.href}
              delay={BLUR_FADE_DELAY * 14 + idx * 0.03}
            >
              <Link
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-xl border border-border overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200"
              >
                <div className="relative shrink-0 overflow-hidden">
                  <PostThumbnail src={post.image} alt={post.title} />
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <time className="tabular-nums">
                          {formatDate(post.date)}
                        </time>
                        <span aria-hidden>&middot;</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" aria-hidden />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm">
                        {post.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-none mt-0.5"
                      aria-hidden
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
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
            </BlurFade>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View more
            <ArrowUpRight className="size-3" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
