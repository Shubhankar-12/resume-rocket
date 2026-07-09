import type { ComponentType } from "react";
import type { TemplateId, TemplateProps } from "../../types";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { CompactTemplate } from "./CompactTemplate";

export interface TemplateMeta {
  id: TemplateId;
  label: string;
  description: string;
  Component: ComponentType<TemplateProps>;
}

export const TEMPLATES: TemplateMeta[] = [
  { id: "classic", label: "Classic", description: "Serif · formal", Component: ClassicTemplate },
  { id: "modern", label: "Modern", description: "Sans · accent rule", Component: ModernTemplate },
  { id: "compact", label: "Compact", description: "Dense · one page", Component: CompactTemplate },
];

export function templateComponent(id: TemplateId): ComponentType<TemplateProps> {
  return (TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0]).Component;
}
