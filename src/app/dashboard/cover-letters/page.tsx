"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  FileText,
  Download,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronRight,
  Calendar,
  Search,
  PenTool,
  Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import CoverLetterAPI from "@/lib/api/cover-letters/cover_letter";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

// Sample API response
const apiResponse = {
  isSuccess: true,
  meta: {
    message: "",
    total_documents: 1,
  },
  statusCode: 200,
  errors: null,
  body: [
    {
      cover_letter:
        "Dear Hiring Manager,\n\nI am writing to express my interest in the Full Stack Developer position at your esteemed company. With a solid foundation in both frontend and backend technologies, I am excited about the opportunity to contribute to your team. My experience as a MERN Developer Intern at Com.Bot, where I engineered backend APIs using Node.js and integrated over 500 third-party applications, has equipped me with the skills necessary to build scalable systems efficiently. \n\nCurrently, I am a Junior Developer at Stylabs Technologies, where I have architected high-performance landing pages using Nuxt.js and PayloadCMS, achieving an impressive Lighthouse score of over 85. My role involves designing and deploying REST APIs with Node.js, Typescript, and MongoDB, which aligns perfectly with your requirement for a developer who can own the entire tech stack.\n\nI thrive in high-pressure environments and have a deep obsession with code quality and system design. My projects, such as the Crown Clothing App and Filmpire, showcase my ability to develop full-stack applications using React, Redux, and various other technologies. I am particularly drawn to the challenge of working with bleeding-edge technologies like GraphQL and Docker, and I am eager to bring my hacker mentality to your team.\n\nI am confident that my skills in TypeScript, microservices, and my passion for solving complex problems make me a strong candidate for this role. I look forward to the opportunity to discuss how I can contribute to your team and help drive your projects to success.\n\nThank you for considering my application.\n\nSincerely,\nShubh Shubhankar\nshubhankar719@gmail.com\n+91-8709641223",
      cover_letter_summary:
        "In my cover letter, I express my enthusiasm for the Full Stack Developer position, highlighting my experience with Node.js, React, and MongoDB. I emphasize my ability to build scalable systems and my passion for code quality and system design. I also mention my current role as a Junior Developer and my successful projects, showcasing my readiness to tackle challenges with cutting-edge technologies.",
      resume_id: "680e6114f0c3ae31f84b4cc4",
      user_id: "680bb5374ce28a7dd843b9cf",
      job_description:
        "we're on the hunt for an elite full stack developer who can move fast, build scalable systems, and own the entire tech stack — from pixel-perfect frontends in react and next.js to blazing-fast backends in node.js and scalable databases like mongodb and postgresql. you'll architect, code, ship, and iterate at lightning speed, working with bleeding-edge technologies like graphql, websockets, docker, kubernetes, and aws. if you thrive in high-pressure environments, love solving complex problems, and have a deep obsession with code quality, system design, and performance, this is your battlefield. typescript mastery, microservices experience, and a hacker mentality are non-negotiable.",
      created_on: "2025-04-30T16:06:37.061Z",
      updated_on: "2025-04-30T16:06:37.061Z",
      cover_letter_id: "68124a8dc062cb632457d3f6",
    },
  ],
};

