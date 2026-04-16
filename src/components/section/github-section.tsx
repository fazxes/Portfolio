"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowUpRight, GitFork, Star, Users } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="h-[140px] animate-pulse rounded-lg bg-muted" />,
  }
);

const BLUR_FADE_DELAY = 0.04;
const GITHUB_USER = "fazxes";
const GITHUB_ORG = "Recusive";

interface GitHubStats {
  stars: number;
  repos: number;
  followers: number;
}

async function fetchGitHubStats(): Promise<GitHubStats> {
  const headers = { Accept: "application/vnd.github.v3+json" };

  const [userRes, userReposRes, orgRes, orgReposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, { headers }),
    fetch(`https://api.github.com/orgs/${GITHUB_ORG}`, { headers }),
    fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100`, { headers }),
  ]);

  const user = await userRes.json() as { public_repos: number; followers: number };
  const userRepos = await userReposRes.json() as Array<{ stargazers_count: number }>;
  const org = await orgRes.json() as { public_repos: number };
  const orgRepos = await orgReposRes.json() as Array<{ stargazers_count: number }>;

  const userStars = userRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const orgStars = orgRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return {
    stars: userStars + orgStars,
    repos: user.public_repos + org.public_repos,
    followers: user.followers,
  };
}

const statsMeta = [
  { key: "stars" as const, label: "Stars", icon: Star, iconClass: "text-yellow-500 fill-yellow-500" },
  { key: "repos" as const, label: "Repos", icon: GitFork, iconClass: "text-blue-500" },
  { key: "followers" as const, label: "Followers", icon: Users, iconClass: "text-violet-500" },
];

export default function GitHubSection() {
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [totalCount, setTotalCount] = useState<string | null>(null);
  const [stats, setStats] = useState<GitHubStats>({ stars: 0, repos: 0, followers: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const username = DATA.contact.social.GitHub.url.split("/").pop() ?? "";
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    fetchGitHubStats()
      .then((data) => { setStats(data); })
      .catch(() => { /* keep defaults */ });
  }, []);

  const updateMasks = useCallback((el: HTMLDivElement) => {
    const atLeft = el.scrollLeft <= 2;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setShowLeft(!atLeft);
    setShowRight(!atRight);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) { return; }

    const tryScroller = (): boolean => {
      const scroller = wrapper.querySelector<HTMLDivElement>(
        ".react-activity-calendar__scroll-container"
      );
      if (scroller && scroller.scrollWidth > scroller.clientWidth) {
        scroller.scrollLeft = scroller.scrollWidth;
        requestAnimationFrame(() => { updateMasks(scroller); });
        scroller.addEventListener("scroll", () => { updateMasks(scroller); }, { passive: true });
        return true;
      }
      return false;
    };

    const tryCount = (): boolean => {
      const countEl = wrapper.querySelector<HTMLDivElement>(".react-activity-calendar__count");
      if (countEl) {
        const text = countEl.textContent;
        const match = text ? /[\d,]+/.exec(text) : null;
        if (match?.[0]) {
          setTotalCount(match[0]);
          return true;
        }
      }
      return false;
    };

    let gotScroller = tryScroller();
    let gotCount = tryCount();
    if (gotScroller && gotCount) { return; }

    const observer = new MutationObserver(() => {
      if (!gotScroller) { gotScroller = tryScroller(); }
      if (!gotCount) { gotCount = tryCount(); }
      if (gotScroller && gotCount) { observer.disconnect(); }
    });
    observer.observe(wrapper, { childList: true, subtree: true });
    return () => { observer.disconnect(); };
  }, [updateMasks]);

  return (
    <section id="github" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Open Source
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Building in public
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Most of what I build is open source. Here&apos;s what shipping looks like.
            </p>
          </div>
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {statsMeta.map((meta) => (
              <div
                key={meta.label}
                className="relative flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border overflow-hidden"
              >
                <div className="absolute inset-0 bottom-auto h-[45%] rounded-xl overflow-hidden">
                  <FlickeringGrid
                    className="h-full w-full"
                    squareSize={2}
                    gridGap={2}
                    style={{
                      maskImage: "linear-gradient(to bottom, black, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                    }}
                  />
                </div>
                <meta.icon className={`relative size-4 ${meta.iconClass}`} aria-hidden />
                <span className="relative text-2xl font-bold tracking-tight tabular-nums">
                  {stats[meta.key].toLocaleString()}
                </span>
                <span className="relative text-xs text-muted-foreground">
                  {meta.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div ref={wrapperRef} className="relative rounded-xl border border-border p-4">
            <div
              className={`pointer-events-none absolute left-0 top-8 bottom-10 w-10 z-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-200 ease-out ${showLeft ? "opacity-100" : "opacity-0"}`}
            />
            <div
              className={`pointer-events-none absolute right-0 top-8 bottom-10 w-10 z-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-200 ease-out ${showRight ? "opacity-100" : "opacity-0"}`}
            />
            <GitHubCalendar
              username={username}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              colorScheme={isDark ? "dark" : "light"}
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#383838", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              renderBlock={(block, activity) => {
                const dateStr = new Date(activity.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                const label = activity.count === 0
                  ? `No contributions on ${dateStr}`
                  : `${String(activity.count)} contribution${activity.count === 1 ? "" : "s"} on ${dateStr}`;
                return React.cloneElement(block, {
                  onMouseEnter: (e: React.MouseEvent) => {
                    const tip = tooltipRef.current;
                    if (!tip) { return; }
                    const rect = (e.target as Element).getBoundingClientRect();
                    tip.textContent = label;
                    tip.style.left = `${String(rect.left + rect.width / 2)}px`;
                    tip.style.top = `${String(rect.top)}px`;
                    tip.style.display = "block";
                  },
                  onMouseLeave: () => {
                    const tip = tooltipRef.current;
                    if (tip) { tip.style.display = "none"; }
                  },
                });
              }}
            />
            {totalCount && (
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2 text-sm text-muted-foreground">
                <div>
                  <span className="text-lg font-bold text-foreground">{totalCount}</span>
                  {" "}contributions in the last year
                </div>
                <div className="flex items-center gap-[3px]">
                  <span className="mr-1.5 text-xs">Less</span>
                  {(isDark
                    ? ["#383838", "#0e4429", "#006d32", "#26a641", "#39d353"]
                    : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
                  ).map((color) => (
                    <svg key={color} width="12" height="12">
                      <rect width="12" height="12" fill={color} rx="2" ry="2" />
                    </svg>
                  ))}
                  <span className="ml-1.5 text-xs">More</span>
                </div>
              </div>
            )}
          </div>
        </BlurFade>

        <div className="flex justify-center">
          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View on GitHub
            <ArrowUpRight className="size-3" aria-hidden />
          </Link>
        </div>
      </div>
      <div
        ref={tooltipRef}
        className="fixed z-50 px-2 py-1 text-[11px] leading-tight rounded-md bg-primary text-primary-foreground pointer-events-none whitespace-nowrap"
        style={{ display: "none", transform: "translate(-50%, -100%) translateY(-6px)" }}
      />
    </section>
  );
}
