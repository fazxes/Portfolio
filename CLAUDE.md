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

All personal/portfolio content — name, description, work history, projects, skills, social links, hackathons, education — lives in `DATA` in this one file. `src/app/layout.tsx`, `src/app/page.tsx`, the opengraph-image routes, and every section component read directly from `DATA`. To change site content, edit this file and nothing else.

`DATA` is declared `as const`, which matters:
- Empty arrays (`education`, `hackathons`) get inferred as `readonly never[]` unless explicitly cast (e.g. `[] as Array<{...}>`). Don't remove those casts.
- `src/app/page.tsx` guards each section with `{DATA.x.length > 0 && <section>…</section>}` so empty arrays simply hide the section. Follow this pattern if adding a new optional section.

### Blog pipeline

MDX files in `content/*.mdx` are compiled at build time by `content-collections.ts` into a virtual module imported as `from "content-collections"` (path aliased in `tsconfig.json`). The pipeline:

1. `content-collections.ts` defines a Zod schema (title, publishedAt, summary, …) and runs `remarkGfm` + a custom `remarkCodeMeta` plugin (`src/lib/remark-code-meta.ts`) that extracts `title="…"` from fenced code block meta into `data-title` hProperties.
2. `src/components/mdx/code-block.tsx` reads those `data-title` / `language-*` attributes client-side and re-highlights with shiki.
3. `src/app/blog/[slug]/page.tsx` consumes `allPosts` from the virtual module.

When touching MDX rendering, remember the remark plugin runs at build time but syntax highlighting happens in the browser via shiki's web bundle.

### Next.js specifics

- App Router, Next 16, React 19, Tailwind v4 (`@tailwindcss/postcss`).
- `src/mdx-components.tsx` wires MDX elements to custom components (e.g. `CodeBlock`).
- Path aliases: `@/*` → `./src/*`, `content-collections` → `./.content-collections/generated` (auto-generated; don't hand-edit).
- Turbopack is the default for both dev and build.

### Component layers

- `src/components/ui/*` — shadcn/ui primitives (Radix wrappers). Use `React.ComponentRef<typeof X>`, not the deprecated `ElementRef`.
- `src/components/magicui/*` — animated components from magicui (motion/framer-motion).
- `src/components/section/*` — page sections (work, projects, hackathons, contact) that read from `DATA`.
- `src/components/mdx/*` — components injected into rendered MDX.

### Strictness expectations

Both `tsconfig.json` and `eslint.config.mjs` are configured strictly. Notable rules that will bite:

- `noUncheckedIndexedAccess` — `arr[i]` is `T | undefined`. Guard or use `?.`.
- `@typescript-eslint/no-explicit-any` and the `no-unsafe-*` family — type things properly, don't paper over with `any`.
- `@typescript-eslint/prefer-nullish-coalescing` — prefer `??` over `||` for defaults (only use `||` when `0` / `""` should also trigger the fallback, and document why).
- `@typescript-eslint/no-unnecessary-condition` — don't guard against cases the types prove impossible. If a field is required on the type, don't write `x && x.length > 0`.
- `@typescript-eslint/consistent-type-imports` with `inline-type-imports` — use `import { type Foo }` inline.
- `@typescript-eslint/array-type` is `array-simple` — `T[]` for simple types, `Array<T>` for complex object/union types.
- `@typescript-eslint/no-misused-promises` — don't pass `async` handlers directly to DOM event props like `onClick`; use a sync wrapper that kicks off the promise.

When you relax or override a rule, prefer fixing the code. Only adjust `eslint.config.mjs` when the rule genuinely doesn't fit the codebase's style.
