import type { ComponentType } from "react";
import type { TemplateId, TemplateProps } from "../../types";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { JakeTemplate } from "./JakeTemplate";
import { CourseworkTemplate } from "./CourseworkTemplate";
import { FaangPathTemplate } from "./FaangPathTemplate";
import { BusinessProTemplate } from "./BusinessProTemplate";
import { DeedyTemplate } from "./DeedyTemplate";
import { ModernTechTemplate } from "./ModernTechTemplate";
import { EmojiTemplate } from "./EmojiTemplate";
import { TriHeaderTemplate } from "./TriHeaderTemplate";
import { DarkSidebarTemplate } from "./DarkSidebarTemplate";
import { BlueSidebarTemplate } from "./BlueSidebarTemplate";
import { TimelinePhotoTemplate } from "./TimelinePhotoTemplate";
import { ExecSidebarTemplate } from "./ExecSidebarTemplate";

export type TemplateCategory = "ats" | "designer";

export interface TemplateMeta {
  id: TemplateId;
  label: string;
  description: string;
  category: TemplateCategory;
  /** false => shows a "Not ATS" badge in the gallery. */
  atsSafe: boolean;
  Component: ComponentType<TemplateProps>;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Serif · formal",
    category: "ats",
    atsSafe: true,
    Component: ClassicTemplate,
  },
  {
    id: "modern",
    label: "Modern",
    description: "Sans · accent rule",
    category: "ats",
    atsSafe: true,
    Component: ModernTemplate,
  },
  {
    id: "compact",
    label: "Compact",
    description: "Dense · one page",
    category: "ats",
    atsSafe: true,
    Component: CompactTemplate,
  },
  {
    id: "jake",
    label: "Jake's",
    description: "Clean LaTeX standard",
    category: "ats",
    atsSafe: true,
    Component: JakeTemplate,
  },
  {
    id: "coursework-classic",
    label: "Coursework",
    description: "Icon contacts · coursework",
    category: "ats",
    atsSafe: true,
    Component: CourseworkTemplate,
  },
  {
    id: "faangpath",
    label: "FAANGPath",
    description: "All-caps · leadership",
    category: "ats",
    atsSafe: true,
    Component: FaangPathTemplate,
  },
  {
    id: "deedy",
    label: "Deedy",
    description: "Dense academic",
    category: "ats",
    atsSafe: true,
    Component: DeedyTemplate,
  },
  {
    id: "emoji",
    label: "Emoji",
    description: "Friendly · skill tiers",
    category: "ats",
    atsSafe: true,
    Component: EmojiTemplate,
  },
  {
    id: "business-pro",
    label: "Business Pro",
    description: "Non-tech · polished",
    category: "ats",
    atsSafe: true,
    Component: BusinessProTemplate,
  },
  {
    id: "modern-tech",
    label: "Modern Tech",
    description: "Accent headings · icons",
    category: "ats",
    atsSafe: true,
    Component: ModernTechTemplate,
  },
  {
    id: "tri-header",
    label: "Tri-Header",
    description: "Three-column header",
    category: "ats",
    atsSafe: true,
    Component: TriHeaderTemplate,
  },
  {
    id: "dark-sidebar",
    label: "Dark Header",
    description: "Dark band · sidebar",
    category: "designer",
    atsSafe: false,
    Component: DarkSidebarTemplate,
  },
  {
    id: "blue-sidebar",
    label: "Blue Sidebar",
    description: "Left rail · blue",
    category: "designer",
    atsSafe: false,
    Component: BlueSidebarTemplate,
  },
  {
    id: "timeline-photo",
    label: "Timeline",
    description: "Photo · timeline · bars",
    category: "designer",
    atsSafe: false,
    Component: TimelinePhotoTemplate,
  },
  {
    id: "exec-sidebar",
    label: "Executive",
    description: "Photo · navy/gold",
    category: "designer",
    atsSafe: false,
    Component: ExecSidebarTemplate,
  },
];

export function templateComponent(id: TemplateId): ComponentType<TemplateProps> {
  return (TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]).Component;
}
