import { DATA } from "@/data/resume";
import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { getSkill } from "@/lib/skills";
import { allSkills } from "content-collections";

export const alt = "Agent skill";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return allSkills.map((skill) => ({ slug: skill.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) {return new Response("Not found", { status: 404 });}
  return ogCard({
    title: skill.name,
    description: skill.summary,
    footer: skill.mine ? `An agent skill by ${DATA.name}` : `An agent skill by ${skill.author}`,
  });
}
