import { ChevronRight, FileText } from "lucide-react";
import { Badge } from "../ui/badge";
import { ResumeData } from "./types";
import { format } from "date-fns";

interface ResumeCardProps {
  resume: ResumeData;
  isSelected: boolean;
  onClick: () => void;
}

export default function ResumeCard({
  resume,
  isSelected,
  onClick,
}: ResumeCardProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-3 transition-all hover:bg-accent/50 ${
        isSelected ? "border-teal-600 bg-teal-50 dark:bg-teal-950/30" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
            <FileText className="h-4 w-4 text-teal-600" />
          </div>
          <div>
            <div className="font-medium">
              {resume.resume.name || "Untitled"}
            </div>
            <div className="text-xs text-muted-foreground">
              {resume.created_on && format(resume.created_on, "dd MMM yyyy")}
            </div>
          </div>
        </div>
        <ChevronRight
          className={`h-4 w-4 ${
            isSelected ? "text-teal-600" : "text-muted-foreground"
          }`}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {resume?.extracted_resume?.category || "-"}
        </Badge>
        <div className="text-xs text-muted-foreground">
          {resume.analysis.gradingScore}/100
        </div>
      </div>
    </div>
  );
}
