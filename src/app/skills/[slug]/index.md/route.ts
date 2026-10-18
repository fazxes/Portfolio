import { markdownResponse, skillMarkdown, skillMarkdownCanonical } from "@/lib/agent-markdown";
import { getSkill } from "@/lib/skills";
import { allSkills } from "content-collections";

export const dynamic = "force-static";

export function generateStaticParams() {
  return allSkills.map((skill) => ({ slug: skill.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) {return new Response("Not found", { status: 404 });}
  return markdownResponse(skillMarkdown(skill), { canonical: skillMarkdownCanonical(skill) });
}
