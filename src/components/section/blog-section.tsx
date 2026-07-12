import BlurFade from "@/components/magicui/blur-fade";
import BlogPostCard from "@/components/section/blog-post-card";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 4);

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
              Deep dives, reality checks, and announcements.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post, idx) => (
            <BlurFade
              key={post.href}
              delay={BLUR_FADE_DELAY * 14 + idx * 0.03}
            >
              <BlogPostCard post={post} />
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
