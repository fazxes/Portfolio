/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ArrowUpRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Deep dives, reality checks, and announcements from the Orbit blog.",
  openGraph: {
    title: "Blog",
    description: "Deep dives, reality checks, and announcements from the Orbit blog.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Deep dives, reality checks, and announcements from the Orbit blog.",
  },
};

const PAGE_SIZE = 8;
const BLUR_FADE_DELAY = 0.04;

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const posts = [...DATA.blog].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(posts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Blog
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {posts.length} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Deep dives, reality checks, and announcements from the Orbit blog.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paginatedPosts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.href}>
              <Link
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-xl border border-border overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200"
              >
                <div className="relative shrink-0 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-video object-cover"
                  />
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
                      <h3 className="font-semibold text-sm leading-snug">
                        {post.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground group-hover:text-foreground transition-colors flex-none mt-0.5"
                      aria-hidden
                    />
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
            </BlurFade>
          ))}
        </div>
      </BlurFade>

      {pagination.totalPages > 1 && (
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex gap-3 flex-row items-center justify-between mt-8">
            <div className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex gap-2 sm:justify-end">
              {pagination.hasPreviousPage ? (
                <Link
                  href={`/blog?page=${pagination.page - 1}`}
                  className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Previous
                </Link>
              ) : (
                <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                  Previous
                </span>
              )}
              {pagination.hasNextPage ? (
                <Link
                  href={`/blog?page=${pagination.page + 1}`}
                  className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Next
                </Link>
              ) : (
                <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
