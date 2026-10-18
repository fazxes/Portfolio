import { BlogPostRow } from "@/components/section/blog-post-row";
import { getAllPosts } from "@/lib/blog";

export default function BlogSection() {
  const posts = getAllPosts();

  return (
    <section id="blog">
      <div className="flex min-h-0 flex-col gap-y-6 w-full">
        {/* same heading style as About and Journey */}
        <h2 className="text-xl font-semibold">Writings</h2>
        {/* the whole section fades in from page.tsx; rows don't animate one by one.
            -mx-3 offsets the rows' px-3, so titles line up with the heading and the
            hover highlight extends just past the edge. */}
        <div className="-mx-3 flex flex-col">
          {posts.map((post) => (
            <BlogPostRow key={post.href} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
