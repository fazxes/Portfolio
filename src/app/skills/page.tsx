import BlurFade from "@/components/magicui/blur-fade";
import { SkillRow } from "@/components/section/skill-row";
import { getSkillGroups, SKILLS_DESCRIPTION as DESCRIPTION, type Skill } from "@/lib/skills";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skills",
  description: DESCRIPTION,
  alternates: { canonical: "/skills" },
  openGraph: { title: "Skills", description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: "Skills", description: DESCRIPTION },
};

const BLUR_FADE_DELAY = 0.04;

export default function SkillsPage() {
  const { daily, mine, others } = getSkillGroups();
  const groups: Array<{ id: string; title: string; note?: string; skills: Skill[] }> = [
    { id: "daily", title: "Daily", note: "The ones I use most, most-used first.", skills: daily },
    { id: "mine", title: "Written by me", skills: mine },
    { id: "others", title: "By others", note: "Skills from other people that I rely on.", skills: others },
  ];

  return (
    <section id="skills">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group">
        <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" aria-hidden />
        Back home
      </Link>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
        <p className="mt-2 text-sm text-muted-foreground">{DESCRIPTION}</p>
      </BlurFade>
      {/* each group fades in as a whole; rows don't animate one by one */}
      <div className="mt-10 flex flex-col gap-12">
        {groups
          .filter((group) => group.skills.length > 0)
          .map((group, i) => (
            <BlurFade key={group.id} delay={BLUR_FADE_DELAY * (2 + i)}>
              <section id={group.id} className="flex flex-col gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{group.title}</h2>
                  {group.note && <p className="mt-1 text-sm text-muted-foreground">{group.note}</p>}
                </div>
                {/* -mx-3 offsets the rows' px-3 so names line up with the heading */}
                <div className="-mx-3 flex flex-col">
                  {group.skills.map((skill) => (
                    <SkillRow key={skill.slug} skill={skill} />
                  ))}
                </div>
              </section>
            </BlurFade>
          ))}
      </div>
    </section>
  );
}
