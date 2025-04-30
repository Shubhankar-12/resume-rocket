"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Languages,
  Share2,
  Pencil,
  FileText,
} from "lucide-react";
import Link from "next/link";
import TailoredResumeAPI from "@/lib/api/user_resume/tailored_resume";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { TailoredResumeData } from "@/components/Resumes/types";
import { usePdfExport } from "@/hooks/usePdfExport";

export default function TailoredResumePage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const [resumeData, setResumeData] = useState<TailoredResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("preview");

  const fetchResume = async () => {
    try {
      const resp = await TailoredResumeAPI.getTailoredResumeById(resumeId);
      if (resp && resp.data && resp.data.body) {
        setResumeData(resp.data.body);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error fetch Tailored Resume:", error);
    }
  };

  useEffect(() => {
    if (resumeId) fetchResume();
  }, [resumeId]);

  const cardRef = useRef<HTMLDivElement>(null);
  const atsCardRef = useRef<HTMLDivElement>(null);
  const { exportPageToPdf } = usePdfExport();

  // const handleDownloadPDF = async () => {
  //   if (!cardRef.current) return;
  //   const scrollArea = document.querySelector(".custom-scroll") as HTMLElement;
  //   scrollArea?.classList.add("no-scroll");
  //   const canvas = await html2canvas(cardRef.current, {
  //     scale: 2, // Higher scale = better quality
  //     useCORS: true,
  //   });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(`${resumeData?.name?.replaceAll(" ", "-")}-tailored-resume.pdf`);

  //   scrollArea?.classList.remove("no-scroll");
  // };

  const handleDownloadPDF = async () => {
    await exportPageToPdf(
      "http://localhost:3000/preview-resume/" + resumeId,
      "tailored_resume"
    );
  };

  // const handleDownloadPDFATS = async () => {
  //   if (!atsCardRef.current) return;
  //   const scrollArea = document.querySelector(".custom-scroll") as HTMLElement;
  //   scrollArea?.classList.add("no-scroll");

  //   const canvas = await html2canvas(atsCardRef.current, {
  //     scale: 2, // Higher scale = better quality
  //     useCORS: true,
  //   });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(
  //     `${resumeData?.name?.replaceAll(" ", "-")}-tailored-resume${
  //       activeTab === "ats" && "-ats"
  //     }.pdf`
  //   );

  //   scrollArea?.classList.remove("no-scroll");
  // };

  const handleDownloadPDFATS = async () => {
    await exportPageToPdf(
      "http://localhost:3000/ats-resume/" + resumeId + "?tab=ats",
      "tailored_resume_ats"
    );
  };

  if (isLoading) {
    return <ResumeLoadingSkeleton />;
  }

  if (error || !resumeData) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950/30">
          <FileText className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-bold">Failed to Load Resume</h2>
          <p className="text-muted-foreground">
            {error || "Resume data not available"}
          </p>
          <Button asChild variant="outline">
            <Link href="/dashboard/my-resumes">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to My Resumes
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/my-resumes">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {resumeData.name} - Tailored Resume
            </h1>
            <p className="text-muted-foreground">
              Category: {resumeData.category} • Created on{" "}
              {new Date(resumeData.created_on).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              activeTab === "preview"
                ? handleDownloadPDF()
                : handleDownloadPDFATS();
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="ats">ATS View</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <Card ref={cardRef} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-teal-600 p-8 text-white">
                <h1 className="text-3xl font-bold">{resumeData.name}</h1>
                <div className="mt-2 flex flex-wrap gap-4">
                  {resumeData.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{resumeData.email}</span>
                    </div>
                  )}
                  {resumeData.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{resumeData.phone}</span>
                    </div>
                  )}
                  {resumeData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{resumeData.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-300px)] custom-scroll">
                <div className="p-8">
                  {/* Summary Section */}
                  <div className="mb-6">
                    <h2 className="mb-2 text-xl font-bold">
                      Professional Summary
                    </h2>
                    <p className="text-muted-foreground">
                      {resumeData.summary}
                    </p>
                  </div>

                  <Separator className="my-6" />

                  {/* Skills Section */}
                  <div className="mb-6">
                    <h2 className="mb-4 text-xl font-bold">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Experience Section */}
                  <div className="mb-6">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <Briefcase className="h-5 w-5 text-teal-600" />
                      Professional Experience
                    </h2>
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <h3 className="font-bold">{exp.role}</h3>
                            <div className="text-sm text-muted-foreground">
                              {exp.startDate} -{" "}
                              {exp.isPresent ? "Present" : exp.endDate}
                            </div>
                          </div>
                          <div className="text-md font-medium text-teal-600">
                            {exp.companyName}
                          </div>
                          {exp.location && (
                            <div className="text-sm text-muted-foreground">
                              {exp.location}
                            </div>
                          )}

                          {exp.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {exp.description}
                            </p>
                          )}

                          {exp.tasks && exp.tasks.length > 0 && (
                            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                              {exp.tasks.map((task, index) => (
                                <li key={index}>{task}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Education Section */}
                  <div className="mb-6">
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      <GraduationCap className="h-5 w-5 text-teal-600" />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <h3 className="font-bold">
                              {edu.degree}
                              {edu.subject ? `, ${edu.subject}` : ""}
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </div>
                          <div className="text-md font-medium text-teal-600">
                            {edu.schoolName}
                          </div>
                          {edu.location && (
                            <div className="text-sm text-muted-foreground">
                              {edu.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {resumeData.projects && resumeData.projects.length > 0 && (
                    <>
                      <Separator className="my-6" />

                      {/* Projects Section */}
                      <div className="mb-6">
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                          <Code className="h-5 w-5 text-teal-600" />
                          Projects
                        </h2>
                        <div className="space-y-4">
                          {resumeData.projects.map((project, index) => (
                            <div key={index} className="rounded-lg border p-4">
                              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                <h3 className="font-bold">{project.title}</h3>
                                {project.startDate && (
                                  <div className="text-sm text-muted-foreground">
                                    {project.startDate}
                                    {project.endDate
                                      ? ` - ${project.endDate}`
                                      : ""}
                                  </div>
                                )}
                              </div>
                              <p className="mt-2 text-sm">
                                {project.description}
                              </p>

                              {project.technologies &&
                                project.technologies.length > 0 && (
                                  <div className="mt-3">
                                    <div className="text-sm font-medium">
                                      Technologies:
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                      {project.technologies.map(
                                        (tech, index) => (
                                          <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {tech}
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                              {project.links &&
                                project.links.length > 0 &&
                                project.links.some((link) =>
                                  Object.values(link).some((val) => val)
                                ) && (
                                  <div className="mt-3">
                                    <div className="text-sm font-medium">
                                      Links:
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                      {project.links.map((link, index) => {
                                        const [key, value] =
                                          Object.entries(link).find(
                                            ([k, v]) => k !== "_id" && v
                                          ) || [];
                                        return key && value ? (
                                          <a
                                            key={index}
                                            href={
                                              value.startsWith("http")
                                                ? value
                                                : `https://${value}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-teal-600 hover:underline"
                                          >
                                            {key}
                                          </a>
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {resumeData.certifications &&
                    resumeData.certifications.length > 0 && (
                      <>
                        <Separator className="my-6" />

                        {/* Certifications Section */}
                        <div className="mb-6">
                          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                            <Award className="h-5 w-5 text-teal-600" />
                            Certifications
                          </h2>
                          <div className="space-y-2">
                            {resumeData.certifications.map((cert, index) => (
                              <div
                                key={index}
                                className="rounded-lg border p-3"
                              >
                                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                  <h3 className="font-medium">{cert.name}</h3>
                                  {cert.date && (
                                    <div className="text-sm text-muted-foreground">
                                      {cert.date}
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Issuer: {cert.issuer || cert.name}
                                </div>
                                {cert.url && (
                                  <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 text-sm text-teal-600 hover:underline"
                                  >
                                    View Certificate
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                  {resumeData.languages && resumeData.languages.length > 0 && (
                    <>
                      <Separator className="my-6" />

                      {/* Languages Section */}
                      <div className="mb-6">
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                          <Languages className="h-5 w-5 text-teal-600" />
                          Languages
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.languages.map((language, index) => (
                            <Badge key={index} variant="secondary">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {resumeData.intrests && resumeData.intrests.length > 0 && (
                    <>
                      <Separator className="my-6" />

                      {/* Interests Section */}
                      <div className="mb-6">
                        <h2 className="mb-4 text-xl font-bold">Interests</h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.intrests.map((interest, index) => (
                            <Badge key={index} variant="outline">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ats" className="space-y-6">
          <Card ref={atsCardRef}>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">{resumeData.name}</h1>
                  <div className="mt-2 flex justify-center gap-4">
                    {resumeData.email && <span>{resumeData.email}</span>}
                    {resumeData.phone && <span>{resumeData.phone}</span>}
                    {resumeData.location && <span>{resumeData.location}</span>}
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 font-bold">Summary</h2>
                  <p>{resumeData.summary}</p>
                </div>

                <div>
                  <h2 className="mb-2 font-bold">Skills</h2>
                  <p>{resumeData.skills.join(", ")}</p>
                </div>

                <div>
                  <h2 className="mb-2 font-bold">Experience</h2>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-medium">
                        {exp.role} at {exp.companyName}, {exp.startDate} -{" "}
                        {exp.isPresent ? "Present" : exp.endDate}
                      </h3>
                      <p className="mt-1">{exp.description}</p>
                      <ul className="mt-2 list-disc pl-5">
                        {exp.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="mb-2 font-bold">Education</h2>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        {edu.degree}
                        {edu.subject ? `, ${edu.subject}` : ""} -{" "}
                        {edu.schoolName}, {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>

                {resumeData.projects && resumeData.projects.length > 0 && (
                  <div>
                    <h2 className="mb-2 font-bold">Projects</h2>
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="mb-3">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="mt-1">{project.description}</p>
                        <p className="mt-1">
                          Technologies: {project.technologies.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {resumeData.languages && resumeData.languages.length > 0 && (
                  <div>
                    <h2 className="mb-2 font-bold">Languages</h2>
                    <p>{resumeData.languages.join(", ")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg border bg-amber-50 p-4 dark:bg-amber-950/30">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/50">
                <FileText className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">ATS-Friendly View</h3>
                <p className="text-sm text-muted-foreground">
                  This view shows how your resume might be parsed by Applicant
                  Tracking Systems. It's a simplified, text-focused version that
                  ensures your content is properly recognized by automated
                  systems.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResumeLoadingSkeleton() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-64 rounded-md" />

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="h-40 w-full" />

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <Skeleton className="h-1 w-full" />

              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <div className="flex flex-wrap gap-2">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
              </div>

              <Skeleton className="h-1 w-full" />

              <div className="space-y-4">
                <Skeleton className="h-6 w-56" />
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-md" />
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
