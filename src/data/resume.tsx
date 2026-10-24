import { Icons } from "@/components/icons";

export const DATA = {
  name: "Pranit Sharma",
  /** Handle on X and GitHub; also the domain. Used as the alternate site name. */
  handle: "fazxes",
  initials: "PS",
  url: "https://www.fazxes.com",
  location: "",
  locationLink: "",
  description:
    "Agent Harness Engineer at Vercel. Previously built Orbit at Recursive Labs.",
  summary:
    "I'm Pranit, and I make developer tools at [Vercel](https://vercel.com/). I'm currently building [fx](https://fx.sh/), a small open-source coding agent written in Zig. It runs in your terminal or inside other apps. Before Vercel I founded [Recursive Labs](https://recursive.ac/), where I built [Agents SDK](https://www.agentsdk.build/) and [Orbit](https://orbit.build/), an AI-native IDE for macOS. I also write about building software with AI.",
  linkPreviews: {
    "vercel.com": {
      title: "Vercel",
      description:
        "The frontend cloud. Build, preview, and ship on the platform behind Next.js.",
      image: "/vercel.png",
      imageFit: "contain",
      imageBg: "bg-black",
      domain: "vercel.com",
    },
    "fx.sh": {
      title: "fx",
      description:
        "Tiny, open, native coding agent. A minimal CLI written in Zig, built for research and embeddability.",
      image: "https://fx.sh/og.png",
      imageFit: "contain",
      imageBg: "bg-black",
      domain: "fx.sh",
    },
    "recursive.ac": {
      title: "Recursive Labs",
      description:
        "AI-native developer tools and infrastructure for the next generation of software.",
      image: "https://recursive.ac/images/og.png",
      imageFit: "cover",
      domain: "recursive.ac",
    },
    "orbit.build": {
      title: "Orbit",
      description:
        "AI-native IDE for macOS. One agent with full context across editor, browser, terminal, and docs.",
      image: "https://www.orbit.build/images/og/og-home.webp",
      imageFit: "cover",
      domain: "orbit.build",
    },
    "github.com": {
      title: "Pranit Sharma",
      description:
        "Agent Harness Engineer at Vercel. Previously built Orbit at Recursive Labs.",
      image:
        "https://raw.githubusercontent.com/fazxes/Portfolio/main/.github/fazxes-banner.png",
      imageFit: "cover",
      imageAspect: "900/300",
      domain: "github.com/fazxes",
    },
  },
  // Full-size GitHub image, used where a PNG URL is needed (OG images, JSON-LD).
  avatarUrl: "https://github.com/fazxes.png",
  // 256px WebP shown on the page (11 KB instead of the 423 KB GitHub PNG).
  avatarImage: "/avatar.webp",
  contact: {
    email: "pranit@vercel.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/fazxes",
        icon: Icons.github,
      },
      X: {
        name: "X",
        url: "https://x.com/fazxes",
        icon: Icons.x,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
      },
    },
  },

  work: [
    {
      company: "Vercel",
      href: "https://vercel.com",
      badges: [],
      location: "Remote",
      title: "Agent Harness Engineer",
      logoUrl: "/vercel.png",
      start: "2026",
      end: "Present",
      description:
        "Building [fx](https://fx.sh), a tiny, open, embeddable native coding agent written in Zig.\n\n[Website](https://fx.sh) · [GitHub](https://github.com/vercel-labs/fx) · [Docs](https://fx.sh/docs)",
    },
    {
      company: "Recursive Labs",
      href: "https://recursive.ac/",
      badges: ["Founder"],
      location: "",
      title: "Founder",
      logoUrl: "/recursive.png",
      start: "2024",
      end: "2026",
      description:
        "Founded Recursive Labs to build and ship AI-native developer tools, including Orbit, Agents SDK, Nightshift, OPS, X Agent, Skills, and Mosaic.\n\n[Website](https://recursive.ac/) · [GitHub](https://github.com/Recusive)",
    },
  ],
  education: [] as Array<{
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }>,
  projects: [
    {
      title: "fx",
      href: "https://fx.sh",
      dates: "2026 - Present",
      active: true,
      description:
        "A tiny, open, native coding agent written in Zig, designed as a minimal Unix-like CLI and an embeddable harness for larger systems.",
      technologies: ["Zig", "Coding Agent", "CLI", "Native", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://fx.sh",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/vercel-labs/fx",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Docs",
          href: "https://fx.sh/docs",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      art: "/cards/projects/fx",
    },
    {
      title: "fx0",
      href: "https://fx0.vercel.dev",
      dates: "2026 - Present",
      active: true,
      description:
        "A lightweight, open-source design agent built on libfx that turns a description of a page into one HTML file.",
      technologies: ["TypeScript", "libfx", "Design Agent", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://fx0.vercel.dev",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/vercel-labs/fx0",
          icon: <Icons.github className="size-3" />,
        },
      ],
      // fx0's own mark (fx plus a slashed zero), from components/brand.tsx in vercel-labs/fx0
      art: "/cards/projects/fx0",
    },
    {
      title: "libfx",
      href: "https://www.npmjs.com/package/libfx",
      dates: "2026 - Present",
      active: true,
      description:
        "The fx agent as a JavaScript library: give it a model, instructions, and your own tools, and it runs durable sessions.",
      technologies: ["TypeScript", "npm", "Agent SDK", "Open Source"],
      links: [
        {
          type: "npm",
          href: "https://www.npmjs.com/package/libfx",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/vercel-labs/fx/tree/main/sdk",
          icon: <Icons.github className="size-3" />,
        },
      ],
      art: "/cards/projects/fx",
    },
    {
      title: "Orbit",
      href: "https://orbit.build/",
      dates: "2024 - Present",
      active: true,
      description:
        "An AI-native IDE for macOS, with one agent that works across your editor, terminal, docs, and a built-in browser.",
      technologies: ["macOS", "AI Agent", "MCP", "TypeScript", "React"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      art: "/cards/projects/orbit",
    },
    {
      title: "Agents SDK",
      href: "https://www.agentsdk.build/",
      dates: "2024 - Present",
      active: true,
      description:
        "An open-source Rust backend for building agents on Claude, ChatGPT, and Copilot.",
      technologies: ["Rust", "AI Agents", "SDK", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://www.agentsdk.build/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      art: "/cards/projects/agents-sdk",
    },
    {
      title: "Nightshift + Recursive",
      href: "https://orbit.build/nightshift",
      dates: "2025 - Present",
      active: true,
      description:
        "An autonomous engineering system that hardens codebases and builds features overnight, on a portable orchestration framework.",
      technologies: ["AI Agent", "Autonomous", "Developer Tools", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/nightshift",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Recusive/Nightshift",
          icon: <Icons.github className="size-3" />,
        },
      ],
      art: "/cards/projects/nightshift",
    },
    {
      title: "OPS",
      href: "https://orbit.build/ops",
      dates: "2025 - Present",
      active: true,
      description:
        "A code-quality checker for AI-generated code that enforces your project's rules as files change.",
      technologies: ["Code Quality", "AI", "Developer Tools", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/ops",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      art: "/cards/projects/ops",
    },
    {
      title: "X Agent",
      href: "https://orbit.build/x-agent",
      dates: "2025 - Present",
      active: true,
      description:
        "An agent that drafts X replies using X's open-source Phoenix scoring model, then posts them.",
      technologies: ["AI Agent", "Automation", "Browser", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/x-agent",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Recusive/x-agent",
          icon: <Icons.github className="size-3" />,
        },
      ],
      art: "/cards/projects/x-agent",
    },
    {
      title: "Skills",
      href: "https://orbit.build/skills",
      dates: "2025 - Present",
      active: true,
      description:
        "A library of reusable agent skills for Orbit, Claude Code, Cursor, Codex, and 38+ other coding assistants.",
      technologies: ["AI Agent", "Claude Code", "Developer Tools", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/skills",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Recusive/Skills",
          icon: <Icons.github className="size-3" />,
        },
      ],
      art: "/cards/projects/orbit",
    },
    {
      title: "Mosaic",
      href: "https://www.mosaic.sh/",
      dates: "2025 - Present",
      active: true,
      description:
        "An in-app testing framework that runs inside your live web app and catches race conditions without mocks.",
      technologies: ["Testing", "TypeScript", "React", "Early Access"],
      links: [
        {
          type: "Website",
          href: "https://www.mosaic.sh/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      art: "/cards/projects/mosaic",
    },
  ],
  blog: [
    {
      title: "Measure Once: Rebuilding Chat Virtualization for AI-Era Apps",
      href: "https://orbit.build/blog/measure-once-ai-chat-virtualization",
      date: "2026-04-15",
      description:
        "Our chat scrolled like it was drunk. Then we realized LLM apps break the assumptions every virtualization library was built on. Here's what we changed.",
      image: "https://www.orbit.build/thumbnails/measure-once-ai-chat-virtualization.webp",
      readTime: "15 min read",
      tags: ["AI", "Developer Tools", "Engineering"],
    },
    {
      title: "Introducing OPS: The System That Makes AI Write Code Like a Senior Engineer",
      href: "https://orbit.build/blog/introducing-ops-orbit-protocol-server",
      date: "2026-04-09",
      description:
        "AI writes working code that ignores your conventions. OPS is 17 subsystems of real-time enforcement that turn suggestions into laws, so every AI-written line meets your standards.",
      image: "https://www.orbit.build/thumbnails/introducing-ops-orbit-protocol-server.webp",
      readTime: "8 min read",
      tags: ["AI", "Developer Tools", "Code Quality"],
    },
    {
      title: "Introducing Nightshift: An Autonomous Overnight Agent That Actually Works",
      href: "https://orbit.build/blog/introducing-nightshift-autonomous-overnight-agent",
      date: "2026-04-06",
      description:
        "Nightshift is an open-source Python orchestrator that runs AI agents overnight to harden your codebase, build features, and produce auditable shift logs by morning.",
      image: "https://www.orbit.build/thumbnails/nightshift-blog-v2.webp",
      readTime: "7 min read",
      tags: ["AI", "Agent", "Developer Tools"],
    },
  ],
  hackathons: [] as Array<{
    title: string;
    dates: string;
    location: string;
    description: string;
    image: string;
    mlh?: string;
    win?: string;
    icon?: string;
    links: Array<{ title: string; icon: React.ReactNode; href: string }>;
  }>,
} as const;
