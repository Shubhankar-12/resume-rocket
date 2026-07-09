import type { ComponentType } from "react";
import type { TemplateId, TemplateProps } from "../../types";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { CompactTemplate } from "./CompactTemplate";

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
];

export function templateComponent(id: TemplateId): ComponentType<TemplateProps> {
  return (TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]).Component;
}
