"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  FileText,
  BarChart,
  Download,
  Pencil,
  Eye,
  ChevronRight,
  ArrowRight,
  Trash,
} from "lucide-react";
import ResumeAPI from "@/lib/api/user_resume/resume";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import ResumeCard from "@/components/Resumes/ResumeCard";
import ResumePreview from "@/components/Resumes/ResumePreview";
import { ResumeData } from "@/components/Resumes/types";
import { format, set } from "date-fns";
import { useLoader } from "@/hooks/useLoader";

export default function MyResumesPage() {
  const router = useRouter();
  const [selectedResume, setSelectedResume] = useState<ResumeData | null>(null);
  const [isRecent, setIsRecent] = useState(false);
  const [isTailored, setIsTailored] = useState(false);
  const loader = useLoader();

  const handleResumeClick = (resume: ResumeData) => {
    setSelectedResume(resume);
  };

  const fetchReport = async (resume_id: string) => {
    try {
      const resp = await ResumeAPI.getResumeReport(resume_id);
      if (resp && resp.data && resp.data.body) {
        return true;
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleAnalyzeClick = async () => {
    if (selectedResume) {
      loader.show("Generating report...");
      const resume_id = selectedResume.resume_id;
      const reportExists = await fetchReport(resume_id);
      if (!reportExists) {
        try {
          const resp = await ResumeAPI.createReport({
            resume_id: selectedResume.resume_id,
          });
          if (resp && resp.data && resp.data.body) {
            loader.hide();
            router.push(`/dashboard/grader/${resume_id}`);
          } else {
            console.error("Error creating report:", resp);
            loader.hide();
          }
        } catch (error) {
          console.error("Error creating report:", error);
          loader.hide();
        }
      }
      loader.hide();
      router.push(`/dashboard/grader/${resume_id}`);
    }
  };

  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const fetchAllResumes = async () => {
    const token = getCookie("token") as string;
    const decodedToken: any = await jwt.decode(token);
    console.log("Decoded Token:", decodedToken);

    if (!decodedToken || !decodedToken?.user || !decodedToken?.user?.id) {
      console.error("Invalid token or user ID not found");
      return;
    }

    try {
      const resp = await ResumeAPI.getAllResumes({
        search: "",
        user_id: decodedToken.user.id,
        limit: isRecent ? 3 : undefined,
      });
      if (resp && resp.data && resp.data.body) {
        setResumes(resp.data.body);
        console.log("Resumes:", resp.data.body);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    setSelectedResume(null);
    fetchAllResumes();
  }, [isRecent, isTailored]);

  const handleResumeDownload = async () => {
    if (selectedResume) {
      const downloadUrl =
        process.env.NEXT_PUBLIC_BUCKET_PROXY_URL + selectedResume.resume.url;

      try {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = downloadUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // clean up
      } catch (error) {
        console.error("Error downloading resume:", error);
      }
    }
  };

  const handleDeleteClick = async () => {
    if (selectedResume) {
      const response = await ResumeAPI.updateResume({
        resume_id: selectedResume.resume_id,
        status: "DISABLED",
      });
      if (response && response.data && response.data.body) {
        await fetchAllResumes();
        setSelectedResume(null);
      } else {
        console.error("Error deleting resume:", response);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Resumes</h1>
          <p className="text-muted-foreground">
            View, edit, and analyze your resumes
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload New Resume
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Resume Library</CardTitle>
              <CardDescription>Select a resume to preview</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={(value) => {
                  setIsRecent(value === "recent");
                  setIsTailored(value === "tailored");
                }}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="tailored" className="flex-1">
                    Tailored
                  </TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <div className="space-y-3 pt-3">
                    {resumes.map((resume) => (
                      <ResumeCard
                        key={resume.resume_id}
                        resume={resume}
                        isSelected={
                          selectedResume?.resume_id === resume.resume_id
                        }
                        onClick={() => handleResumeClick(resume)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedResume ? (
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{selectedResume.resume.name}</CardTitle>
                  <CardDescription>
                    Last modified{" "}
                    {selectedResume.updated_on &&
                      format(selectedResume.updated_on, "dd MMM yyyy")}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_BUCKET_PROXY_URL +
                      selectedResume.resume.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={handleResumeDownload}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </Link>
                  <Button
                    onClick={handleDeleteClick}
                    variant="outline"
                    size="sm"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" onClick={handleAnalyzeClick}>
                    <BarChart className="mr-2 h-4 w-4" />
                    Analyze
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Resume Score</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">
                        {selectedResume.analysis.gradingScore}/100
                      </div>
                      <Progress
                        value={selectedResume.analysis.gradingScore}
                        className="h-2 flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">ATS Compatibility</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">
                        {selectedResume.analysis.atsScore}%
                      </div>
                      <Progress
                        value={selectedResume.analysis.atsScore}
                        className="h-2 flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <ScrollArea className="h-[calc(100vh-400px)]">
                  <ResumePreview resume={selectedResume.extracted_resume} />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAnalyzeClick}>
                  Go to Resume Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium">Select a Resume</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a resume from the library to view its details and
                analysis
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
