import BlurFade from "@/components/magicui/blur-fade";
import BlogPostCard from "@/components/section/blog-post-card";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";

export const metadata: Metadata = {
  title: "Writings",
  description: "What I've learned building and benchmarking developer tools.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Writings",
    description: "What I've learned building and benchmarking developer tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Writings",
    description: "What I've learned building and benchmarking developer tools.",
  },
};

const PAGE_SIZE = 8;
const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const posts = getAllPosts();

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(posts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <section id="blog">
      {/* the only way back to the homepage, now that the dock is gone */}
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group">
        <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" aria-hidden />
        Back home
      </Link>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Writings
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {posts.length} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          What I&apos;ve learned building and benchmarking developer tools.
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.href} post={post} />
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
