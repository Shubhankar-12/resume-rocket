import Link from "next/link";
import { ArrowRight, FileText, Github, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { StatsType } from "../types/DashboardTypes";
import { cookies } from "next/headers";
import { generateBucketUrl } from "@/helpers/utils";
import { formatDistanceToNow } from "date-fns";

const getDashboardData = async (): Promise<StatsType | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/api/v1/user/stats`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    if (!res.ok) return null;
    const response = await res.json();

    return response.body;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function Dashboard() {
  const getGrade = (score: number) => {
    // A+ A B+ B C D E
    if (score >= 95) return "A+";
    if (score >= 90) return "A";
    if (score >= 80) return "B+";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "E";
  };
  const dashboardData: StatsType | null = await getDashboardData();
  if (!dashboardData) return <div>Something went wrong</div>;
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                Welcome back, {dashboardData.name}!
              </h2>
              <p className="text-blue-100">
                {dashboardData.user_resumes &&
                dashboardData.user_resumes.analysis &&
                dashboardData.user_resumes.analysis.gradingScore
                  ? `Your resume is ${dashboardData.user_resumes.analysis.gradingScore}% optimized. Let's improve it further.`
                  : "Your resume is not optimized. Let's improve it."}
              </p>
            </div>
            <Avatar className="h-16 w-16 border-2 border-white">
              {dashboardData.avatar && dashboardData.avatar.url ? (
                <AvatarImage
                  src={dashboardData.avatar.url}
                  alt={dashboardData.name}
                />
              ) : (
                <AvatarFallback>
                  {dashboardData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Upload className="mr-2 h-5 w-5 text-primary" />
                Upload Resume
              </CardTitle>
              <CardDescription>Upload your resume for analysis</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/upload">
                  Upload Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Paste Job Description
              </CardTitle>
              <CardDescription>Tailor your resume to a job</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/job-description">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Github className="mr-2 h-5 w-5 text-primary" />
                {dashboardData?.provider === "github" &&
                dashboardData?.githubProfile?.username
                  ? `${dashboardData.githubProfile.username}`
                  : "Connect GitHub"}
              </CardTitle>
              <CardDescription>
                Analyze your projects for resume
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/github">
                  {dashboardData?.provider === "github" &&
                  dashboardData?.githubProfile?.username
                    ? "Analyze Now"
                    : "Connect"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Resume Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Resume Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.user_resumes ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resume Score</CardTitle>
                <CardDescription>
                  Your current resume performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Grade</span>
                    <span className="text-sm font-medium text-primary">
                      {getGrade(
                        dashboardData.user_resumes.analysis.gradingScore
                      )}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        ATS Compatibility
                      </p>
                      <p className="text-lg font-semibold">
                        {dashboardData.user_resumes.analysis.atsScore}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Keyword Match
                      </p>
                      <p className="text-lg font-semibold">
                        {dashboardData.user_resumes.analysis.gradingScore}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={
                      "/dashboard/grader?" +
                      dashboardData?.user_resumes?.user_resume_id
                    }
                  >
                    View Full Report
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Resume</CardTitle>
                <CardDescription>
                  Upload your resume for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Grade</span>
                    <span className="text-sm font-medium text-primary">
                      Resume not found
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        ATS Compatibility
                      </p>
                      <p className="text-lg font-semibold">N/A</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Keyword Match
                      </p>
                      <p className="text-lg font-semibold">N/A</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={"/dashboard/upload"}>Upload Resume</Link>
                </Button>
              </CardFooter>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest resume updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  {dashboardData?.user_resumes?.created_on ? (
                    <div>
                      <p className="text-sm font-medium">Resume Added</p>
                      <p className="text-xs text-muted-foreground">
                        {dashboardData?.user_resumes?.resume?.name &&
                          `You uploaded ${dashboardData?.user_resumes?.resume?.name}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          new Date(dashboardData.user_resumes.created_on),
                          { addSuffix: true }
                        )}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">No Activity</p>
                      <p className="text-xs text-muted-foreground">
                        Add a resume to get started
                      </p>
                      <p className="text-xs text-muted-foreground">
                        No Resume Added
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  {dashboardData?.cover_letters?.created_on ? (
                    <div>
                      <p className="text-sm font-medium">
                        Cover Letter Generated
                      </p>
                      <p className="text-xs text-muted-foreground">
                        For {dashboardData?.cover_letters?.role} position
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          new Date(dashboardData.cover_letters.created_on),
                          { addSuffix: true }
                        )}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">No Activity</p>
                      <p className="text-xs text-muted-foreground">
                        Generate a cover letter by reviewing your resume
                      </p>
                      <p className="text-xs text-muted-foreground">
                        No Cover Letter Generated
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/resumes">View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Suggested Improvements */}
      {dashboardData?.user_resumes &&
        dashboardData?.user_resumes?.analysis &&
        dashboardData?.user_resumes?.analysis?.suggestions &&
        dashboardData?.user_resumes?.analysis?.suggestions?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Suggested Improvements
            </h2>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {dashboardData?.user_resumes?.analysis?.suggestions.map(
                    (suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 text-xs font-bold">
                            !
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{suggestion?.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {suggestion?.description}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/dashboard/grader">Fix Issues Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
    </div>
  );
}
