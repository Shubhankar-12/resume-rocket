import type { BuilderResume, SectionKey, SkillLevel, LanguageItem } from "../../types";
import { SECTION_KEYS } from "../../types";

export interface ResolvedSkillGroup {
  category: string;
  skills: { name: string; level?: SkillLevel }[];
}

/** Skill groups to render: real groups if present, else one group from the flat list. */
export function skillGroupsResolved(resume: BuilderResume): ResolvedSkillGroup[] {
  const groups = (resume.skillGroups ?? []).filter((g) => (g.skills ?? []).length > 0);
  if (groups.length) {
    return groups.map((g) => ({
      category: g.category,
      skills: (g.skills ?? []).filter((s) => s.name),
    }));
  }
  const flat = resume.skills ?? [];
  return flat.length ? [{ category: "", skills: flat.map((n) => ({ name: n })) }] : [];
}

const TIER_ORDER: SkillLevel[] = ["expert", "proficient", "intermediate", "beginner"];

/** Skills grouped by proficiency tier (for tiered/emoji templates). */
export function skillsByTier(
  resume: BuilderResume
): { level: SkillLevel | "other"; names: string[] }[] {
  const all = skillGroupsResolved(resume).flatMap((g) => g.skills);
  const byTier = new Map<string, string[]>();
  for (const s of all) {
    const key = s.level ?? "other";
    (byTier.get(key) ?? byTier.set(key, []).get(key)!).push(s.name);
  }
  const out: { level: SkillLevel | "other"; names: string[] }[] = [];
  for (const t of TIER_ORDER) if (byTier.has(t)) out.push({ level: t, names: byTier.get(t)! });
  if (byTier.has("other")) out.push({ level: "other", names: byTier.get("other")! });
  return out;
}

/** Languages to render: items if present, else derived from the flat list. */
export function languagesResolved(resume: BuilderResume): LanguageItem[] {
  const items = (resume.languageItems ?? []).filter((l) => l.name);
  if (items.length) return items;
  return (resume.languages ?? []).map((n) => ({ id: n, name: n }));
}

/** Accent color tokens -> hex (templates render in fixed light/print colors). */
export const ACCENT_HEX: Record<string, string> = {
  accent: "#6366f1",
  slate: "#334155",
  emerald: "#059669",
  blue: "#2563eb",
  rose: "#e11d48",
  amber: "#d97706",
};

export function accentHex(key: string | undefined): string {
  return (key && ACCENT_HEX[key]) || ACCENT_HEX.accent;
}

export const SECTION_LABEL: Record<SectionKey, string> = {
  summary: "Summary",
  skills: "Skills",
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  awards: "Awards",
  publications: "Publications",
  volunteer: "Volunteer",
  activities: "Activities",
  certifications: "Certifications",
  languages: "Languages",
  interests: "Interests",
};

/** True when a section has any content worth rendering. */
export function hasSectionContent(resume: BuilderResume, key: SectionKey): boolean {
  switch (key) {
    case "summary":
      return !!resume.summary?.trim();
    case "skills":
      return (
        (resume.skills ?? []).length > 0 ||
        (resume.skillGroups ?? []).some((g) => (g.skills ?? []).length > 0)
      );
    case "experience":
      return (resume.experience ?? []).length > 0;
    case "education":
      return (resume.education ?? []).length > 0;
    case "projects":
      return (resume.projects ?? []).length > 0;
    case "awards":
      return (resume.awards ?? []).length > 0;
    case "publications":
      return (resume.publications ?? []).length > 0;
    case "volunteer":
      return (resume.volunteer ?? []).length > 0;
    case "activities":
      return (resume.activities ?? []).length > 0;
    case "certifications":
      return (resume.certifications ?? []).length > 0;
    case "languages":
      return (resume.languages ?? []).length > 0 || (resume.languageItems ?? []).length > 0;
    case "interests":
      return (resume.interests ?? []).length > 0;
    default:
      return false;
  }
}

/** Flat skill names from groups (preferred) or the legacy flat list. */
export function flatSkills(resume: BuilderResume): string[] {
  const fromGroups = (resume.skillGroups ?? []).flatMap((g) =>
    (g.skills ?? []).map((s) => s.name).filter(Boolean)
  );
  return fromGroups.length ? fromGroups : (resume.skills ?? []);
}

/** Flat language names from items (preferred) or the legacy flat list. */
export function flatLanguages(resume: BuilderResume): string[] {
  const fromItems = (resume.languageItems ?? []).map((l) => l.name).filter(Boolean);
  return fromItems.length ? fromItems : (resume.languages ?? []);
}

/** Section keys to render, in the draft's saved order, filtered to non-empty ones. */
export function orderedSectionKeys(resume: BuilderResume): SectionKey[] {
  const order = (resume.section_order ?? []).filter((k): k is SectionKey =>
    (SECTION_KEYS as readonly string[]).includes(k)
  );
  // Append any canonical keys missing from a stored order (forward-compat).
  for (const k of SECTION_KEYS) if (!order.includes(k)) order.push(k);
  return order.filter((k) => hasSectionContent(resume, k));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "YYYY-MM" -> "May 2024"; legacy free-text passes through unchanged. */
export function formatMonth(value: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(value ?? "");
  if (!m) return value ?? "";
  const idx = parseInt(m[2], 10) - 1;
  return idx >= 0 && idx < 12 ? `${MONTHS[idx]} ${m[1]}` : value;
}

/** "May 2020 – Present" style range (en dash, never an em dash). */
export function dateRange(start: string, end: string, isPresent?: boolean): string {
  const s = formatMonth(start);
  const e = isPresent ? "Present" : formatMonth(end);
  if (s && e) return `${s} – ${e}`;
  return s || e || "";
}
