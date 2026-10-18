/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { ThemedArt } from "@/components/themed-art";
import { PostMeta, postLinkProps } from "@/components/section/blog-post-meta";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function PostThumbnail({
  src,
  art,
  alt,
  className,
}: {
  src: string;
  art: string;
  alt: string;
  className?: string;
}) {
  const [artError, setArtError] = useState(false);
  const [error, setError] = useState(false);
  const imageClass = cn("w-full aspect-video object-cover", className);

  if (!artError) {
    return (
      <ThemedArt
        src={art}
        alt={alt}
        className={imageClass}
        onError={() => { setArtError(true); }}
      />
    );
  }

  if (!src || error) {
    return <div className={cn(imageClass, "bg-muted")} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={imageClass}
      onError={() => { setError(true); }}
    />
  );
}

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.href}
      {...postLinkProps(post)}
      className="group flex h-full flex-col overflow-hidden rounded-xl shadow-(--shadow-border) transition-shadow duration-150 ease-out hover:shadow-(--shadow-border-hover)"
    >
      <div className="relative shrink-0 overflow-hidden">
        <PostThumbnail src={post.image} art={post.art} alt={post.title} />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <PostMeta post={post} />
            <h3 className="font-semibold text-sm leading-snug">{post.title}</h3>
          </div>
          {post.external && (
            <ArrowUpRight
              className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-none mt-0.5"
              aria-hidden
            />
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
