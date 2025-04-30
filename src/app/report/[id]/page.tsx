import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

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

type Props = {
  params: { id: string };
};

async function getReport(id: string): Promise<ReportType | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_USER_API}/api/v1/resume/report?resume_id=${id}`;

    const report = await fetch(url, {
      headers: {
        Authorization: `Bearer ` + process.env.NEXT_PUBLIC_API_TOKEN,
      },
    });

    if (!report.ok) {
      console.log("Report not found", report.json);
      return null;
    }
    const response = await report.json();
    return response.body;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function ReportPage({ params }: Props) {
  const paramsData = await params;

  const reportData: ReportType | null = await getReport(paramsData.id);
  if (!reportData) {
    console.log("Report not found");

    return <div>Report not found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className=" bg-gradient-to-br from-blue-500 to-teal-500 text-white">
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

        <Card className="">
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
      <div className="grid grid-cols-1 gap-4">
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
      {/* Project Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Project Analysis</CardTitle>
          <CardDescription>
            Evaluation of your projects and portfolio work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Project Strengths</h3>
              <ul className="space-y-2">
                {reportData?.projectAnalysis?.strengths &&
                  reportData.projectAnalysis.strengths.length > 0 &&
                  reportData.projectAnalysis.strengths.map(
                    (strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                        <div>
                          <p className="font-medium">{strength.title || "-"}</p>
                          <p className="text-sm text-muted-foreground">
                            {strength.description || "-"}
                          </p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Areas for Project Improvement
              </h3>
              <ul className="space-y-2">
                {reportData?.projectAnalysis?.areasForImprovement &&
                  reportData.projectAnalysis.areasForImprovement.length > 0 &&
                  reportData.projectAnalysis.areasForImprovement.map(
                    (area, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                        <div>
                          <p className="font-medium">{area.title || "-"}</p>
                          <p className="text-sm text-muted-foreground">
                            {area.description || "-"}
                          </p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certification Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Certification Analysis</CardTitle>
          <CardDescription>
            Evaluation of your professional certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Certification Strengths</h3>
              <ul className="space-y-2">
                {reportData?.certificationAnalysis?.strengths &&
                  reportData.certificationAnalysis.strengths.length > 0 &&
                  reportData.certificationAnalysis.strengths.map(
                    (strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                        <div>
                          <p className="font-medium">{strength.title || "-"}</p>
                          <p className="text-sm text-muted-foreground">
                            {strength.description || "-"}
                          </p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Areas for Certification Improvement
              </h3>
              <ul className="space-y-2">
                {reportData?.certificationAnalysis?.areasForImprovement &&
                  reportData.certificationAnalysis.areasForImprovement.length >
                    0 &&
                  reportData.certificationAnalysis.areasForImprovement.map(
                    (area, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                        <div>
                          <p className="font-medium">{area.title || "-"}</p>
                          <p className="text-sm text-muted-foreground">
                            {area.description || "-"}
                          </p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {reportData?.certificationAnalysis?.recommendedCertifications &&
                  reportData.certificationAnalysis.recommendedCertifications
                    .length > 0 &&
                  reportData.certificationAnalysis.recommendedCertifications.map(
                    (cert, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm"
                      >
                        {cert || "-"}
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interest Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Interest Analysis</CardTitle>
          <CardDescription>
            How your personal interests enhance your professional profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Relevance to Field</span>
                <span className="text-sm font-medium">
                  {reportData?.interestAnalysis?.relevance || "-"}%
                </span>
              </div>
              {reportData?.interestAnalysis?.relevance && (
                <Progress
                  value={reportData.interestAnalysis.relevance}
                  className="h-2"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Comments</h3>
              <p className="text-sm text-muted-foreground">
                {reportData?.interestAnalysis?.comments || "-"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Suggestions</h3>
              <ul className="space-y-2">
                {reportData?.interestAnalysis?.suggestions &&
                  reportData.interestAnalysis.suggestions.length > 0 &&
                  reportData.interestAnalysis.suggestions.map(
                    (suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-sm">{suggestion || "-"}</p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
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
        </Card>
      )}
    </>
  );
}