// Additional mock data for demonstration purposes
const additionalCoverLetters = [
  {
    cover_letter:
      "Dear Hiring Team,\n\nI am excited to apply for the Senior Frontend Developer position at TechInnovate. With over 5 years of experience in building responsive and user-friendly web applications using React, TypeScript, and modern JavaScript frameworks, I believe I would be a valuable addition to your team.\n\nIn my current role at WebSolutions Inc., I have led the development of several high-traffic web applications, improving performance metrics by 40% and implementing best practices for code quality and accessibility. I have extensive experience with state management solutions like Redux and have worked closely with UX designers to create intuitive user interfaces.\n\nI am particularly impressed by TechInnovate's commitment to innovation and your recent projects in the e-commerce space. I am confident that my skills in frontend architecture, performance optimization, and responsive design would align perfectly with your team's goals.\n\nI look forward to the opportunity to discuss how my experience and skills can contribute to TechInnovate's continued success.\n\nThank you for your consideration.\n\nSincerely,\nAlex Johnson\nalex.johnson@example.com\n(555) 123-4567",
    cover_letter_summary:
      "I express my interest in the Senior Frontend Developer position, highlighting my 5+ years of experience with React, TypeScript, and modern JavaScript frameworks. I detail my achievements in performance optimization and collaboration with UX designers, and express enthusiasm for TechInnovate's innovative approach to e-commerce projects.",
    resume_id: "680e6114f0c3ae31f84b4cc5",
    user_id: "680bb5374ce28a7dd843b9cf",
    job_description:
      "TechInnovate is seeking a Senior Frontend Developer with strong experience in React and TypeScript to join our growing team. The ideal candidate will have 5+ years of experience building responsive web applications and a deep understanding of frontend architecture. Experience with Redux, performance optimization, and accessibility is required.",
    created_on: "2025-04-25T14:30:22.061Z",
    updated_on: "2025-04-25T14:30:22.061Z",
    cover_letter_id: "68124a8dc062cb632457d3f7",
  },
  {
    cover_letter:
      "Dear Recruitment Team,\n\nI am writing to express my interest in the UX/UI Designer position at DesignCraft Studios. As a passionate designer with 4 years of experience creating user-centered digital experiences, I am excited about the opportunity to bring my creative vision and technical skills to your innovative team.\n\nIn my current role at Creative Digital Agency, I have designed intuitive interfaces for clients across various industries, conducting user research, creating wireframes, and developing high-fidelity prototypes that balance aesthetic appeal with functional usability. My designs have consistently received positive feedback from users and stakeholders alike, with one recent project increasing user engagement by 35%.\n\nI am particularly drawn to DesignCraft's human-centered approach to design and your commitment to accessibility. My experience with design systems and component libraries would allow me to contribute immediately to your established workflows while bringing fresh perspectives to your projects.\n\nI would welcome the opportunity to discuss how my skills and experience align with your team's needs. Thank you for considering my application.\n\nBest regards,\nSamantha Lee\nsamantha.lee@example.com\n(555) 987-6543",
    cover_letter_summary:
      "I apply for the UX/UI Designer position at DesignCraft Studios, highlighting my 4 years of experience creating user-centered digital experiences. I emphasize my skills in user research, wireframing, and prototyping, and express enthusiasm for DesignCraft's human-centered design approach and commitment to accessibility.",
    resume_id: "680e6114f0c3ae31f84b4cc6",
    user_id: "680bb5374ce28a7dd843b9cf",
    job_description:
      "DesignCraft Studios is looking for a talented UX/UI Designer to join our creative team. The ideal candidate will have experience with user research, wireframing, prototyping, and visual design. Knowledge of design systems and component libraries is essential. We value designers who can balance aesthetic appeal with functional usability.",
    created_on: "2025-04-20T09:15:45.061Z",
    updated_on: "2025-04-20T09:15:45.061Z",
    cover_letter_id: "68124a8dc062cb632457d3f8",
  },
];

interface CoverLetterItem {
  cover_letter_id: string;
  cover_letter: string;
  role: string;
  company: string;
  cover_letter_summary: string;
  job_description: string;
  created_on: string;
  updated_on: string;
  resume_id: string;
  user_id: string;
}

