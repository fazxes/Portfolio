/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import BlogSection from "@/components/section/blog-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { LinkPreview } from "@/components/link-preview";
import { Snake } from "@/components/snake";
import { Icons, type IconProps } from "@/components/icons";
import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

const BLUR_FADE_DELAY = 0.04;

const ABOUT_LINKS: Array<{
  label: string;
  href: string;
  icon?: (props: IconProps) => React.JSX.Element;
  /** Per-icon size so they read the same: the X glyph fills its box, the mail outline has padding. */
  iconClassName?: string;
  external?: boolean;
}> = [
  { label: "X", href: DATA.contact.social.X.url, icon: Icons.x, iconClassName: "size-3.5", external: true },
  { label: "Email", href: `mailto:${DATA.contact.email}`, icon: Icons.email, iconClassName: "size-[18px]" },
  // page still to be built
  { label: "Skills", href: "/skills" },
];

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const personJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  image: DATA.avatarUrl,
  description: DATA.description,
  sameAs: [DATA.contact.social.GitHub.url, DATA.contact.social.X.url],
}).replace(/</g, "\\u003c");

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: personJsonLd }}
      />
      <section id="about">
        {/* The name is the page's main heading for search engines and screen
            readers; visitors read it in the first line of the bio instead. */}
        <h1 className="sr-only">{DATA.name}</h1>
        {/* flow-root contains the floated photo; the bio wraps beside it, then
            runs full width like the old About paragraph. */}
        <BlurFade delay={BLUR_FADE_DELAY} className="flow-root">
          {/* plain img: shows on first paint instead of waiting for JS to load it */}
          <img
            src={DATA.avatarImage}
            alt={DATA.name}
            width={128}
            height={128}
            fetchPriority="high"
            className="float-right mb-2 ml-6 size-24 md:size-32 rounded-full object-cover shadow-lg ring-4 ring-muted"
          />
          <h2 className="text-xl font-semibold">About</h2>
          <div className="prose mt-4 max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown
              components={{
                a: ({ href, children, className }) => (
                  <LinkPreview
                    href={href ?? "#"}
                    className={className}
                  >
                    {children}
                  </LinkPreview>
                ),
              }}
            >
              {DATA.summary}
            </Markdown>
          </div>
          {/* same pattern as the Website · GitHub · Docs row under Vercel in Journey */}
          {/* -ml-1: the first icon is centered in a 24px target; this lines it up with the text above */}
          <p className="mt-4 -ml-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
            {ABOUT_LINKS.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 && <span aria-hidden>&middot;</span>}
                {link.icon ? (
                  // icon-only: the label names it for screen readers and the tooltip
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={link.label}
                    title={link.label}
                    className="inline-flex size-6 items-center justify-center text-foreground"
                  >
                    <link.icon className={link.iconClassName ?? "size-4"} aria-hidden />
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                )}
              </Fragment>
            ))}
          </p>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-semibold">Journey</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      {DATA.education.length > 0 && (
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 rounded-full shadow outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 rounded-full shadow outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      )}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="blog">
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <BlogSection />
        </BlurFade>
      </section>
      {DATA.hackathons.length > 0 && (
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      )}
      {/* decorative self-playing Snake; hidden from screen readers */}
      <section id="snake" aria-hidden="true">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="rounded-xl border p-3">
            <Snake />
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
