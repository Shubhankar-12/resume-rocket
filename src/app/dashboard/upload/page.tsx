"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fileUploader } from "@/lib/utils";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import ResumeAPI from "@/lib/api/user_resume/resume";
import { useRouter } from "next/navigation";
import { useLoader } from "@/hooks/useLoader";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [inActiveUpload, setInActiveUpload] = useState(false);
  const router = useRouter();
  const loader = useLoader();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    try {
      setIsParsing(true);
      const resp = await fileUploader(file, "resumes");
      console.log("response media", resp);
      setIsParsing(false);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  const getResumeAnalysis = async () => {
    const token: any = await getCookie("token");
    const decodedToken: any = jwt.decode(token);

    if (!decodedToken?.user?.id) {
      console.error("Invalid user token");
      return;
    }

    try {
      setIsUploading(true);

      // Upload the resume first
      const resume = await handleUpload();

      if (!resume?.url) {
        throw new Error("Failed to upload resume");
      }

      // Reset progress to 0 before starting analysis
      setUploadProgress(0);

      // Start the progress interval for the analysis phase
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            return 95; // Cap at 95% until complete
          }
          return prev + 5;
        });
      }, 200);

      // Call API to process the resume
      const resp = await ResumeAPI.createResume({
        resume: resume,
        user_id: decodedToken.user.id,
      });

      // Clear interval and set final progress
      clearInterval(interval);

      if (resp?.data?.body) {
        setUploadProgress(100);
        setResumeAnalysis(resp.data.body);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Resume analysis failed:", error);
      setUploadProgress(0); // Reset progress on error
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyzeResume = async () => {
    if (!resumeAnalysis || !resumeAnalysis.resume_id) {
      // Call the API to analyze the resume
      console.log("Resume analysis not available...");
      return;
    }
    try {
      loader.show("Generating report...");
      const resp = await ResumeAPI.createReport({
        resume_id: resumeAnalysis.resume_id,
      });
      if (resp && resp.data && resp.data.body) {
        loader.hide();
        router.push(`/dashboard/grader/${resp.data.body.resume_id}`);
      }
    } catch (error) {
      loader.hide();
      console.log(error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (inActiveUpload) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsParsing(true);

          // Simulate parsing delay
          setTimeout(() => {
            setIsParsing(false);
          }, 2000);

          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setIsParsing(false);
    setResumeAnalysis(null);
    loader.hide();
  };

  const handleCancel = async () => {
    removeFile();
    try {
      setInActiveUpload(true);
      const resp = await ResumeAPI.updateResume({
        resume_id: resumeAnalysis.resume_id,
      });
      if (resp && resp.data && resp.data.body) {
        setResumeAnalysis(resp.data.body);
        setInActiveUpload(false);
      }
    } catch (error) {
      setInActiveUpload(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      getResumeAnalysis();
    }
  }, [file]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Upload Your Resume</h1>
        <p className="text-muted-foreground">
          Upload your resume to get started with analysis and optimization
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resume Upload</CardTitle>
          <CardDescription>
            Drag and drop your resume file or click to browse. We support PDF
            and DOCX formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Drag and drop your resume here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                />
                <Button
                  variant="outline"
                  disabled={inActiveUpload}
                  onClick={() =>
                    document.getElementById("resume-upload")?.click()
                  }
                >
                  Browse Files
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {isParsing && (
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                    <p>Parsing resume content...</p>
                  </div>
                </div>
              )}

              {!isUploading && !isParsing && (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Resume uploaded successfully!
                  </p>
                  <p className="text-sm text-green-600/80 dark:text-green-400/80">
                    We've extracted the key information from your resume.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            disabled={!file || !resumeAnalysis?.resume_id}
            onClick={handleAnalyzeResume}
          >
            Analyze Resume
          </Button>
        </CardFooter>
      </Card>

      {resumeAnalysis && resumeAnalysis.extractedText && (
        <Card>
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
            <CardDescription>
              Here's what we extracted from your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Contact Information</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Name</p>
                    <p>{resumeAnalysis.extractedText?.name || "-"}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Email</p>
                    <p>{resumeAnalysis.extractedText?.email || "-"}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Phone</p>
                    <p>{resumeAnalysis.extractedText?.phone || "-"}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Location</p>
                    <p>{resumeAnalysis.extractedText?.location || "-"}</p>
                  </div>
                </div>
              </div>

              {resumeAnalysis.extractedText?.experience &&
                resumeAnalysis.extractedText?.experience.length > 0 && (
                  <div>
                    <h3 className="font-semibold">Experience</h3>
                    <div className="space-y-3 mt-2">
                      {resumeAnalysis.extractedText?.experience.map(
                        (exp: any, index: any) => (
                          <div key={index} className="p-3 border rounded-md">
                            <div className="flex justify-between">
                              <p className="font-medium">{exp?.role || "-"}</p>
                              <p className="text-sm text-muted-foreground">
                                {exp?.startDate} -{" "}
                                {exp?.isPresent
                                  ? "Present"
                                  : exp?.endDate ?? "-"}
                              </p>
                            </div>
                            <p className="text-sm">{exp?.companyName || "-"}</p>
                            <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                              {exp.tasks &&
                                exp.tasks.length > 0 &&
                                exp.tasks.map((task: any, index: any) => (
                                  <li key={index}>{task || "-"}</li>
                                ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div>
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeAnalysis.extractedText?.skills &&
                    resumeAnalysis.extractedText?.skills.length > 0 &&
                    resumeAnalysis.extractedText?.skills.map(
                      (skill: any, index: any) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {skill}
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAnalyzeResume}>
              View Full Report
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
