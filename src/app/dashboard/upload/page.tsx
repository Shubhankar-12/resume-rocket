"use client";

import type React from "react";

import { useState } from "react";
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

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isParsing, setIsParsing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(droppedFile);
        simulateUpload(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      simulateUpload(selectedFile);
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
  };

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
          <Button variant="outline" onClick={() => setFile(null)}>
            Cancel
          </Button>
          <Button disabled={!file || isUploading || isParsing}>
            Continue to Analysis
          </Button>
        </CardFooter>
      </Card>

      {file && !isUploading && !isParsing && (
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
                    <p>John Doe</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Email</p>
                    <p>john.doe@example.com</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Phone</p>
                    <p>(555) 123-4567</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Location</p>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Experience</h3>
                <div className="space-y-3 mt-2">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium">Senior Software Engineer</p>
                      <p className="text-sm text-muted-foreground">
                        2020 - Present
                      </p>
                    </div>
                    <p className="text-sm">TechCorp Inc.</p>
                    <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Led development of cloud-based application</li>
                      <li>Improved system performance by 40%</li>
                      <li>Mentored junior developers</li>
                    </ul>
                  </div>
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium">Software Developer</p>
                      <p className="text-sm text-muted-foreground">
                        2017 - 2020
                      </p>
                    </div>
                    <p className="text-sm">InnoSoft Solutions</p>
                    <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Developed RESTful APIs for mobile applications</li>
                      <li>Implemented CI/CD pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    JavaScript
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    React
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Node.js
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    TypeScript
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    AWS
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Docker
                  </div>
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Git
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Analyze Resume</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
