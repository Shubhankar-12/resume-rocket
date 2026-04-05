"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { fileUploader } from "@/lib/utils";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import ResumeAPI from "@/lib/api/user_resume/resume";
import { useJobStatus } from "@/hooks/useJobStatus";

interface StepResumeUploadProps {
  onComplete: (result: {
    resumeId: string;
    score: number;
    suggestions: { title: string; description: string }[];
  }) => void;
}

type UploadPhase = "idle" | "uploading" | "analyzing" | "done" | "error";

function getUserIdFromToken(): string | null {
  try {
    const token = getCookie("token") as string | undefined;
    if (!token) return null;
    const decoded = jwt.decode(token) as {
      user_id?: string;
      id?: string;
      user?: { id?: string };
    } | null;
    return decoded?.user_id ?? decoded?.id ?? decoded?.user?.id ?? null;
  } catch {
    return null;
  }
}

export function StepResumeUpload({ onComplete }: StepResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [reportJobId, setReportJobId] = useState<string | null>(null);

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jobStatus = useJobStatus(reportJobId);

  // Watch for job completion
  useEffect(() => {
    if (jobStatus.status === "completed" && resumeId) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setProgress(100);
      setPhase("done");

      // Fetch the actual report
      ResumeAPI.getResumeReport(resumeId)
        .then((response) => {
          const report = response?.data?.body;
          if (!report) throw new Error("No report data");
          const score =
            report.scoreOutOf100 ?? report.gradingScore ?? report.analysis?.gradingScore ?? 0;
          const suggestions =
            report.suggestions ??
            report.actionableSuggestions ??
            report.analysis?.suggestions ??
            [];
          onComplete({ resumeId, score, suggestions });
        })
        .catch(() => {
          // Even if report fetch fails, advance with what we have
          onComplete({ resumeId, score: 0, suggestions: [] });
        });
    }

    if (jobStatus.status === "failed") {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setPhase("error");
      setErrorMessage("Resume analysis failed. Please try again.");
    }
  }, [jobStatus.status, resumeId, onComplete]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const startProgressAnimation = () => {
    setProgress(0);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 5;
      });
    }, 400);
  };

  const handleFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setPhase("uploading");
    setErrorMessage(null);
    setProgress(0);

    const userId = getUserIdFromToken();
    if (!userId) {
      setPhase("error");
      setErrorMessage("Unable to authenticate. Please refresh and try again.");
      return;
    }

    try {
      // Step 1: Upload to S3
      const uploaded = await fileUploader(selectedFile, "resumes");
      if (!uploaded?.url) throw new Error("Upload failed");

      setPhase("analyzing");
      startProgressAnimation();

      // Step 2: Create resume record
      const createResponse = await ResumeAPI.createResume({
        url: uploaded.url,
        name: uploaded.name ?? selectedFile.name,
        mimetype: uploaded.mimetype ?? selectedFile.type,
        user_id: userId,
      });

      const createdResumeId =
        createResponse?.data?.body?.resume_id ??
        createResponse?.data?.body?._id ??
        createResponse?.data?.body?.id;

      if (!createdResumeId) throw new Error("Failed to create resume record");
      setResumeId(createdResumeId);

      // Step 3: Trigger report generation
      const reportResponse = await ResumeAPI.createReport({
        resume_id: createdResumeId,
      });

      const jobId = reportResponse?.data?.body?.job_id ?? reportResponse?.data?.body?.jobId;

      if (!jobId) throw new Error("Failed to start analysis job");
      setReportJobId(jobId);

      // useJobStatus polling takes over from here
    } catch (err) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setPhase("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const reset = () => {
    setFile(null);
    setPhase("idle");
    setProgress(0);
    setErrorMessage(null);
    setResumeId(null);
    setReportJobId(null);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const isProcessing = phase === "uploading" || phase === "analyzing";

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">Upload your resume</h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll analyse it and give you an instant score.
        </p>
      </div>

      {phase === "idle" || phase === "error" ? (
        <>
          <div
            className={cn(
              "relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Drag &amp; drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-0.5">PDF, DOCX up to 5MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={handleInputChange}
            />
          </div>

          {phase === "error" && errorMessage && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <span className="flex-1 truncate text-sm font-medium">{file?.name}</span>
            {!isProcessing && (
              <button
                type="button"
                onClick={reset}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {phase === "uploading"
                  ? "Uploading..."
                  : phase === "analyzing"
                    ? "Analysing resume..."
                    : "Complete"}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {isProcessing && (
            <p className="text-xs text-center text-muted-foreground">
              This usually takes 15–30 seconds
            </p>
          )}
        </div>
      )}
    </div>
  );
}
