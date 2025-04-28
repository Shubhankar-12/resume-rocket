"use client";

import { useState, useEffect } from "react";
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

interface TailoredResumeData {
  resume_id: string;
  tailored_resume_id: string;
  category: string;
  name: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: {
    _id: string;
    companyName: string;
    role: string;
    startDate: string;
    endDate: string;
    isPresent: boolean;
    location: string;
    description: string;
    tasks: string[];
  }[];
  education: {
    _id: string;
    schoolName: string;
    degree: string;
    subject: string;
    location: string;
    startDate: string;
    endDate: string;
  }[];
  projects: {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    links: {
      _id: string;
      [key: string]: string;
    }[];
  }[];
  certifications: {
    _id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }[];
  languages: string[];
  intrests: string[];
  status: string;
  created_on: string;
  updated_on: string;
}

export default function TailoredResumePage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const [resumeData, setResumeData] = useState<TailoredResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    const fetchResumeData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real application, you would fetch from your actual API endpoint
        // For this example, we'll simulate an API call with the provided data
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

        // Mock API response with the provided data
        const mockApiResponse = {
          resume_id: "680e6114f0c3ae31f84b4cc4",
          tailored_resume_id: "680f0dea55aec7505439f734",
          category: "Student",
          name: "Shubh Shubhankar",
          summary:
            "Detail-oriented and innovative MERN Developer with hands-on experience in building scalable web applications and optimizing backend services. Proficient in integrating third-party APIs and enhancing user experience through efficient coding practices. Passionate about leveraging technology to solve complex problems and improve operational efficiency.",
          email: "shubhankar719@gmail.com",
          phone: "+91-8709641223",
          location: "",
          skills: [
            "C++",
            "CSS",
            "JavaScript",
            "NodeJS",
            "ReactJS",
            "MongoDB",
            "Redux",
            "NextJS",
            "REST",
            "NuxtJS",
            "PayloadCMS",
            "MySQL",
            "GitHub",
            "Typescript",
            "AWS S3",
            "SEO",
          ],
          experience: [
            {
              tasks: [
                "Engineered backend APIs using Node.js, significantly enhancing platform connectivity and functionality.",
                "Seamlessly integrated 500+ third-party apps, automating workflows and boosting efficiency.",
              ],
              _id: "680f0dea55aec7505439f735",
              companyName: "Com.Bot",
              role: "MERN Developer Intern",
              startDate: "Nov'22",
              endDate: "Feb'23",
              isPresent: false,
              location: "",
              description:
                "Contributed to the development of a robust backend infrastructure, improving application performance and user engagement.",
            },
            {
              tasks: [
                "Architected a high-performance startup landing page using Nuxt.js and PayloadCMS, achieving an 85+ Lighthouse score.",
                "Designed and deployed scalable REST APIs using Node.js, Typescript, and MongoDB, integrating seamlessly with a Next.js-based admin panel.",
              ],
              _id: "680f0dea55aec7505439f736",
              companyName: "Stylabs Technologies",
              role: "Technical Intern",
              startDate: "Feb'24",
              endDate: "Aug'24",
              isPresent: false,
              location: "",
              description:
                "Focused on enhancing user experience and performance metrics through innovative web solutions.",
            },
            {
              tasks: [
                "Developed and optimized robust APIs to streamline data storage and manipulation with Node.js, Typescript, MongoDB, and Next.js.",
                "Elevated website SEO, enhancing discoverability and performance across 30+ pages.",
                "Built dynamic, CMS-powered landing pages using PayloadCMS, Next.js with Typescript, and AWS S3, enabling rapid content updates with full control over sections.",
              ],
              _id: "680f0dea55aec7505439f737",
              companyName: "Stylabs Technologies",
              role: "Junior Developer",
              startDate: "Aug'24",
              endDate: "",
              isPresent: true,
              location: "",
              description:
                "Currently enhancing web applications with a focus on performance, scalability, and user engagement.",
            },
          ],
          education: [
            {
              _id: "680f0dea55aec7505439f738",
              schoolName: "Vellore Institute of Technology, Bhopal",
              degree: "B.Tech",
              subject: "CSE Core",
              location: "",
              startDate: "2020",
              endDate: "2024",
            },
            {
              _id: "680f0dea55aec7505439f739",
              schoolName: "Gyan Bharti School, Hissua, Nawada",
              degree: "CBSE",
              subject: "Class XII",
              location: "",
              startDate: "2018",
              endDate: "2019",
            },
          ],
          projects: [
            {
              technologies: [
                "React",
                "Redux",
                "Firebase",
                "Stripe",
                "Typescript",
                "Tailwind",
              ],
              _id: "680f0dea55aec7505439f73a",
              title: "Crown Clothing App",
              description:
                "Developed and orchestrated the creation of a full-stack e-commerce app, focusing on user experience and seamless payment integration.",
              startDate: "Feb'23",
              endDate: "",
              links: [
                {
                  _id: "680f0dea55aec7505439f73b",
                  Website: "",
                },
              ],
            },
            {
              technologies: ["React", "Material UI", "Axios", "Alan AI"],
              _id: "680f0dea55aec7505439f73c",
              title: "Filmpire",
              description:
                "Conceptualized and developed a React-based movie review and rating app, enhancing user interaction and engagement.",
              startDate: "Nov'22",
              endDate: "",
              links: [
                {
                  _id: "680f0dea55aec7505439f73d",
                  Website: "",
                },
              ],
            },
          ],
          certifications: [],
          languages: ["English", "Hindi"],
          intrests: [],
          status: "ENABLED",
          created_on: "2025-04-28T05:11:06.236Z",
          updated_on: "2025-04-28T05:11:06.236Z",
        };

        setResumeData(mockApiResponse);
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setError("Failed to load resume data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  const handleDownload = () => {
    // In a real application, this would trigger a PDF download
    alert("Downloading resume as PDF...");
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
          <Button variant="outline" onClick={handleDownload}>
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
          <Card className="overflow-hidden">
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

              <ScrollArea className="h-[calc(100vh-300px)]">
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
                      {resumeData.experience.map((exp) => (
                        <div key={exp._id} className="rounded-lg border p-4">
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
                      {resumeData.education.map((edu) => (
                        <div key={edu._id} className="rounded-lg border p-4">
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
                          {resumeData.projects.map((project) => (
                            <div
                              key={project._id}
                              className="rounded-lg border p-4"
                            >
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
                            {resumeData.certifications.map((cert) => (
                              <div
                                key={cert._id}
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
                                  Issuer: {cert.issuer}
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
          <Card>
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
                    <div key={exp._id} className="mb-4">
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
                    <div key={edu._id} className="mb-2">
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
                      <div key={project._id} className="mb-3">
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
