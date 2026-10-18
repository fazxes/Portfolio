# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: **pnpm** (required — lockfile is `pnpm-lock.yaml`).

```bash
pnpm dev          # Next.js dev server with Turbopack
pnpm build        # Production build (runs content-collections, then Next)
pnpm typecheck    # tsc --noEmit (strict config)
pnpm lint         # ESLint (strict typescript-eslint, type-aware)
pnpm lint:fix     # ESLint autofix
pnpm check        # typecheck + lint (run this before declaring work done)
```

Do not skip `pnpm check` after edits. Lint is type-aware and catches things `pnpm build` ignores.

## Architecture

### Single source of truth: `src/data/resume.tsx`

All portfolio content — name, description, work, projects, social links, **blog**, hackathons, education — lives in `DATA` in this one file. `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/blog/page.tsx`, the opengraph-image routes, and every section component read directly from `DATA`. To change site content, edit this file and nothing else.

`DATA` is declared `as const`, which matters:
- Empty arrays (`education`, `hackathons`) get inferred as `readonly never[]` unless explicitly cast (e.g. `[] as Array<{...}>`). Don't remove those casts.
- Conversely, if an array is populated at author-time (`projects`, `blog`), `.length > 0` is statically true and becomes a `no-unnecessary-condition` lint error — don't wrap those sections in length guards.
- `src/app/page.tsx` guards genuinely-empty sections with `{DATA.x.length > 0 && <section>…</section>}` so empty arrays hide the section. Follow this pattern only for sections whose array is empty in the config.

### Section components (`src/components/section/*`)

Each reads from `DATA` and renders a single vertical section of the page:
- `work-section.tsx` — Always-visible entries from `DATA.work`. **Descriptions are rendered through `react-markdown`**, so inline links work without hiding role details behind disclosure controls.
- `projects-section.tsx` → `project-entry.tsx` — List of `DATA.projects` laid out like the Journey entries: round logo from `art`, name, dates, and the description underneath. The right corner holds the project's other links (e.g. Source, Docs) and an arrow; a link to the same URL as `href` is not repeated. The title link is stretched over the whole entry (`after:absolute after:inset-0`), so the entry is clickable without wrapping other links (nested `<a>` is invalid HTML).
- `blog-section.tsx` — "Writings": compact text list (`BlogPostRow`: title, date, read time) of every post (`DATA.blog` plus local MDX posts). `/blog` shows the same posts as cards (`BlogPostCard`), 8 per page.
- `hackathons-section.tsx` — straightforward read.
- The page ends with `src/components/snake.tsx`: a decorative, self-playing Snake in a bordered box. Game logic is pure and lives in `src/lib/snake.ts`; the component only draws.

### Blog: `DATA.blog` is the source, not `content-collections`

The homepage `BlogSection` and `src/app/blog/page.tsx` both read from `DATA.blog` — a curated list of Orbit blog posts (external links to `orbit.build/blog/<slug>` with mirrored metadata + OG image URLs). `pnpm build` fails without this data since the page iterates it.

The `content-collections` pipeline (MDX files in `content/*.mdx` → virtual `content-collections` module via `content-collections.ts`) is **still wired up but effectively orphaned**: only `src/app/blog/[slug]/page.tsx` still imports `allPosts`, and nothing links to `/blog/[slug]` internally anymore. If deleting the legacy flow: remove `content/*.mdx`, `content-collections.ts`, the `/blog/[slug]` route, `src/lib/remark-code-meta.ts`, and the `@content-collections/*` deps. Until then, leave the pipeline intact — it builds clean.

### Adding a new project

Project entries in `DATA.projects` have a specific shape that `project-entry.tsx` expects:
```ts
{
  title, href, dates, active, description,
  technologies: string[],                       // → metadata only, not shown
  links: [{ type, href, icon: <Icons.globe .../> }],  // → corner links (skips the one equal to href)
  art: "/cards/projects/<name>",                // → round logo, see "Card art" below
}
```

