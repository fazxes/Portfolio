import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const posts = defineCollection({
    name: "posts",
    directory: "content",
    include: "**/*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        summary: z.string(),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm, remarkCodeMeta],
        });
        const words = document.content.trim().split(/\s+/).length;
        return {
        ...document,
            slug: document._meta.path.replace(/\.mdx$/, ""),
            readTime: `${String(Math.max(1, Math.ceil(words / 200)))} min read`,
            mdx,
        };
    },
});

// Agent skills for /skills. Each file is a skill's SKILL.md with a few extra
// frontmatter fields. Plain Markdown, not MDX: skill text often contains `<` and
// `{`, which MDX would try to parse. The body is rendered on the /skills/[slug] page.
const skills = defineCollection({
    name: "skills",
    directory: "content/skills",
    include: "*.md",
    schema: z.object({
        name: z.string(),
        /** The skill's own description, written for agents (when to use it). */
        description: z.string(),
        /** One plain sentence for people: list rows, meta description, previews. */
        summary: z.string(),
        author: z.string(),
        /** Written by me (vs. someone else's skill I use). */
        mine: z.boolean().default(false),
        license: z.string().optional(),
        licenseUrl: z.url().optional(),
        /** Required with someone else's MIT/Apache text, e.g. "Copyright (c) 2025 Siqi Chen". */
        copyright: z.string().optional(),
        /** The skill's folder upstream; relative links in the README resolve against it. */
        source: z.url().optional(),
        install: z.string().optional(),
        /** Other files the skill ships with (references, scripts), when they aren't published anywhere. */
        files: z.array(z.string()).default([]),
        /** Position in the Daily list (1 = used most). Omit for skills I don't use daily. */
        daily: z.number().int().positive().optional(),
        content: z.string(),
    }),
    transform: (document) => ({
        ...document,
        slug: document._meta.path.replace(/\.md$/, ""),
        description: document.description.trim(),
    }),
});

export default defineConfig({
    collections: [posts, skills],
});

