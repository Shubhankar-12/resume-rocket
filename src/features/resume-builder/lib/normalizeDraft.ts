import type { BuilderResume } from "../types";

const arr = <T>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);
const str = (v: unknown): string => (typeof v === "string" ? v : "");

/**
 * Fill every field a draft might be missing. Drafts created before newer fields
 * (grouped skills, coursework, awards, photo, etc.) were added come back without
 * them; this guarantees editors/templates always see complete arrays/objects.
 */
export function normalizeDraft(d: any): BuilderResume {
  const b = d?.basics ?? {};
  return {
    ...d,
    basics: {
      name: str(b.name),
      headline: str(b.headline),
      email: str(b.email),
      phone: str(b.phone),
      location: str(b.location),
      links: arr(b.links),
      photoUrl: str(b.photoUrl),
    },
    summary: str(d?.summary),
    skills: arr(d?.skills),
    skillGroups: arr(d?.skillGroups).map((g: any) => ({
      ...g,
      skills: arr(g?.skills),
    })),
    languages: arr(d?.languages),
    languageItems: arr(d?.languageItems),
    interests: arr(d?.interests),
    experience: arr(d?.experience).map((x: any) => ({
      ...x,
      bullets: arr(x?.bullets),
      description: str(x?.description),
    })),
    education: arr(d?.education).map((x: any) => ({
      ...x,
      gpa: str(x?.gpa),
      honors: str(x?.honors),
      coursework: arr(x?.coursework),
    })),
    projects: arr(d?.projects).map((x: any) => ({
      ...x,
      technologies: arr(x?.technologies),
      links: arr(x?.links),
    })),
    certifications: arr(d?.certifications),
    awards: arr(d?.awards),
    publications: arr(d?.publications),
    volunteer: arr(d?.volunteer).map((x: any) => ({ ...x, description: str(x?.description) })),
    activities: arr(d?.activities),
    section_order: arr(d?.section_order),
  } as BuilderResume;
}
