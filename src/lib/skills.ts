import { allSkills } from "content-collections";

export type Skill = (typeof allSkills)[number];

export const SKILLS_DESCRIPTION = "Agent skills I've written, and the ones I use every day.";

const byName = (a: Skill, b: Skill) => a.name.localeCompare(b.name);

/**
 * Whether Google should index the skill's page. Someone else's skill is a copy of
 * their README (or just a link to it), so it stays out of the index: Google treats
 * copied pages as low value, and the original should rank, not this copy.
 */
export const isIndexed = (skill: Skill): boolean => skill.mine;

export const allSkillsByName = (): Skill[] => [...allSkills].sort(byName);

export function getSkill(slug: string): Skill | undefined {
  return allSkills.find((skill) => skill.slug === slug);
}

/** The /skills index: daily drivers in usage order, then everything by author. */
export function getSkillGroups() {
  return {
    daily: allSkills
      .filter((skill) => skill.daily !== undefined)
      .sort((a, b) => (a.daily ?? 0) - (b.daily ?? 0)),
    mine: allSkills.filter((skill) => skill.mine).sort(byName),
    others: allSkills.filter((skill) => !skill.mine).sort(byName),
  };
}

/**
 * Where a link inside a skill's README should point. Absolute and in-page links stay
 * as they are; relative ones resolve against the skill's upstream folder. Without
 * an upstream there is nothing to link to, so this returns undefined.
 */
export function resolveSkillHref(skill: Skill, href: string | undefined): string | undefined {
  if (!href || /^([a-z][a-z0-9+.-]*:|#)/i.test(href)) {return href;}
  if (!skill.source) {return undefined;}
  return new URL(href, `${skill.source.replace(/\/$/, "")}/`).toString();
}
