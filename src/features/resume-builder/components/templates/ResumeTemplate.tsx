import type { TemplateProps } from "../../types";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { CompactTemplate } from "./CompactTemplate";

/** Renders the resume in its selected template. Shared by the live preview and the print page. */
export function ResumeTemplate({ resume }: TemplateProps) {
  switch (resume.template_id) {
    case "modern":
      return <ModernTemplate resume={resume} />;
    case "compact":
      return <CompactTemplate resume={resume} />;
    case "classic":
    default:
      return <ClassicTemplate resume={resume} />;
  }
}
