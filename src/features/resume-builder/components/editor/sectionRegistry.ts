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
import { AwardsSection } from "./sections/AwardsSection";
import { PublicationsSection } from "./sections/PublicationsSection";
import { VolunteerSection } from "./sections/VolunteerSection";
import { ActivitiesSection } from "./sections/ActivitiesSection";

export const SECTION_EDITORS: Record<
  SectionKey,
  { label: string; Component: ComponentType<SectionEditorProps> }
> = {
  summary: { label: "Summary", Component: SummarySection },
  experience: { label: "Experience", Component: ExperienceSection },
  skills: { label: "Skills", Component: SkillsSection },
  projects: { label: "Projects", Component: ProjectsSection },
  education: { label: "Education", Component: EducationSection },
  awards: { label: "Awards", Component: AwardsSection },
  publications: { label: "Publications", Component: PublicationsSection },
  volunteer: { label: "Volunteer", Component: VolunteerSection },
  activities: { label: "Activities", Component: ActivitiesSection },
  certifications: { label: "Certifications", Component: CertificationsSection },
  languages: { label: "Languages", Component: LanguagesSection },
  interests: { label: "Interests", Component: InterestsSection },
};
