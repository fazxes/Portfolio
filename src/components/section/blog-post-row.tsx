import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostMeta, postLinkProps } from "@/components/section/blog-post-meta";
import type { BlogPost } from "@/lib/blog";

/**
 * Compact list entry: title, date, and read time. Server-rendered; it needs no
 * JavaScript in the browser.
 * Hover is instant on purpose: when the pointer sweeps down the list, fading
 * rows trail behind it. Rows sit flush (no gap) so the highlight never drops
 * out between them.
 */
export function BlogPostRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={post.href}
      {...postLinkProps(post)}
      className="group flex items-center gap-4 rounded-xl px-3 py-2.5 hover:bg-muted/60 focus-visible:bg-muted/60"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-sm font-medium leading-snug text-pretty">{post.title}</h3>
        <PostMeta post={post} />
      </div>
      {post.external && (
        <ArrowUpRight
          className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground"
          aria-hidden
        />
      )}
    </Link>
  );
}
