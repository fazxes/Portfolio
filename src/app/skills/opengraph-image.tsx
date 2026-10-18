import { ogCard, ogContentType, ogSize } from "@/lib/og-card";
import { SKILLS_DESCRIPTION } from "@/lib/skills";

export const alt = "Skills";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ title: "Skills", description: SKILLS_DESCRIPTION });
}