### Card art

Project logos and blog cards show transparent art instead of the full OG image. Each piece ships as two files in `public/cards/`, `<name>-light.webp` and `<name>-dark.webp`, rendered by `ThemedArt` (`src/components/themed-art.tsx`), which shows the one matching the theme. In the variant for the other theme, neutral lines (white, cream, black, brown) are flipped so they stay visible, and accent colors stay the same.
- Projects: `art` points at `public/cards/projects/<name>`.
- Blog: art is derived from the post slug (the last segment of `href`, or the MDX slug) as `public/cards/blog/<slug>`. A post without art files falls back to its `image`.

### Next.js specifics

- App Router, Next 16, React 19, Tailwind v4 (`@tailwindcss/postcss`).
- Path aliases: `@/*` → `./src/*`, `content-collections` → `./.content-collections/generated` (auto-generated; don't hand-edit).
- Turbopack is the default for both dev and build.
- External image URLs (e.g. `avatarUrl: "https://github.com/fazxes.png"`, blog OG thumbnails) render through plain `<img>` tags, not `next/image`, so no `next.config` domain allow-list is needed.

### Component layers

- `src/components/ui/*` — shadcn/ui primitives (Radix wrappers). Use `React.ComponentRef<typeof X>`, not the deprecated `ElementRef`.
- `src/components/magicui/*` — animated components, kept cheap on purpose: `BlurFade` is CSS-only (`.blur-fade` keyframes in `globals.css`), the dock's hover grow is CSS, and `FlickeringGrid` redraws at ~10 fps and only repaints changed squares. `Snake` follows the same rules: it draws only when it moves (~9 times a second), pauses off screen, and shows one still frame under reduced motion. Don't reintroduce `motion` for these, and fade whole sections rather than every list item.
- Markdown (`react-markdown`) is rendered in server components (`work-section.tsx`, `project-entry.tsx`, `page.tsx`) so its parser never ships to the browser; keep it out of `"use client"` files.
- The hero avatar uses the local `DATA.avatarImage` (256px WebP); `DATA.avatarUrl` (GitHub PNG) stays for OG images and JSON-LD, which need a PNG URL.
- `src/components/section/*` — page sections, all `DATA`-driven.
- `src/components/mdx/*` — components injected into rendered MDX (still used by the orphaned `/blog/[slug]` flow).

### Strictness expectations

Both `tsconfig.json` and `eslint.config.mjs` are configured strictly. Notable rules that will bite:

- `noUncheckedIndexedAccess` — `arr[i]` is `T | undefined`. Guard or use `?.`.
- `@typescript-eslint/no-explicit-any` and the `no-unsafe-*` family — type things properly, don't paper over with `any`.
- `@typescript-eslint/prefer-nullish-coalescing` — prefer `??` over `||` for defaults (only use `||` when `0` / `""` should also trigger the fallback, and document why).
- `@typescript-eslint/no-unnecessary-condition` — don't guard against cases the types prove impossible. If a field is required on the type (or always-present in the `as const` data), don't wrap it in a truthy check.
- `@typescript-eslint/consistent-type-imports` with `inline-type-imports` — use `import { type Foo }` inline.
- `@typescript-eslint/array-type` is `array-simple` — `T[]` for simple types, `Array<T>` for complex object/union types.
- `@typescript-eslint/no-misused-promises` — don't pass `async` handlers directly to DOM event props like `onClick`; use a sync wrapper that kicks off the promise.

When you relax or override a rule, prefer fixing the code. Only adjust `eslint.config.mjs` when the rule genuinely doesn't fit the codebase's style.

## Copy and tone

A few editorial preferences have been established through iteration:
- **No em dashes** (`—`) in user-facing copy. Use periods, commas, parens, or colons.
- Tone is confident but understated. Avoid "building something crazy" / "stay tuned!!!" energy; prefer direct, specific sentences.
- Don't mention "secret project" for the Vercel work; phrase forward-looking work as "building what's next" or similar.
