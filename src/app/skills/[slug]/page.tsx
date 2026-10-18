import { CopyButton } from "@/components/copy-button";
import { breadcrumbs, JsonLd } from "@/components/json-ld";
import { DATA } from "@/data/resume";
import { remarkAgentTags } from "@/lib/remark-agent-tags";
import { getSkill, isIndexed, resolveSkillHref } from "@/lib/skills";
import { allSkills } from "content-collections";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Every skill is prerendered; an unknown slug hits notFound() below and gets a 404,
// like /blog/[slug]. (dynamicParams = false gives the same 404 but logs a server error.)
export function generateStaticParams() {
  return allSkills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) {return undefined;}
  const title = `${skill.name} skill`;
  const description = skill.summary;
  return {
    title,
    description,
    alternates: {
      canonical: `/skills/${slug}`,
      // Markdown copy for agents (llms.txt convention).
      types: { "text/markdown": `/skills/${slug}/index.md` },
    },
    // Someone else's skill stays out of Google's index; links on it are still followed.
    ...(isIndexed(skill) ? {} : { robots: { index: false, follow: true } }),
    openGraph: { title, description, type: "article", url: `${DATA.url}/skills/${slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;
const linkClass = "font-medium text-foreground underline underline-offset-4";

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) {notFound();}

  const readme = skill.content.trim();
  const details: Array<[string, ReactNode]> = [["Author", skill.author]];
  if (skill.license) {
    details.push([
      "License",
      skill.licenseUrl ? (
        <a href={skill.licenseUrl} {...externalLink} className={linkClass}>{skill.license}</a>
      ) : (
        skill.license
      ),
    ]);
  }
  if (skill.source) {
    details.push([
      "Source",
      <a key="source" href={skill.source} {...externalLink} className={`${linkClass} inline-flex items-center gap-0.5`}>
        {skill.source.replace(/^https:\/\/github\.com\//, "").replace("/tree/main", "")}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>,
    ]);
  }
  // The skill's own description is what an agent reads to decide when to use it.
  details.push(["For agents", <span key="description" className="text-muted-foreground">{skill.description}</span>]);
  if (skill.files.length > 0) {
    details.push([
      "Files",
      <ul key="files" className="flex flex-col gap-0.5 font-mono text-[13px] text-muted-foreground">
        {skill.files.map((file) => <li key={file}>{file}</li>)}
      </ul>,
    ]);
  }

  return (
    <section id="skill">
      <JsonLd data={breadcrumbs(DATA.url, [["Skills", "/skills"], [skill.name, `/skills/${slug}`]])} />
      <Link href="/skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group">
        <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" aria-hidden />
        Back to Skills
      </Link>
      <div className="flex flex-col gap-4">
        <h1 className="title font-mono font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {skill.name}
        </h1>
        <p className="text-pretty leading-relaxed text-muted-foreground">{skill.summary}</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          {details.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="min-w-0">{value}</dd>
            </div>
          ))}
        </dl>
        {skill.install && (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 py-1.5 pl-4 pr-1.5">
            <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] leading-8">
              {/* the prompt isn't part of the command: not selectable, not copied */}
              <code><span className="select-none text-muted-foreground" aria-hidden>$ </span>{skill.install}</code>
            </pre>
            <CopyButton text={skill.install} label={`Copy install command for ${skill.name}`} />
          </div>
        )}
      </div>
      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      {readme ? (
        <>
          {!skill.mine && (
            // MIT and Apache 2.0 both require the notice to travel with copied text.
            <p className="mb-6 text-xs text-muted-foreground">
              Reproduced from the original{skill.license ? ` under the ${skill.license} license` : ""}.
              {skill.copyright ? ` ${skill.copyright}.` : ""}
            </p>
          )}
          {/* Plain Markdown rendered on the server. Raw HTML never runs: prompt-tag blocks like
              <HARD-GATE> become callouts, and any other HTML shows as text. */}
          <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown
              remarkPlugins={[remarkGfm, remarkAgentTags]}
              components={{
                // The page title is the h1, so README headings move down one level.
                h1: "h2",
                h2: "h3",
                h3: "h4",
                h4: "h5",
                // Tables get their own look here (not-prose skips the blog's table styles):
                // a framed box, quiet header, row rules only, and cells that wrap so the
                // table stays inside the column. Rows aren't clickable, so no hover.
                table: ({ children }) => (
                  <div className="not-prose my-6 overflow-hidden rounded-xl border border-border">
                    {/* code in cells: plain mono, no pill; tables here are mostly code */}
                    <table className="w-full border-collapse text-left text-[13px] leading-relaxed [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:text-foreground">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-muted/40">{children}</thead>,
                tbody: ({ children }) => <tbody className="[&>tr:last-child>td]:border-b-0">{children}</tbody>,
                th: ({ children, style }) => (
                  <th style={style} className="border-b border-border px-3 py-2 align-bottom font-medium text-foreground">
                    {children}
                  </th>
                ),
                td: ({ children, style }) => (
                  <td
                    style={style}
                    className="border-b border-border/60 px-3 py-2.5 align-top text-muted-foreground [overflow-wrap:anywhere] first:text-foreground"
                  >
                    {children}
                  </td>
                ),
                // A real block for fenced code; only long lines scroll sideways.
                pre: ({ children }) => (
                  <div className="not-prose my-5 rounded-xl border border-border bg-muted/40">
                    <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground/90">
                      {children}
                    </pre>
                  </div>
                ),
                a: ({ href, children }) => {
                  const target = resolveSkillHref(skill, href);
                  // A file that ships with the skill but isn't published: name it, don't link it.
                  return target ? <a href={target}>{children}</a> : <span>{children}</span>;
                },
              }}
            >
              {readme}
            </Markdown>
          </article>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          The full instructions aren&apos;t reproduced here because of their license.
          {skill.source && (
            <>
              {" "}
              <a href={skill.source} {...externalLink} className={linkClass}>Read them on the original</a>.
            </>
          )}
        </p>
      )}
    </section>
  );
}
