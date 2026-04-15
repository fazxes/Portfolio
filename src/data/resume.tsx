import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Pranit Sharma",
  initials: "PS",
  url: "https://pranitsharma.com",
  location: "",
  locationLink: "",
  description:
    "Software Engineer at Vercel. Previously founded Recursive Labs and built Orbit.",
  summary:
    "I'm a software engineer at [Vercel](https://vercel.com) working on something I can't talk about yet. Before Vercel, I founded [Recursive Labs](#) where I built [Orbit](#). I like shipping fast, building tools that feel great to use, and occasionally writing about it.",
  avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "Postgres", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Java", icon: Java },
    { name: "C++", icon: Csharp },
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
      start: "2025",
      end: "Present",
      description:
        "Working on a secret project. More soon.",
    },
    {
      company: "Recursive Labs",
      href: "#",
      badges: ["Founder"],
      location: "",
      title: "Founder",
      logoUrl: "/recursive.png",
      start: "",
      end: "",
      description:
        "Founded Recursive Labs and built Orbit.",
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
      href: "#",
      dates: "",
      active: true,
      description:
        "The product I built at Recursive Labs. More details coming soon.",
      technologies: [],
      links: [],
      image: "",
      video: "",
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
