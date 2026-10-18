import { BlogPostRow } from "@/components/section/blog-post-row";
import { getAllPosts } from "@/lib/blog";

export default function BlogSection() {
  const posts = getAllPosts();

  return (
    <section id="blog" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        {/* the pill is the section heading */}
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <h2 className="border bg-primary z-10 rounded-xl px-4 py-1 text-background text-sm font-medium">
            Writings
          </h2>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        {/* the whole section fades in from page.tsx; rows don't animate one by one */}
        <div className="flex flex-col">
          {posts.map((post) => (
            <BlogPostRow key={post.href} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
