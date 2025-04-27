"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle, Download, XCircle } from "lucide-react";
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
import { ReportType } from "@/components/Resumes/types";
import { useEffect, useState } from "react";
import ResumeAPI from "@/lib/api/user_resume/resume";
import { useParams } from "next/navigation";

export default function GraderPage() {
  const [reportData, setReportData] = useState<ReportType | null>();
  const { id } = useParams();
  const fetchReport = async () => {
    if (!id) return;
    try {
      const resp = await ResumeAPI.getResumeReport(id);
      if (resp && resp.data && resp.data.body) {
        setReportData(resp.data.body);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resume Grading Report</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of your resume
        </p>
      </div>

      {/* 
      {
        "keywordAnalysis": {
            "presentKeywords": [
                "Node.js",
                "MongoDB",
                "Next.js",
                "REST",
                "Typescript",
                "APIs",
                "SEO",
                "CMS"
            ],
            "missingKeywords": [
                "Agile",
                "Scrum",
                "Version Control",
                "Software Development Life Cycle",
                "Cloud Computing",
                "DevOps"
            ]
        },
        "overallGrade": "B+",
        "scoreOutOf100": 82,
        "scoreBreakdown": {
            "atsCompatibility": 85,
            "keywordMatch": 80,
            "contentQuality": 75,
            "formatting": 90
        },
        "strengths": [
            {
                "_id": "680e175265cb3a56c43cf197",
                "title": "Strong Technical Skills",
                "description": "Proficient in a wide range of technologies including MERN stack, which is highly relevant for web development roles."
            },
            {
                "_id": "680e175265cb3a56c43cf198",
                "title": "Relevant Experience",
                "description": "Hands-on experience as a MERN Developer Intern and Technical Intern, showcasing practical application of skills."
            },
            {
                "_id": "680e175265cb3a56c43cf199",
                "title": "Performance Metrics",
                "description": "Demonstrated ability to achieve high performance metrics, such as an 85+ Lighthouse score for web applications."
            }
        ],
        "areasForImprovement": [
            {
                "_id": "680e175265cb3a56c43cf19a",
                "title": "Expand Keyword Usage",
                "description": "Incorporate more industry-specific keywords related to software development and project management to enhance keyword match."
            },
            {
                "_id": "680e175265cb3a56c43cf19b",
                "title": "Detailing Experience",
                "description": "Provide more context and quantifiable achievements in the experience section to better highlight contributions."
            },
            {
                "_id": "680e175265cb3a56c43cf19c",
                "title": "Location Information",
                "description": "Add location details for experience and education to provide a clearer picture of geographical context."
            }
        ],
        "actionableSuggestions": [
            {
                "_id": "680e175265cb3a56c43cf19d",
                "title": "Enhance Experience Descriptions",
                "description": "Add specific metrics and outcomes to your experience descriptions to better illustrate your impact.",
                "block": "<p>For example, instead of saying 'Developed and optimized robust APIs', you could say 'Developed and optimized robust APIs, resulting in a 30% increase in data retrieval speed.'</p>"
            },
            {
                "_id": "680e175265cb3a56c43cf19e",
                "title": "Include a Projects Section",
                "description": "Consider adding a section for personal or academic projects that showcases your skills and initiative.",
                "block": "<p><strong>Projects:</strong></p><ul><li><strong>Project Name:</strong> Description of the project, technologies used, and outcomes.</li></ul>"
            },
            {
                "_id": "680e175265cb3a56c43cf19f",
                "title": "Add Certifications",
                "description": "If you have any relevant certifications, include them to further validate your skills.",
                "block": "<p><strong>Certifications:</strong></p><ul><li>Certification Name - Issuing Organization</li></ul>"
            }
        ],
        "resume_id": "680e022f0ef7ca7e1851c76c",
        "created_on": "2025-04-27T11:38:58.692Z",
        "updated_on": "2025-04-27T11:38:58.692Z",
        "report_id": "680e175265cb3a56c43cf196"
    }
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-500 to-teal-500 text-white">
          <CardHeader>
            <CardTitle className="text-white">Overall Grade</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="text-7xl font-bold">
              {reportData?.overallGrade || "-"}
            </div>
            <p className="mt-2 text-blue-100">
              {reportData?.scoreOutOf100 || "-"}/100 points
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>
              How your resume performs in key areas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ATS Compatibility</span>
                <span className="text-sm font-medium">
                  {reportData?.scoreBreakdown.atsCompatibility || "-"}%
                </span>
              </div>
              {reportData?.scoreBreakdown.atsCompatibility && (
                <Progress
                  value={reportData?.scoreBreakdown?.atsCompatibility}
                  className="h-2"
                />
              )}
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Keyword Match</span>
                <span className="text-sm font-medium">
                  {reportData?.scoreBreakdown.keywordMatch || "-"}%
                </span>
              </div>
              {reportData?.scoreBreakdown.keywordMatch && (
                <Progress
                  value={reportData?.scoreBreakdown?.keywordMatch}
                  className="h-2"
                />
              )}
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Content Quality</span>
                <span className="text-sm font-medium">
                  {reportData?.scoreBreakdown.contentQuality || "-"}%
                </span>
              </div>
              {reportData?.scoreBreakdown.contentQuality && (
                <Progress
                  value={reportData?.scoreBreakdown?.contentQuality}
                  className="h-2"
                />
              )}
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Formatting</span>
                <span className="text-sm font-medium">
                  {reportData?.scoreBreakdown.formatting || "-"}%
                </span>
              </div>
              {reportData?.scoreBreakdown.formatting && (
                <Progress
                  value={reportData?.scoreBreakdown?.formatting}
                  className="h-2"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Strengths
            </CardTitle>
            <CardDescription>What your resume does well</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reportData?.strengths &&
                reportData?.strengths.length > 0 &&
                reportData?.strengths.map((suggestion) => (
                  <li key={suggestion._id} className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                    <div>
                      <p className="font-medium">{suggestion.title || "-"}</p>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description || "-"}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <XCircle className="mr-2 h-5 w-5 text-red-500" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>What your resume could do better</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {reportData?.areasForImprovement &&
                reportData?.areasForImprovement.length > 0 &&
                reportData?.areasForImprovement.map((suggestion) => (
                  <li key={suggestion._id} className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                    <div>
                      <p className="font-medium">{suggestion.title || "-"}</p>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description || "-"}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Analysis</CardTitle>
          <CardDescription>
            How well your resume matches industry keywords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Present Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {reportData?.keywordAnalysis?.presentKeywords &&
                  reportData?.keywordAnalysis?.presentKeywords.length > 0 &&
                  reportData?.keywordAnalysis?.presentKeywords.map(
                    (keyword, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                      >
                        {keyword || "-"}
                      </div>
                    )
                  )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {reportData?.keywordAnalysis?.missingKeywords &&
                  reportData?.keywordAnalysis?.missingKeywords.length > 0 &&
                  reportData?.keywordAnalysis?.missingKeywords.map(
                    (keyword, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm"
                      >
                        {keyword || "-"}
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Suggestions */}
      {reportData?.actionableSuggestions && (
        <Card>
          <CardHeader>
            <CardTitle>Actionable Suggestions</CardTitle>
            <CardDescription>
              Specific improvements to enhance your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData?.actionableSuggestions.length > 0 &&
                reportData?.actionableSuggestions.map((suggestion) => (
                  <div key={suggestion._id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{suggestion.title || "-"}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {suggestion.description || "-"}
                    </p>
                    <div
                      className="mt-2 p-3 bg-muted rounded-md text-sm"
                      dangerouslySetInnerHTML={{
                        __html: suggestion.block || "-",
                      }}
                    />
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button className="w-full sm:w-auto" variant="outline">
              <Link
                href="/dashboard/job-description"
                className="flex items-center"
              >
                Tailor for Job Description
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
