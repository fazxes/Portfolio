import { markdownResponse, postMarkdown } from "@/lib/agent-markdown";
import { allPosts } from "content-collections";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) {return new Response("Not found", { status: 404 });}
  return markdownResponse(postMarkdown(post), { canonical: `/blog/${slug}` });
}
