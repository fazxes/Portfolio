import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export interface BlogPost {
  title: string;
  href: string;
  date: string;
  description: string;
  image: string;
  readTime: string;
  tags: readonly string[];
  external: boolean;
}

export function getAllPosts(): BlogPost[] {
  const external: BlogPost[] = DATA.blog.map((post) => ({
    ...post,
    external: true,
  }));

  const local: BlogPost[] = allPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    date: post.publishedAt,
    description: post.summary,
    image: post.image ?? `/blog/${post.slug}/opengraph-image`,
    readTime: post.readTime,
    tags: post.tags,
    external: false,
  }));

  return [...external, ...local].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
