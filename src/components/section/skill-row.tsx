import Link from "next/link";
import type { Skill } from "@/lib/skills";

/**
 * One skill in the /skills index: name, its one-sentence summary, and
 * the author when it isn't me. Same instant, gapless hover as the Writings rows.
 */
export function SkillRow({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group flex flex-col gap-1 rounded-xl px-3 py-2.5 hover:bg-muted/60 focus-visible:bg-muted/60"
    >
      <span className="flex items-baseline gap-2">
        <h3 className="font-mono text-sm font-medium">{skill.name}</h3>
        {!skill.mine && <span className="text-xs text-muted-foreground">by {skill.author}</span>}
      </span>
      <p className="line-clamp-2 text-sm text-pretty text-muted-foreground">{skill.summary}</p>
    </Link>
  );
}