export default function CoverLettersPage() {
  const [selectedCoverLetter, setSelectedCoverLetter] =
    useState<CoverLetterItem | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [allCoverLetters, setAllCoverLetters] = useState<CoverLetterItem[]>([]);
  const filteredCoverLetters = allCoverLetters.filter((letter) => {
    const query = searchQuery.toLowerCase();
    return (
      letter.cover_letter.toLowerCase().includes(query) ||
      letter.cover_letter_summary.toLowerCase().includes(query) ||
      letter.job_description.toLowerCase().includes(query)
    );
  });

  const handleCoverLetterClick = (coverLetter: CoverLetterItem) => {
    setSelectedCoverLetter(coverLetter);
  };

  const getJobTitle = (description: string) => {
    // Extract a job title from the job description
    // This is a simple implementation - in a real app, you might want to use AI or a more sophisticated approach
    const commonTitles = [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "UX/UI Designer",
      "Senior Frontend Developer",
    ];

    for (const title of commonTitles) {
      if (description.toLowerCase().includes(title.toLowerCase())) {
        return title;
      }
    }

    // Default title if no match is found
    return "Position";
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const fetchCoverLetters = async () => {
    const token = await getCookie("token");
    if (!token) {
      console.error("Token not found");
      return;
    }
    const decodedToken: any = await jwt.decode(token);
    if (!decodedToken || !decodedToken.user || !decodedToken.user.id) {
      console.error("Invalid token or user ID not found");
      return;
    }
    try {
      const response = await CoverLetterAPI.getAllResumes({
        search: searchQuery,
        user_id: decodedToken.user.id,
      });
      if (response && response.data && response.data.body) {
        setAllCoverLetters(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching cover letters:", error);
    }
  };

  useEffect(() => {
    // debounce the search query 500
    const timeout = setTimeout(() => {
      fetchCoverLetters();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cover Letters</h1>
          <p className="text-muted-foreground">
            Manage and create personalized cover letters for your job
            applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cover-letters/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Cover Letter
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search cover letters..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Cover Letters</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-1 p-2">
                  {filteredCoverLetters.length > 0 ? (
                    filteredCoverLetters.map((coverLetter) => (
                      <CoverLetterListItem
                        key={coverLetter.cover_letter_id}
                        coverLetter={coverLetter}
                        isSelected={
                          selectedCoverLetter?.cover_letter_id ===
                          coverLetter.cover_letter_id
                        }
                        onClick={() => handleCoverLetterClick(coverLetter)}
                      />
                    ))
                  ) : (
                    <div className="flex h-32 flex-col items-center justify-center text-center">
                      <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        No cover letters found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery
                          ? "Try a different search term"
                          : "Create your first cover letter"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedCoverLetter ? (
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{selectedCoverLetter.role}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Created on {formatDate(selectedCoverLetter.created_on)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/dashboard/cover-letters/edit/${selectedCoverLetter.cover_letter_id}`}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Summary</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedCoverLetter.cover_letter_summary}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 text-sm font-medium">
                        Job Description
                      </h3>
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">
                          {selectedCoverLetter.job_description}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Cover Letter</h3>
                      <div className="rounded-md border p-6">
                        <ScrollArea className="h-[calc(100vh-500px)]">
                          <div className="space-y-4">
                            {selectedCoverLetter.cover_letter
                              .split("\n\n")
                              .map((paragraph, index) => (
                                <p key={index} className="text-sm">
                                  {paragraph}
                                </p>
                              ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          ) : (
            <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium">Select a Cover Letter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a cover letter from the list to view its details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

interface CoverLetterListItemProps {
  coverLetter: CoverLetterItem;
  isSelected: boolean;
  onClick: () => void;
}

function CoverLetterListItem({
  coverLetter,
  isSelected,
  onClick,
}: CoverLetterListItemProps) {
  const getJobTitle = (description: string) => {
    // Extract a job title from the job description
    const commonTitles = [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "UX/UI Designer",
      "Senior Frontend Developer",
    ];

    for (const title of commonTitles) {
      if (description.toLowerCase().includes(title.toLowerCase())) {
        return title;
      }
    }

    return "Position";
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

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
            <PenTool className="h-4 w-4 text-teal-600" />
          </div>
          <div>
            <div className="font-medium">{coverLetter.role}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              <span>{coverLetter.company}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/cover-letters/edit/${coverLetter.cover_letter_id}`}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight
            className={`h-4 w-4 ${
              isSelected ? "text-teal-600" : "text-muted-foreground"
            }`}
          />
        </div>
      </div>
      <div className="mt-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {coverLetter.cover_letter_summary}
        </p>
      </div>
    </div>
  );
}
