"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import TailoredResumeAPI from "@/lib/api/user_resume/tailored_resume";
import { useParams } from "next/navigation";
import { AnalysisItem } from "@/components/Resumes/types";
import { useLoader } from "@/hooks/useLoader";

{
  /*
  "resume_id": "680e6114f0c3ae31f84b4cc4",
  "job_description": "We're on the hunt for an elite Full Stack Developer who can move fast, build scalable systems, and own the entire tech stack — from pixel-perfect frontends in React and Next.js to blazing-fast backends in Node.js and scalable databases like MongoDB and PostgreSQL. You’ll architect, code, ship, and iterate at lightning speed, working with bleeding-edge technologies like GraphQL, WebSockets, Docker, Kubernetes, and AWS. If you thrive in high-pressure environments, love solving complex problems, and have a deep obsession with code quality, system design, and performance, this is your battlefield. TypeScript mastery, microservices experience, and a hacker mentality are non-negotiable.",
  "keyRequirements": {
      "requiredSkills": [
          "NodeJS",
          "ReactJS",
          "MongoDB",
          "REST",
          "Typescript"
      ],
      "experienceLevel": "Internship or Entry-level",
      "education": "Bachelor's degree in Computer Science or related field",
      "keyResponsibilities": [
          "Develop and maintain web applications",
          "Collaborate with cross-functional teams",
          "Implement APIs and integrate with third-party services"
      ]
  },
  "resumeMatchAnalysis": {
      "overallMatch": 85,
      "matchingSkills": [
          "NodeJS",
          "ReactJS",
          "MongoDB"
      ],
      "missingSkills": [
          "REST",
          "Typescript"
      ],
      "experienceMatch": {
          "isMatching": true,
          "message": "The candidate has relevant internship experience in web development."
      },
      "educationMatch": {
          "isMatching": true,
          "message": "The candidate holds a Bachelor's degree in Computer Science."
      },
      "projectsMatch": {
          "isMatching": false,
          "message": "No projects directly related to the job description's key responsibilities were found.",
          "relevantProjects": []
      },
      "certificationMatch": {
          "isMatching": false,
          "message": "No relevant certifications were found.",
          "relevantCertifications": [],
          "recommendedCertifications": [
              "Certified Node.js Developer",
              "ReactJS Certification"
          ]
      }
  }
*/
}

