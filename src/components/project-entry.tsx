// Server component: the Markdown is rendered to HTML here, so its parser never
// ships to the browser.
import { ThemedArt } from "@/components/themed-art";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

// Same round frame as the logos in Journey (work-section.tsx).
const LOGO_FRAME =
  "size-8 md:size-10 flex-none rounded-full shadow outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10";

function ProjectLogo({ art }: { art?: string }) {
  if (!art) {
    return <div className={cn(LOGO_FRAME, "bg-muted")} />;
  }

  return (
    // padding keeps square marks (fx, Orbit, Mosaic) clear of the round edge
    <div className={cn(LOGO_FRAME, "flex items-center justify-center p-[7px] md:p-2")}>
      {/* decorative: the project name sits right next to it */}
      <ThemedArt src={art} alt="" className="size-full object-contain" />
    </div>
  );
}

interface Props {
  title: string;
  href: string;
  description: string;
  dates: string;
  art?: string;
  links?: ReadonlyArray<{
    icon: React.ReactNode;
    type: string;
    href: string;
  }>;
}

export function ProjectEntry({ title, href, description, dates, art, links }: Props) {
  // The entry and its arrow already open `href`; only list links that go elsewhere.
  const extraLinks = links?.filter((link) => link.href !== href) ?? [];

  return (
    <article className="group relative grid gap-3">
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex min-w-0 flex-1 items-center gap-x-3">
          <ProjectLogo art={art} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3 className="font-semibold leading-none">
              {/* stretched over the whole entry; the extra links sit above it */}
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 group-hover:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ring"
              >
                {title}
              </Link>
            </h3>
            <div className="font-sans text-sm text-muted-foreground">{dates}</div>
          </div>
        </div>
        <div className="flex flex-none items-center gap-3 text-xs text-muted-foreground">
          {extraLinks.length > 0 && (
            <div className="relative z-10 flex items-center gap-3">
              {extraLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {link.icon}
                  {link.type}
                </Link>
              ))}
            </div>
          )}
          {/* not positioned, so clicks fall through to the stretched title link */}
          <ArrowUpRight className="size-4 group-hover:text-foreground" aria-hidden />
        </div>
      </div>
      <div className="prose ml-11 max-w-full text-pretty font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm md:ml-13 dark:prose-invert">
        <Markdown>{description}</Markdown>
      </div>
    </article>
  );
}
