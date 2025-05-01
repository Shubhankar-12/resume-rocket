"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { ResumeData } from "@/components/Resumes/types";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import CoverLetterAPI from "@/lib/api/cover-letters/cover_letter";
import { useRouter } from "next/navigation";
import ResumeAPI from "@/lib/api/user_resume/resume";
import { useLoader } from "@/hooks/useLoader";

export default function NewCoverLetterPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState({
    cover_letter: "",
    resume_id: "",
    cover_letter_id: "",
    cover_letter_summary: "",
    job_description: "",
    role: "",
    company: "",
  });

  // Mock resume data
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const router = useRouter();
  const loader = useLoader();

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
    fetchAllResumes();
  }, []);

  const handleGenerate = async () => {
    if (!jobTitle || !companyName || !jobDescription || !selectedResume) {
      return;
    }
    const token = getCookie("token") as string;
    const decodedToken: any = await jwt.decode(token);
    console.log("Decoded Token:", decodedToken);

    if (!decodedToken || !decodedToken?.user || !decodedToken?.user?.id) {
      console.error("Invalid token or user ID not found");
      return;
    }

    try {
      loader.show("Generating cover letter...");
      const response = await CoverLetterAPI.createCoverLetter({
        role: jobTitle,
        company: companyName,
        job_description: jobDescription,
        resume_id: selectedResume,
        user_id: decodedToken.user.id,
      });

      if (response && response.data && response.data.body) {
        setGeneratedCoverLetter(response.data.body);
        loader.hide();
        router.push(
          `/dashboard/cover-letters/edit/${response.data.body.cover_letter_id}`
        );
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      loader.hide();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/cover-letters">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create New Cover Letter
            </h1>
            <p className="text-muted-foreground">
              Generate a personalized cover letter for your job application
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g. Full Stack Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="e.g. TechCorp Solutions"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the full job description here..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Select Resume</Label>
            <Select value={selectedResume} onValueChange={setSelectedResume}>
              <SelectTrigger>
                <SelectValue placeholder="Select a resume" />
              </SelectTrigger>
              <SelectContent>
                {resumes.map((resume) => (
                  <SelectItem key={resume.resume_id} value={resume.resume_id}>
                    {resume.extracted_resume?.name || "No name"}
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({resume.extracted_resume?.category || "No category"})
                      {resume.resume_id}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Your cover letter will be tailored based on the selected resume
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerate}
            disabled={
              !jobTitle || !companyName || !jobDescription || !selectedResume
            }
          >
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Cover Letter
            </>
          </Button>
        </CardFooter>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Tips for a great cover letter</AlertTitle>
        <AlertDescription>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            <li>Provide a detailed job description for better tailoring</li>
            <li>
              Make sure your selected resume is up-to-date with relevant
              experience
            </li>
            <li>
              Review and personalize the generated cover letter before sending
            </li>
            <li>
              Customize the greeting if you know the hiring manager's name
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
