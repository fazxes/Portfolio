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

All portfolio content — name, description, work, projects, skills, social links, **blog**, hackathons, education — lives in `DATA` in this one file. `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/blog/page.tsx`, the opengraph-image routes, and every section component read directly from `DATA`. To change site content, edit this file and nothing else.

`DATA` is declared `as const`, which matters:
- Empty arrays (`education`, `hackathons`) get inferred as `readonly never[]` unless explicitly cast (e.g. `[] as Array<{...}>`). Don't remove those casts.
- Conversely, if an array is populated at author-time (`projects`, `blog`), `.length > 0` is statically true and becomes a `no-unnecessary-condition` lint error — don't wrap those sections in length guards.
- `src/app/page.tsx` guards genuinely-empty sections with `{DATA.x.length > 0 && <section>…</section>}` so empty arrays hide the section. Follow this pattern only for sections whose array is empty in the config.

### Section components (`src/components/section/*`)

Each reads from `DATA` and renders a single vertical section of the page:
- `work-section.tsx` — Accordion of `DATA.work`. **Description is rendered through `react-markdown`**, so bullet lists and inline links work (Recursive Labs entry uses this to list its products).
- `projects-section.tsx` → `project-card.tsx` — Grid of `DATA.projects`. Each card is wrapped in a single `<Link>` (whole card is clickable). The per-project badge links live as absolutely-positioned siblings *outside* the main Link (nested `<a>` is invalid HTML). Card shows an OG image at top pulled from `image` field (typically an external URL from the linked site).
- `blog-section.tsx` — Grid of `DATA.blog` with OG thumbnails. Homepage shows all posts; `/blog` paginates at 8/page.
- `hackathons-section.tsx`, `contact-section.tsx` — straightforward reads.

### Blog: `DATA.blog` is the source, not `content-collections`

The homepage `BlogSection` and `src/app/blog/page.tsx` both read from `DATA.blog` — a curated list of Orbit blog posts (external links to `orbit.build/blog/<slug>` with mirrored metadata + OG image URLs). `pnpm build` fails without this data since the page iterates it.

The `content-collections` pipeline (MDX files in `content/*.mdx` → virtual `content-collections` module via `content-collections.ts`) is **still wired up but effectively orphaned**: only `src/app/blog/[slug]/page.tsx` still imports `allPosts`, and nothing links to `/blog/[slug]` internally anymore. If deleting the legacy flow: remove `content/*.mdx`, `content-collections.ts`, the `/blog/[slug]` route, `src/lib/remark-code-meta.ts`, and the `@content-collections/*` deps. Until then, leave the pipeline intact — it builds clean.

### Adding a new project card

Project entries in `DATA.projects` have a specific shape that `project-card.tsx` expects:
```ts
{
  title, href, dates, active, description,
  technologies: string[],                       // → Badge pills
  links: [{ type, href, icon: <Icons.globe .../> }],  // → sub-link badges top-right
  image: "https://...",                         // → OG thumbnail, external URL is fine
  video: "",                                    // → if set, takes precedence over image
}
```
When pulling metadata from a real site, grab the `<meta property="og:image">` URL for the thumbnail.

### Skills icons

Skill icons are individual single-path SVG components in `src/components/ui/svgs/`. To add a new skill:
1. Pull the SVG from `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/<name>.svg` (MIT).
2. Wrap it as a `(props: SVGProps<SVGSVGElement>) => (...)` component in that directory.
3. Use `fill="currentColor"` for monochrome icons so they inherit text color, or a hex for brand-colored ones.
4. Import into `src/data/resume.tsx` and add to `skills`.

### Next.js specifics

- App Router, Next 16, React 19, Tailwind v4 (`@tailwindcss/postcss`).
- Path aliases: `@/*` → `./src/*`, `content-collections` → `./.content-collections/generated` (auto-generated; don't hand-edit).
- Turbopack is the default for both dev and build.
- External image URLs (e.g. `avatarUrl: "https://github.com/fazxes.png"`, blog OG thumbnails) render through plain `<img>` tags, not `next/image`, so no `next.config` domain allow-list is needed.

### Component layers

- `src/components/ui/*` — shadcn/ui primitives (Radix wrappers). Use `React.ComponentRef<typeof X>`, not the deprecated `ElementRef`.
- `src/components/magicui/*` — animated components (motion / framer-motion).
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
