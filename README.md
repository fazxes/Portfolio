<p align="center">
  <img src="https://github.com/fazxes.png" alt="Pranit Sharma" width="120" style="border-radius: 50%;" />
</p>

<h1 align="center">fazxes.com</h1>

<p align="center">
  <strong>Personal portfolio site for Pranit Sharma.</strong><br/>
  Software Engineer at Vercel. Previously built Orbit at Recursive Labs.
</p>

<p align="center">
  <a href="https://fazxes.com"><img src="https://img.shields.io/badge/Live-fazxes.com-000000?style=flat" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat&logo=typescript" alt="TypeScript strict" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat&logo=tailwindcss" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat" alt="MIT License" />
</p>

---

## About

Single-page portfolio that pulls double duty as a living resume and a GitHub-stats dashboard. Everything (work history, projects, skills, blog, links) is driven by **one file**: [`src/data/resume.tsx`](./src/data/resume.tsx). Edit that, and every section, OG image, and metadata route updates automatically.

Live at [fazxes.com](https://fazxes.com).

## Highlights

- **Single source of truth.** All content lives in `src/data/resume.tsx` as a typed `as const` object. No CMS, no separate config files.
- **Live GitHub stats.** Open-source section pulls real-time stats from the GitHub API, combining personal + org repos.
- **Hover link previews.** Inline links in the intro show a rich card with thumbnail, title, and description (Vercel, Recursive Labs, Orbit, GitHub).
- **Markdown-aware work entries.** Job descriptions render through `react-markdown`, so bullet lists and inline links work inside the accordion.
- **Blog with OG thumbnails.** Curated external blog list with auto-pulled `og:image` previews. Homepage shows all; `/blog` paginates at 8/page.
- **Strict everything.** `noUncheckedIndexedAccess`, type-aware ESLint, `prefer-nullish-coalescing`, the works.

## Tech Stack

| Layer        | Choice                                                         |
| ------------ | -------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)      |
| UI primitives | [shadcn/ui](https://ui.shadcn.com/) (Radix wrappers)          |
| Animations   | [Magic UI](https://magicui.design/), [motion](https://motion.dev/) |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/) + `tw-animate-css` |
| Content      | MDX via [content-collections](https://content-collections.dev/) (legacy flow) |
| Icons        | [lucide-react](https://lucide.dev/) + custom Simple Icons SVGs |
| Deploy       | [Vercel](https://vercel.com)                                   |

## Quick Start

```bash
pnpm install
pnpm dev          # Next.js dev server with Turbopack
```

Then edit [`src/data/resume.tsx`](./src/data/resume.tsx) to make it yours.

### All commands

```bash
pnpm dev          # dev server
pnpm build        # production build (runs content-collections, then Next)
pnpm typecheck    # tsc --noEmit (strict)
pnpm lint         # ESLint (type-aware)
pnpm lint:fix     # autofix
pnpm check        # typecheck + lint (run before declaring work done)
```

> **Heads up.** `pnpm lint` is type-aware and catches things `pnpm build` ignores. Run `pnpm check` before pushing.

## Project Structure

```text
src/
├── app/
│   ├── page.tsx              # homepage (composes all sections)
│   ├── layout.tsx            # root layout, metadata from DATA
│   ├── blog/
│   │   ├── page.tsx          # paginated blog index
│   │   ├── opengraph-image.tsx
│   │   └── [slug]/page.tsx   # legacy MDX route (orphaned)
│   ├── opengraph-image.png
│   └── globals.css
│
├── components/
│   ├── section/              # page sections, all DATA-driven
│   │   ├── work-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── blog-section.tsx
│   │   ├── github-section.tsx
│   │   ├── hackathons-section.tsx
│   │   └── contact-section.tsx
│   ├── ui/                   # shadcn primitives + custom SVG icons
│   │   └── svgs/             # one component per skill icon
│   ├── magicui/              # animated primitives
│   ├── mdx/                  # injected into rendered MDX
│   ├── link-preview.tsx      # hover-card link previews
│   └── project-card.tsx
│
├── data/
│   └── resume.tsx            # single source of truth for all content
│
└── lib/
    └── utils.ts
```

## Customizing

**Edit one file:** [`src/data/resume.tsx`](./src/data/resume.tsx). It exports a single `DATA` object with these top-level fields:

| Field          | What it drives                                          |
| -------------- | ------------------------------------------------------- |
| `name`, `summary`, `description` | Header, OG metadata, page title          |
| `avatarUrl`    | Profile image (external URL is fine, no domain allow-list needed) |
| `linkPreviews` | Hover-card metadata for inline links in `summary`       |
| `skills`       | Skill icon row (each entry references an SVG component) |
| `work`         | Work accordion (descriptions render as Markdown)        |
| `projects`     | Project cards (`image` field accepts external OG URLs)  |
| `blog`         | Curated blog list (homepage + `/blog`)                  |
| `hackathons`   | Hackathon timeline                                      |
| `education`    | Education entries                                       |
| `contact.social` | Social links shown in nav + footer                    |

### Adding a project

Each project in `DATA.projects` has this shape:

```ts
{
  title, href, dates, active, description,
  technologies: string[],                       // → Badge pills
  links: [{ type, href, icon: <Icons.globe /> }],  // → top-right sub-link badges
  image: "https://...",                         // → OG thumbnail (external URL ok)
  video: "",                                    // → if set, takes precedence over image
}
```

### Adding a skill icon

1. Pull the SVG from `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/<name>.svg` (MIT).
2. Wrap as a `(props: SVGProps<SVGSVGElement>) => (...)` component in `src/components/ui/svgs/`.
3. Use `fill="currentColor"` for monochrome, or a hex for brand-colored icons.
4. Import into `src/data/resume.tsx` and add to `skills`.

## Strictness Notes

`tsconfig.json` and `eslint.config.mjs` are configured strictly. Things that will bite:

- `noUncheckedIndexedAccess`: `arr[i]` is `T | undefined`, guard or use `?.`
- `prefer-nullish-coalescing`: use `??` over `||` for defaults
- `no-unnecessary-condition`: don't guard against cases the types prove impossible
- `consistent-type-imports`: use `import { type Foo }` inline
- `no-misused-promises`: don't pass `async` handlers directly to DOM event props

See [`CLAUDE.md`](./CLAUDE.md) for the full convention guide.

## Credits

Based on the [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio) template. Heavily customized: live GitHub stats, hover link previews, single-source `DATA` object, Markdown work entries, OG-image blog thumbnails.

## License

MIT
