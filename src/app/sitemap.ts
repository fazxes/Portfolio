import type { MetadataRoute } from "next";
import { allPosts } from "content-collections";
import { DATA } from "@/data/resume";
import { allSkillsByName, isIndexed } from "@/lib/skills";

// lastModified only where there's a real date: Google ignores lastmod values that
// aren't accurate, and "now" on every build isn't.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${DATA.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  // Only pages that may be indexed; someone else's skill is noindex.
  const skills: MetadataRoute.Sitemap = allSkillsByName()
    .filter(isIndexed)
    .map((skill) => ({ url: `${DATA.url}/skills/${skill.slug}` }));

  return [
    { url: DATA.url },
    { url: `${DATA.url}/blog` },
    ...posts,
    { url: `${DATA.url}/skills` },
    ...skills,
  ];
}
