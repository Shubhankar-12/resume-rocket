import type { TemplateProps } from "../../types";
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

/** Renders the resume in its selected template. Shared by the live preview and the print page. */
export function ResumeTemplate({ resume }: TemplateProps) {
  switch (resume.template_id) {
    case "modern":
      return <ModernTemplate resume={resume} />;
    case "compact":
      return <CompactTemplate resume={resume} />;
    case "jake":
      return <JakeTemplate resume={resume} />;
    case "coursework-classic":
      return <CourseworkTemplate resume={resume} />;
    case "faangpath":
      return <FaangPathTemplate resume={resume} />;
    case "business-pro":
      return <BusinessProTemplate resume={resume} />;
    case "deedy":
      return <DeedyTemplate resume={resume} />;
    case "modern-tech":
      return <ModernTechTemplate resume={resume} />;
    case "emoji":
      return <EmojiTemplate resume={resume} />;
    case "tri-header":
      return <TriHeaderTemplate resume={resume} />;
    case "classic":
    default:
      return <ClassicTemplate resume={resume} />;
  }
}
