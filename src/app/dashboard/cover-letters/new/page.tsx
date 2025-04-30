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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  FileText,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { ExtractedResume, ResumeData } from "@/components/Resumes/types";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import CoverLetterAPI from "@/lib/api/cover-letters/cover_letter";
import { useRouter } from "next/navigation";
import ResumeAPI from "@/lib/api/user_resume/resume";

export default function NewCoverLetterPage() {
  const [activeTab, setActiveTab] = useState("job-details");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("");
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");

  // Mock resume data
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

  const handleGenerate = () => {
    if (!jobTitle || !companyName || !jobDescription || !selectedResume) {
      return;
    }

    setIsGenerating(true);

    // Simulate API call to generate cover letter
    setTimeout(() => {
      const generatedLetter = `Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${companyName}. With a solid foundation in both frontend and backend technologies, I am excited about the opportunity to contribute to your team. My experience as a MERN Developer Intern at Com.Bot, where I engineered backend APIs using Node.js and integrated over 500 third-party applications, has equipped me with the skills necessary to build scalable systems efficiently.

Currently, I am a Junior Developer at Stylabs Technologies, where I have architected high-performance landing pages using Nuxt.js and PayloadCMS, achieving an impressive Lighthouse score of over 85. My role involves designing and deploying REST APIs with Node.js, Typescript, and MongoDB, which aligns perfectly with your requirement for a developer who can own the entire tech stack.

I thrive in high-pressure environments and have a deep obsession with code quality and system design. My projects, such as the Crown Clothing App and Filmpire, showcase my ability to develop full-stack applications using React, Redux, and various other technologies. I am particularly drawn to the challenge of working with bleeding-edge technologies like GraphQL and Docker, and I am eager to bring my hacker mentality to your team.

I am confident that my skills in TypeScript, microservices, and my passion for solving complex problems make me a strong candidate for this role. I look forward to the opportunity to discuss how I can contribute to your team and help drive your projects to success.

Thank you for considering my application.

Sincerely,
Alex Johnson
alex.johnson@example.com
(555) 123-4567`;

      setGeneratedCoverLetter(generatedLetter);
      setIsGenerating(false);
      setIsGenerated(true);
      setActiveTab("preview");
    }, 3000);
  };

  const handleSave = () => {
    // In a real application, this would save the cover letter to the database
    alert("Cover letter saved successfully!");
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="job-details">Job Details</TabsTrigger>
          <TabsTrigger value="preview" disabled={!isGenerated}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="job-details" className="space-y-4">
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
                <Select
                  value={selectedResume}
                  onValueChange={setSelectedResume}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resume" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem
                        key={resume.resume_id}
                        value={resume.resume_id}
                      >
                        {resume.extracted_resume?.name || "No name"}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({resume.extracted_resume?.category || "No category"}){" "}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Your cover letter will be tailored based on the selected
                  resume
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={
                  !jobTitle ||
                  !companyName ||
                  !jobDescription ||
                  !selectedResume ||
                  isGenerating
                }
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Cover Letter
                  </>
                )}
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
                  Review and personalize the generated cover letter before
                  sending
                </li>
                <li>
                  Customize the greeting if you know the hiring manager's name
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cover Letter Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-6">
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <div className="space-y-4">
                    {generatedCoverLetter
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index} className="text-sm">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("job-details")}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Job Details
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download as PDF
                </Button>
                <Button onClick={handleSave}>Save Cover Letter</Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Edit Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[300px]"
                value={generatedCoverLetter}
                onChange={(e) => setGeneratedCoverLetter(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
