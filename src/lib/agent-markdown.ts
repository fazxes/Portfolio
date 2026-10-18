import type { allPosts } from "content-collections";
import { DATA } from "@/data/resume";
import { getAllPosts } from "@/lib/blog";
import { allSkillsByName, isIndexed, type Skill } from "@/lib/skills";

/**
 * Plain-Markdown versions of the site for agents, following the llms.txt proposal
 * (llmstxt.org): /llms.txt is a short index, and each page has an index.md copy.
 * Google Search ignores these files; agents and other AI tools read them.
 */

type Post = (typeof allPosts)[number];

const abs = (path: string) => new URL(path, DATA.url).toString();
const mdUrl = (path: string) => abs(`${path.replace(/\/$/, "")}/index.md`);

/**
 * A Markdown response. With `canonical`, a Link header points Google at the HTML
 * page so the copy never competes with it; without one, the file is noindex.
 */
export function markdownResponse(body: string, options: { canonical?: string; type?: string } = {}) {
  const headers = new Headers({ "Content-Type": `${options.type ?? "text/markdown"}; charset=utf-8` });
  if (options.canonical) {
    headers.set("Link", `<${abs(options.canonical)}>; rel="canonical"`);
  } else {
    headers.set("X-Robots-Tag", "noindex");
  }
  return new Response(body, { headers });
}

const lines = (...parts: Array<string | false | undefined>) =>
  `${parts.filter((part): part is string => typeof part === "string").join("\n")}\n`;

function writingsList(): string[] {
  return getAllPosts().map(
    (post) => `- [${post.title}](${post.external ? post.href : mdUrl(post.href)}): ${post.description}`,
  );
}

function skillsList(): string[] {
  return allSkillsByName().map((skill) => `- [${skill.name}](${mdUrl(`/skills/${skill.slug}`)}): ${skill.summary}`);
}

/** /llms.txt: who this is, then where the detail lives. */
export function llmsTxt(): string {
  const social = DATA.contact.social;
  return lines(
    `# ${DATA.name}`,
    "",
    `> ${DATA.description}`,
    "",
    DATA.summary,
    "",
    "## About",
    "",
    `- [Profile](${abs("/index.md")}): Bio, work history, projects, writings, and skills in one file`,
    "",
    "## Writings",
    "",
    ...writingsList(),
    "",
    "## Skills",
    "",
    ...skillsList(),
    "",
    "## Optional",
    "",
    `- [GitHub](${social.GitHub.url}): Code and open-source projects`,
    `- [X](${social.X.url}): Posts`,
    `- [Sitemap](${abs("/sitemap.xml")}): Every page meant for search engines`,
  );
}

/** /index.md: the home page as one profile document. */
export function homeMarkdown(): string {
  const social = DATA.contact.social;
  return lines(
    `# ${DATA.name}`,
    "",
    `> ${DATA.description}`,
    "",
    DATA.summary,
    "",
    `Elsewhere: [X](${social.X.url}) · [GitHub](${social.GitHub.url}) · [Email](mailto:${DATA.contact.email})`,
    "",
    "## Journey",
    "",
    ...DATA.work.flatMap((job) => [
      `### ${job.title}, [${job.company}](${job.href}) (${job.start} to ${job.end})`,
      "",
      job.description,
      "",
    ]),
    "## Projects",
    "",
    ...DATA.projects.map((project) => {
      const extra = project.links.filter((link) => link.href !== project.href);
      const links = extra.length > 0 ? ` (${extra.map((link) => `[${link.type}](${link.href})`).join(", ")})` : "";
      return `- [${project.title}](${project.href}), ${project.dates}: ${project.description}${links}`;
    }),
    "",
    "## Writings",
    "",
    ...writingsList(),
    "",
    "## Skills",
    "",
    ...skillsList(),
  );
}

/** /skills/<slug>/index.md: the details, then the skill itself. */
export function skillMarkdown(skill: Skill): string {
  const license = skill.license && (skill.licenseUrl ? `[${skill.license}](${skill.licenseUrl})` : skill.license);
  return lines(
    `# ${skill.name}`,
    "",
    `> ${skill.summary}`,
    "",
    `- Author: ${skill.author}`,
    license && `- License: ${license}${skill.copyright ? ` (${skill.copyright})` : ""}`,
    skill.source && `- Source: ${skill.source}`,
    skill.install && `- Install: \`${skill.install}\``,
    skill.files.length > 0 && `- Also ships with: ${skill.files.join(", ")}`,
    "",
    "## When an agent uses it",
    "",
    skill.description,
    "",
    "---",
    "",
    skill.content.trim(),
  );
}

export const skillMarkdownCanonical = (skill: Skill) => (isIndexed(skill) ? `/skills/${skill.slug}` : undefined);

/** /blog/<slug>/index.md: the post's Markdown, with interactive figures replaced by a pointer. */
export function postMarkdown(post: Post): string {
  const page = abs(`/blog/${post.slug}`);
  const body = post.content.replace(/^\s*<[A-Z]\w*[^>]*\/>\s*$/gm, `_(Interactive figure: see ${page})_`);
  return lines(
    `# ${post.title}`,
    "",
    `> ${post.summary}`,
    "",
    `By ${DATA.name}. Published ${post.publishedAt}${post.updatedAt ? `, updated ${post.updatedAt}` : ""}.`,
    "",
    body.trim(),
  );
}
