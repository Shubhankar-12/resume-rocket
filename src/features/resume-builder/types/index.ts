// Public types for the resume-builder feature. Shapes mirror the backend
// `resume_draft` documents returned by /api/v1/resume-builder (the query layer
// renames `_id` -> `resume_draft_id` and keeps every other field as stored).

export const TEMPLATE_IDS = [
  "classic",
  "modern",
  "compact",
  "coursework-classic",
  "tri-header",
  "faangpath",
  "deedy",
  "emoji",
  "jake",
  "business-pro",
  "modern-tech",
] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

// Default order tells the candidate's story for a 6-8s recruiter scan.
export const SECTION_KEYS = [
  "summary",
  "experience",
  "skills",
  "projects",
  "education",
  "awards",
  "publications",
  "volunteer",
  "activities",
  "certifications",
  "languages",
  "interests",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export interface BuilderLink {
  label: string;
  url: string;
}

// --- Skills (grouped + optional proficiency) ---
export type SkillLevel = "expert" | "proficient" | "intermediate" | "beginner";
export interface SkillItem {
  name: string;
  level?: SkillLevel;
}
export interface SkillGroup {
  id: string;
  category: string;
  skills: SkillItem[];
}

// --- Languages (with optional proficiency) ---
export type LanguageLevel = "native" | "fluent" | "professional" | "intermediate" | "basic";
export interface LanguageItem {
  id: string;
  name: string;
  level?: LanguageLevel;
}

export interface BuilderExperience {
  id: string;
  role: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  bullets: string[];
  /** Rich-text (sanitized HTML) description; preferred over bullets when set. */
  description: string;
}

export interface BuilderEducation {
  id: string;
  degree: string;
  subject: string;
  schoolName: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  honors: string;
  coursework: string[];
}

export interface BuilderProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links: BuilderLink[];
}

export interface BuilderCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface BuilderAward {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface BuilderPublication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  description: string;
}

export interface BuilderVolunteer {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  /** Rich-text (sanitized HTML). */
  description: string;
}

export interface BuilderActivity {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface BuilderBasics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  links: BuilderLink[];
  /** Used only by designer templates. */
  photoUrl: string;
}

export interface BuilderResume {
  resume_draft_id: string;
  user_id: string;
  title: string;
  template_id: TemplateId;
  accent_color: string;
  basics: BuilderBasics;
  summary: string;
  skills: string[];
  skillGroups: SkillGroup[];
  languages: string[];
  languageItems: LanguageItem[];
  interests: string[];
  experience: BuilderExperience[];
  education: BuilderEducation[];
  projects: BuilderProject[];
  certifications: BuilderCertification[];
  awards: BuilderAward[];
  publications: BuilderPublication[];
  volunteer: BuilderVolunteer[];
  activities: BuilderActivity[];
  section_order: string[];
  status_field?: string;
  created_on?: string;
  updated_on?: string;
}

/** A row from GET /resume-builder/list. */
export interface ResumeDraftSummary {
  resume_draft_id: string;
  title: string;
  template_id: TemplateId;
  updated_on: string;
}

/** Fields the editor may patch (never user_id / status_field / id). */
export type BuilderPatch = Partial<
  Pick<
    BuilderResume,
    | "title"
    | "template_id"
    | "accent_color"
    | "basics"
    | "summary"
    | "skills"
    | "skillGroups"
    | "languages"
    | "languageItems"
    | "interests"
    | "experience"
    | "education"
    | "projects"
    | "certifications"
    | "awards"
    | "publications"
    | "volunteer"
    | "activities"
    | "section_order"
  >
>;

/** Props every section editor receives. */
export interface SectionEditorProps {
  draft: BuilderResume;
  update: (patch: BuilderPatch) => void;
}

/** Props every template (preview + print) receives. */
export interface TemplateProps {
  resume: BuilderResume;
}
