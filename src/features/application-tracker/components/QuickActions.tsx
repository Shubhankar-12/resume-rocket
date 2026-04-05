"use client";

import { useRouter } from "next/navigation";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Application } from "../types/application";

interface QuickActionsProps {
  application: Application;
}

export function QuickActions({ application }: QuickActionsProps) {
  const router = useRouter();

  if (!application.resume_id) return null;

  const company = encodeURIComponent(application.company);
  const role = encodeURIComponent(application.role);
  const resume_id = encodeURIComponent(application.resume_id);

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          router.push(
            `/dashboard/cover-letters/new?company=${company}&role=${role}&resume_id=${resume_id}`
          )
        }
      >
        <Mail className="h-3.5 w-3.5 mr-1.5" />
        Generate Cover Letter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          router.push(
            `/dashboard/tailored-resume?company=${company}&role=${role}&resume_id=${resume_id}`
          )
        }
      >
        <FileText className="h-3.5 w-3.5 mr-1.5" />
        Tailor Resume
      </Button>
    </div>
  );
}
