import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Bun } from "@/components/ui/svgs/bun";
import { Zig } from "@/components/ui/svgs/zig";
import { Rust } from "@/components/ui/svgs/rust";
import { Tauri } from "@/components/ui/svgs/tauri";
import { WebAssembly } from "@/components/ui/svgs/webassembly";
import { Anthropic } from "@/components/ui/svgs/anthropic";

export const DATA = {
  name: "Pranit Sharma",
  initials: "PS",
  url: "https://www.fazxes.com",
  location: "",
  locationLink: "",
  description:
    "Software Engineer at Vercel. Previously built Orbit at Recursive Labs.",
  summary:
    "I build developer tools. Currently at [Vercel](https://vercel.com), working on agent infrastructure. Before that I was a solo founder at [Recursive Labs](https://recursive.ac/), where I built [Orbit](https://orbit.build/), an AI-native IDE in Rust that reached 200+ users with zero marketing. I ship fast and care about craft.",
  linkPreviews: {
    "vercel.com": {
      title: "Vercel",
      description:
        "The frontend cloud. Build, preview, and ship on the platform behind Next.js.",
      image: "/vercel.png",
      imageFit: "contain",
      domain: "vercel.com",
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
        "Software Engineer at Vercel. Previously built Orbit at Recursive Labs.",
      image: "https://opengraph.githubassets.com/1/fazxes",
      imageFit: "cover",
      domain: "github.com/fazxes",
    },
  },
  avatarUrl: "https://github.com/fazxes.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Bun", icon: Bun },
    { name: "Rust", icon: Rust },
    { name: "Zig", icon: Zig },
    { name: "Python", icon: Python },
    { name: "Tauri", icon: Tauri },
    { name: "WebAssembly", icon: WebAssembly },
    { name: "Claude", icon: Anthropic },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/fazxes",
        icon: Icons.github,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/fazxes",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Vercel",
      href: "https://vercel.com",
      badges: [],
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/vercel.png",
      start: "2026",
      end: "Present",
      description:
        "Building what's next. Watch this space.\n\n- **Stealth**",
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
        "Founded Recursive Labs to build AI-native developer tools. Shipped a suite of products:\n\n- **[Orbit](https://orbit.build/)**: AI-native IDE for macOS. One agent with full context across your editor, browser, terminal, and docs.\n- **[Agents SDK](https://www.agentsdk.build/)**: Open-source Rust SDK for production AI agents. Type-safe, async-first primitives, zero runtime overhead.\n- **[Nightshift](https://orbit.build/nightshift)**: Autonomous overnight codebase improvement agent. Run it before bed, wake up to a reviewed worktree and shift log.\n- **[OPS](https://orbit.build/ops)**: Orbit Protocol Server. 17 subsystems of real-time code quality enforcement. Deterministic rules, not prompt suggestions.\n- **[X Agent](https://orbit.build/x-agent)**: Algorithm-optimized X engagement agent. Monitors, drafts replies with Phoenix scoring, posts through the browser.\n- **[Skills](https://orbit.build/skills)**: Modular AI agent skills for Orbit, Claude Code, Cursor, Codex, and 38+ coding assistants.\n- **[Mosaic](https://www.mosaic.sh/)**: In-app testing framework that runs inside live web apps. Zero mocks, real state, real race conditions.",
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
      title: "Orbit",
      href: "https://orbit.build/",
      dates: "2024 - Present",
      active: true,
      description:
        "AI-native IDE for macOS. One agent with full context across your editor, browser, terminal, and docs. No tool switching, no copy-pasting. Ship from branch to PR in a single conversation, with a built-in browser that gives the agent eyes to debug visually.",
      technologies: ["macOS", "AI Agent", "MCP", "TypeScript", "React"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://www.orbit.build/images/og/og-home.webp",
      video: "",
    },
    {
      title: "Agents SDK",
      href: "https://www.agentsdk.build/",
      dates: "2024 - Present",
      active: true,
      description:
        "Open-source Rust SDK for building production AI agents. Type-safe, async-first primitives to orchestrate models, define tools, and manage state, with zero runtime overhead.",
      technologies: ["Rust", "AI Agents", "SDK", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://www.agentsdk.build/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://www.agentsdk.build/og-preview.png",
      video: "",
    },
    {
      title: "Nightshift",
      href: "https://orbit.build/nightshift",
      dates: "2025 - Present",
      active: true,
      description:
        "Autonomous overnight codebase improvement agent. Runs while you sleep, finding and fixing production-readiness issues across your entire stack. Run it before bed. Wake up to a reviewed worktree, a shift log, and a machine-readable record of what the agent actually did.",
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
      image: "https://www.orbit.build/thumbnails/og-nightshift-v4.webp",
      video: "",
    },
    {
      title: "OPS",
      href: "https://orbit.build/ops",
      dates: "2025 - Present",
      active: true,
      description:
        "Orbit Protocol Server. 17 subsystems of real-time code quality enforcement that make AI write code like a senior engineer. Deterministic rules, not prompt suggestions.",
      technologies: ["Code Quality", "AI", "Developer Tools", "Open Source"],
      links: [
        {
          type: "Website",
          href: "https://orbit.build/ops",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Recusive/OPS",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://www.orbit.build/thumbnails/introducing-ops-orbit-protocol-server.webp",
      video: "",
    },
    {
      title: "X Agent",
      href: "https://orbit.build/x-agent",
      dates: "2025 - Present",
      active: true,
      description:
        "Algorithm-optimized X engagement agent. Monitors accounts, drafts replies using X's open-source Phoenix scoring model and its 19 modeled engagement actions, and posts through the browser.",
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
      image: "https://www.orbit.build/thumbnails/x-og.webp",
      video: "",
    },
    {
      title: "Skills",
      href: "https://orbit.build/skills",
      dates: "2025 - Present",
      active: true,
      description:
        "Modular AI agent skills for Orbit, Claude Code, Cursor, Codex, and 38+ other AI coding assistants. Browse, install, and build skills that make your coding agent smarter.",
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
      image: "https://www.orbit.build/thumbnails/skills-v2.webp",
      video: "",
    },
    {
      title: "Mosaic",
      href: "https://www.mosaic.sh/",
      dates: "2025 - Present",
      active: true,
      description:
        "In-app testing framework that runs inside your live web application. Zero mocks, direct state store access, real race condition detection. Tests what actually breaks, not what you hope won't.",
      technologies: ["Testing", "TypeScript", "React", "Early Access"],
      links: [
        {
          type: "Website",
          href: "https://www.mosaic.sh/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://mosaic.sh/og-image.png",
      video: "",
    },
    {
      title: "Recursive Labs",
      href: "https://recursive.ac/",
      dates: "2024 - Present",
      active: true,
      description:
        "The parent company behind Orbit, Agents SDK, and Mosaic. Building AI-native developer tools and infrastructure for the next generation of software development.",
      technologies: ["Developer Tools", "AI", "Infrastructure"],
      links: [
        {
          type: "Website",
          href: "https://recursive.ac/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "https://recursive.ac/images/og.png",
      video: "",
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
      title: "Project Glasswing: Anthropic Built an AI That Finds Zero-Days Faster Than Humans",
      href: "https://orbit.build/blog/anthropic-project-glasswing-claude-mythos",
      date: "2026-04-09",
      description:
        "Claude Mythos Preview scores 93.9% on SWE-bench, found thousands of zero-day vulnerabilities across major OSes and browsers, and Anthropic says it's too dangerous to release publicly.",
      image: "https://www.orbit.build/thumbnails/anthropic-project-glasswing-claude-mythos.webp",
      readTime: "9 min read",
      tags: ["AI", "Security", "Vulnerabilities"],
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
    {
      title: "The AI Coding Toolchain Wars: Why Every Company Wants to Own Your Workflow",
      href: "https://orbit.build/blog/ai-coding-toolchain-wars-march-2026",
      date: "2026-03-23",
      description:
        "OpenAI bought Astral. Anthropic shipped Channels. The Pentagon can't quit Claude. The AI coding tools war of 2026 is about vendor lock-in.",
      image: "https://www.orbit.build/thumbnails/ai-coding-toolchain-wars-march-2026.webp",
      readTime: "9 min read",
      tags: ["AI", "Developer Tools", "OpenAI"],
    },
    {
      title: "From Vibe Coding to Agentic Engineering: What the $285B SaaSpocalypse Means for How We Build Software",
      href: "https://orbit.build/blog/agentic-engineering-saaspocalypse-vibe-coding-evolution",
      date: "2026-02-12",
      description:
        "Karpathy says vibe coding is passé. $285B in software stocks just evaporated. The era of agentic engineering is here, and it changes everything about developer tools.",
      image: "https://www.orbit.build/thumbnails/agentic-engineering-saaspocalypse-v2.webp",
      readTime: "10 min read",
      tags: ["Agentic Engineering", "Vibe Coding", "AI"],
    },
    {
      title: "AI Coding Just Got Its Biggest Validation Yet: MIT's 2026 Breakthrough Technologies",
      href: "https://orbit.build/blog/mit-breakthrough-generative-coding",
      date: "2026-01-17",
      description:
        "MIT Technology Review named generative coding a breakthrough technology alongside nuclear reactors and gene editing. Here's what it means for developers.",
      image: "https://www.orbit.build/thumbnails/mit-breakthrough-generative-coding.webp",
      readTime: "12 min read",
      tags: ["AI Coding", "Vibe Coding", "MIT Technology Review"],
    },
    {
      title: "The AI Coding Reality Check: What 2025 Taught Us About Hype vs. Evidence",
      href: "https://orbit.build/blog/ai-coding-hype-vs-evidence",
      date: "2025-12-24",
      description:
        "Independent studies show AI coding gains are far more modest than vendors claim. Here's what the data actually says about productivity, code quality, and job impact.",
      image: "https://www.orbit.build/thumbnails/ai-coding-hype-vs-evidence.webp",
      readTime: "15 min read",
      tags: ["AI Coding", "Developer Productivity", "Research"],
    },
    {
      title: "The AI Coding Reality Check: What the Research Actually Shows",
      href: "https://orbit.build/blog/ai-coding-reality-check",
      date: "2025-12-16",
      description:
        "MIT Tech Review's investigation reveals a stark disconnect between AI coding hype and developer experience. Here's what the data says.",
      image: "https://www.orbit.build/thumbnails/ai-coding-reality-check-v2.webp",
      readTime: "14 min read",
      tags: ["AI Coding", "Developer Productivity", "Research"],
    },
    {
      title: "Inside Anthropic: What 200,000 Claude Sessions Reveal About AI-Assisted Coding",
      href: "https://orbit.build/blog/anthropic-ai-work-study",
      date: "2025-12-06",
      description:
        "Anthropic studied their own engineers' Claude Code usage. The findings (50% productivity gains alongside skill atrophy concerns) preview software development's future.",
      image: "https://www.orbit.build/thumbnails/anthropic-ai-work-study.webp",
      readTime: "12 min read",
      tags: ["AI Coding", "Productivity", "Claude Code"],
    },
    {
      title: "Zero Config Development: Why Setup Is the Enemy of Shipping",
      href: "https://orbit.build/blog/zero-config-development",
      date: "2025-12-03",
      description:
        "Every hour spent on configuration is an hour not spent building. Here's the case for zero-config development and how it changes everything.",
      image: "https://www.orbit.build/thumbnails/zero-config-development.webp",
      readTime: "7 min read",
      tags: ["Developer Experience", "Productivity", "Configuration"],
    },
    {
      title: "Why IDEs Are Dying (And What's Replacing Them)",
      href: "https://orbit.build/blog/why-ides-are-dying",
      date: "2025-12-03",
      description:
        "The Integrated Development Environment had a 40-year run. Here's why the era of IDEs is ending and what comes next.",
      image: "https://www.orbit.build/thumbnails/why-ides-are-dying.webp",
      readTime: "8 min read",
      tags: ["IDEs", "Development Tools", "UDE"],
    },
    {
      title: "What Is Vibe Coding? The New Way to Build Software",
      href: "https://orbit.build/blog/what-is-vibe-coding",
      date: "2025-12-03",
      description:
        "Vibe coding means describing what you want and letting AI figure out how. Here's where the term came from, what research says about it, and whether it actually works.",
      image: "https://www.orbit.build/thumbnails/what-is-vibe-coding.webp",
      readTime: "12 min read",
      tags: ["Vibe Coding", "AI", "Development"],
    },
    {
      title: "Vibe Coding: A Beginner's Guide to Building Without Learning to Code",
      href: "https://orbit.build/blog/vibe-coding-beginners-guide",
      date: "2025-12-03",
      description:
        "You don't need to learn programming. Describe what you want, AI builds it. Here's your complete guide to vibe coding.",
      image: "https://www.orbit.build/thumbnails/vibe-coding-beginners-guide.webp",
      readTime: "9 min read",
      tags: ["Vibe Coding", "No-Code", "Beginners"],
    },
    {
      title: "Does AI Actually Make Developers More Productive? What 10 Studies Say",
      href: "https://orbit.build/blog/ai-coding-productivity-research",
      date: "2025-12-03",
      description:
        "GitHub claims 55% faster. A new study found 19% slower. Here's what the research actually shows about AI coding tool productivity and why the results conflict.",
      image: "https://www.orbit.build/thumbnails/ai-coding-productivity-research.webp",
      readTime: "11 min read",
      tags: ["AI", "Productivity", "Research"],
    },
    {
      title: "The Week AI Coding Changed Forever: Claude Opus 4.5, AWS Frontier Agents, and the $1B Milestone",
      href: "https://orbit.build/blog/ai-coding-december-2025-developments",
      date: "2025-12-03",
      description:
        "In late November 2025, three tech giants released competing AI coding models within days. Here's what happened, what the benchmarks show, and what it means for developers.",
      image: "https://www.orbit.build/thumbnails/ai-coding-december-2025-developments.webp",
      readTime: "12 min read",
      tags: ["AI", "Claude", "AWS"],
    },
    {
      title: "Is AI-Generated Code Secure? What the Research Shows",
      href: "https://orbit.build/blog/ai-code-security-vulnerabilities",
      date: "2025-12-03",
      description:
        "Studies find 45-48% of AI-generated code contains security vulnerabilities. Here's what enterprises need to know before adopting AI coding tools.",
      image: "https://www.orbit.build/thumbnails/ai-code-security-vulnerabilities.webp",
      readTime: "10 min read",
      tags: ["Security", "AI", "Vulnerabilities"],
    },
    {
      title: "60+ Best Free React UI Libraries & Component Kits for 2025",
      href: "https://orbit.build/blog/react-ui-libraries",
      date: "2025-12-01",
      description:
        "The ultimate curated list of React component libraries, animation tools, and UI kits to build stunning modern interfaces. From shadcn to Aceternity, all covered.",
      image: "https://www.orbit.build/thumbnails/react-components-libraries.webp",
      readTime: "12 min read",
      tags: ["UI Libraries", "React", "Components"],
    },
    {
      title: "AI-Powered Development: How Coding Agents Are Changing Everything",
      href: "https://orbit.build/blog/ai-powered-development",
      date: "2025-11-28",
      description:
        "The shift from autocomplete to autonomous coding agents is here. Learn how AI agents are transforming software development and what it means for your workflow.",
      image: "https://www.orbit.build/thumbnails/ai-powered-development.webp",
      readTime: "8 min read",
      tags: ["AI", "Coding Agents", "Development"],
    },
    {
      title: "Introducing the UDE: Why IDEs Aren't Enough Anymore",
      href: "https://orbit.build/blog/introducing-the-ude",
      date: "2025-11-25",
      description:
        "Coining a new term: the Unified Development Environment. Here's why the fragmented IDE era is ending and what comes next.",
      image: "https://www.orbit.build/thumbnails/unified-development-environments.webp",
      readTime: "7 min read",
      tags: ["UDE", "Development Tools", "Productivity"],
    },
    {
      title: "The Context Switching Tax: Why Developers Are Losing 4 Hours Daily",
      href: "https://orbit.build/blog/context-switching-tax",
      date: "2025-11-22",
      description:
        "Every alt-tab costs you more than you think. Here's the science behind context switching and how to reclaim your focus.",
      image: "https://www.orbit.build/thumbnails/context-switching-tax.webp",
      readTime: "6 min read",
      tags: ["Productivity", "Focus", "Development"],
    },
    {
      title: "Multi-Model AI: Why One LLM Isn't Enough for Development",
      href: "https://orbit.build/blog/multi-model-ai",
      date: "2025-11-20",
      description:
        "GPT-5, Claude, Gemini. Each model has strengths and weaknesses. Smart developers use them all. Here's how.",
      image: "https://www.orbit.build/thumbnails/multi-model-ai.webp",
      readTime: "7 min read",
      tags: ["AI", "LLM", "GPT"],
    },
    {
      title: "Plan, Execute, Critique: The Three Modes of AI-Assisted Development",
      href: "https://orbit.build/blog/plan-execute-critique",
      date: "2025-11-18",
      description:
        "Stop treating AI as autocomplete. The real power is in modes: planning before coding, executing autonomously, and multi-model critique. Here's how it works.",
      image: "https://www.orbit.build/thumbnails/plan-execute-critique.webp",
      readTime: "8 min read",
      tags: ["AI", "Workflow", "Development"],
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
