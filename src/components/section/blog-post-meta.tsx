import { Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Date and read time, shared by the Writings rows and the /blog cards. */
export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <time className="tabular-nums">{formatDate(post.date)}</time>
      <span aria-hidden>&middot;</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3" aria-hidden />
        {post.readTime}
      </span>
    </div>
  );
}

export function postLinkProps(post: BlogPost) {
  return post.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
