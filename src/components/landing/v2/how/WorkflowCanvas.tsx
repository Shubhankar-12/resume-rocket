"use client";

import type { ReactNode } from "react";
import { STAGES, type StageKey } from "./how-data";
import { WorkflowStage } from "./WorkflowStage";
import { UploadPreview } from "./previews/UploadPreview";
import { ParsePreview } from "./previews/ParsePreview";
import { AnalysisPreview } from "./previews/AnalysisPreview";
import { TailoredPreview } from "./previews/TailoredPreview";
import { CoverLetterPreview } from "./previews/CoverLetterPreview";
import { TrackerPreview } from "./previews/TrackerPreview";

const PREVIEWS: Record<StageKey, ReactNode> = {
  upload: <UploadPreview />,
  parse: <ParsePreview />,
  analysis: <AnalysisPreview />,
  tailored: <TailoredPreview />,
  cover: <CoverLetterPreview />,
  tracker: <TrackerPreview />,
};

/** The dominant right column: the connected sequence of product previews. */
export function WorkflowCanvas({
  active,
  onEnter,
}: {
  active: number;
  onEnter: (index: number) => void;
}) {
  return (
    <ol>
      {STAGES.map((stage, i) => (
        <WorkflowStage
          key={stage.key}
          stage={stage}
          index={i}
          active={active}
          isLast={i === STAGES.length - 1}
          onEnter={onEnter}
        >
          {PREVIEWS[stage.key]}
        </WorkflowStage>
      ))}
    </ol>
  );
}
