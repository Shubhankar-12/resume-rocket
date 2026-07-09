"use client";

import type { BuilderResume } from "../../types";
import { ResumeTemplate } from "../templates/ResumeTemplate";

/** Live preview of the resume on its selected template, on a paper-like surface. */
export function ResumePreview({ resume }: { resume: BuilderResume }) {
  return (
    <div className="h-full overflow-auto rounded-lg border border-rr-border-muted bg-gray-200 p-3 sm:p-5 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-[800px] bg-white shadow-md">
        <ResumeTemplate resume={resume} />
      </div>
    </div>
  );
}
