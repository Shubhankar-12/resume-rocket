import type { ComponentType } from "react";
import type { SectionKey, SectionEditorProps } from "../../types";

import { SummarySection } from "./sections/SummarySection";
import { SkillsSection } from "./sections/SkillsSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { InterestsSection } from "./sections/InterestsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { EducationSection } from "./sections/EducationSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { CertificationsSection } from "./sections/CertificationsSection";

export const SECTION_EDITORS: Record<
  SectionKey,
  { label: string; Component: ComponentType<SectionEditorProps> }
> = {
  summary: { label: "Summary", Component: SummarySection },
  skills: { label: "Skills", Component: SkillsSection },
  experience: { label: "Experience", Component: ExperienceSection },
  education: { label: "Education", Component: EducationSection },
  projects: { label: "Projects", Component: ProjectsSection },
  certifications: { label: "Certifications", Component: CertificationsSection },
  languages: { label: "Languages", Component: LanguagesSection },
  interests: { label: "Interests", Component: InterestsSection },
};
