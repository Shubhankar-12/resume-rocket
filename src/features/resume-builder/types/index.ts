// Public types for the resume-builder feature. Shapes mirror the backend
// `resume_draft` documents returned by /api/v1/resume-builder (the query layer
// renames `_id` -> `resume_draft_id` and keeps every other field as stored).

export const TEMPLATE_IDS = ["classic", "modern", "compact"] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const SECTION_KEYS = [
  "summary",
  "skills",
  "experience",
  "education",
  "projects",
  "certifications",
  "languages",
  "interests",
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export interface BuilderLink {
  label: string;
  url: string;
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

export interface BuilderBasics {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  links: BuilderLink[];
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
  languages: string[];
  interests: string[];
  experience: BuilderExperience[];
  education: BuilderEducation[];
  projects: BuilderProject[];
  certifications: BuilderCertification[];
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
    | "languages"
    | "interests"
    | "experience"
    | "education"
    | "projects"
    | "certifications"
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
