import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";

export interface BlogPost {
  title: string;
  href: string;
  date: string;
  description: string;
  image: string;
  /** Base path of the transparent card art; see `ThemedArt`. */
  art: string;
  readTime: string;
  tags: readonly string[];
  external: boolean;
}

const cardArt = (slug: string) => `/cards/blog/${slug}`;

export function getAllPosts(): BlogPost[] {
  const external: BlogPost[] = DATA.blog.map((post) => ({
    ...post,
    art: cardArt(post.href.slice(post.href.lastIndexOf("/") + 1)),
    external: true,
  }));

  const local: BlogPost[] = allPosts.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug}`,
    date: post.publishedAt,
    description: post.summary,
    image: post.image ?? `/blog/${post.slug}/opengraph-image`,
    art: cardArt(post.slug),
    readTime: post.readTime,
    tags: post.tags,
    external: false,
  }));

  return [...external, ...local].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