export default function JobDescriptionPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resumeAnalysis, setResumeAnalysis] = useState<AnalysisItem>();
  const loader = useLoader();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const fetchResumeMatch = async () => {
    try {
      loader.show("Matching resume...");
      const response = await TailoredResumeAPI.matchResume({
        resume_id: id as string,
        job_description: jobDescription,
      });

      if (response && response.data && response.data.body) {
        setResumeAnalysis(response.data.body);
        setAnalysisComplete(true);
      }
      loader.hide();
    } catch (error) {
      loader.hide();
      console.error("Error fetching resume match:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job Description Analyzer</h1>
        <p className="text-muted-foreground">
          Paste a job description to tailor your resume
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Job Description</CardTitle>
          <CardDescription>
            Paste the full job description to analyze key requirements and
            skills
          </CardDescription>
        </CardHeader>
        {/* <form onSubmit={handleSubmit}> */}
        <CardContent>
          <Textarea
            placeholder="Paste job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={isAnalyzing}
          />

          {isAnalyzing && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing job description...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={!jobDescription.trim() || isAnalyzing}
            onClick={fetchResumeMatch}
          >
            Analyze Job Description
          </Button>
        </CardFooter>
        {/* </form> */}
      </Card>

      {analysisComplete && resumeAnalysis?.resume_id && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Key Requirements</CardTitle>
              <CardDescription>
                Important skills and qualifications from the job description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumeAnalysis?.keyRequirements &&
                  resumeAnalysis.keyRequirements.requiredSkills && (
                    <div>
                      <h3 className="font-semibold mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeAnalysis?.keyRequirements.requiredSkills?.map(
                          (skill, index) => (
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
                  )}

                <div>
                  <h3 className="font-semibold mb-2">Experience Level</h3>
                  <p>
                    {resumeAnalysis?.keyRequirements.experienceLevel ||
                      "Not Specified"}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p>
                    {resumeAnalysis?.keyRequirements.education ||
                      "Not Specified"}
                  </p>
                </div>

                {resumeAnalysis?.keyRequirements.keyResponsibilities && (
                  <div>
                    <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {resumeAnalysis?.keyRequirements.keyResponsibilities?.map(
                        (resp, index) => (
                          <li key={index}>{resp}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Match Analysis</CardTitle>
              <CardDescription>
                How your current resume matches this job description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Match</span>
                    <span className="text-sm font-medium">
                      {resumeAnalysis?.resumeMatchAnalysis?.overallMatch || "-"}
                    </span>
                  </div>
                  <Progress
                    value={
                      resumeAnalysis?.resumeMatchAnalysis?.overallMatch || 0
                    }
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeAnalysis?.resumeMatchAnalysis?.matchingSkills && (
                    <div>
                      <h3 className="font-semibold mb-2">Matching Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeAnalysis?.resumeMatchAnalysis?.matchingSkills?.map(
                          (skill, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                            >
                              {skill || "-"}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {resumeAnalysis?.resumeMatchAnalysis?.missingSkills && (
                    <div>
                      <h3 className="font-semibold mb-2">Missing Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeAnalysis?.resumeMatchAnalysis?.missingSkills?.map(
                          (skill, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm"
                            >
                              {skill || "-"}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Experience Match</h3>
                  <p
                    className={
                      resumeAnalysis?.resumeMatchAnalysis?.experienceMatch
                        ?.isMatching
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-500"
                    }
                  >
                    {resumeAnalysis?.resumeMatchAnalysis?.experienceMatch
                      ?.message || "-"}
                  </p>
                </div>

                {/* ------------------------------------------------------------------------------------------------------ */}
                <div>
                  <h3 className="font-semibold mb-2">Education Match</h3>
                  {resumeAnalysis?.resumeMatchAnalysis?.educationMatch
                    ?.isMatching ? (
                    <p className="text-green-600 dark:text-green-400">
                      {resumeAnalysis?.resumeMatchAnalysis?.educationMatch
                        ?.message || "Your education matches the requirements"}
                    </p>
                  ) : (
                    <p className="text-amber-600 dark:text-amber-400">
                      {resumeAnalysis?.resumeMatchAnalysis?.educationMatch
                        ?.message ||
                        "Your education doesn't fully match the requirements"}
                    </p>
                  )}
                </div>

                {/* Projects Match */}
                <div>
                  <h3 className="font-semibold mb-2">Projects Match</h3>
                  {resumeAnalysis?.resumeMatchAnalysis?.projectsMatch
                    ?.isMatching ? (
                    <div className="space-y-2">
                      <p className="text-green-600 dark:text-green-400">
                        {resumeAnalysis?.resumeMatchAnalysis?.projectsMatch
                          ?.message ||
                          "Your projects match the job requirements"}
                      </p>
                      {resumeAnalysis?.resumeMatchAnalysis?.projectsMatch
                        ?.relevantProjects?.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mt-2">
                            Relevant Projects:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {resumeAnalysis?.resumeMatchAnalysis?.projectsMatch?.relevantProjects.map(
                              (project, index) => (
                                <li key={index}>{project}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-amber-600 dark:text-amber-400">
                      {resumeAnalysis?.resumeMatchAnalysis?.projectsMatch
                        ?.message ||
                        "Your projects don't align with the job requirements"}
                    </p>
                  )}
                </div>

                {/* Certification Match */}
                <div>
                  <h3 className="font-semibold mb-2">Certification Match</h3>
                  {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch
                    ?.isMatching ? (
                    <div className="space-y-2">
                      <p className="text-green-600 dark:text-green-400">
                        {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch
                          ?.message || "Your certifications are relevant"}
                      </p>
                      {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch
                        ?.relevantCertifications?.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mt-2">
                            Relevant Certifications:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch?.relevantCertifications.map(
                              (cert, index) => (
                                <div
                                  key={index}
                                  className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm"
                                >
                                  {cert}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-amber-600 dark:text-amber-400">
                        {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch
                          ?.message || "No relevant certifications found"}
                      </p>
                      {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch
                        ?.recommendedCertifications?.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium mt-2">
                            Recommended Certifications:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {resumeAnalysis?.resumeMatchAnalysis?.certificationMatch?.recommendedCertifications.map(
                              (cert, index) => (
                                <div
                                  key={index}
                                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                                >
                                  {cert}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* ------------------------------------------------------------------------------------------------------ */}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Generate Tailored Resume
              </Button>
              <Button className="w-full sm:w-auto" variant="outline">
                Generate Cover Letter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
