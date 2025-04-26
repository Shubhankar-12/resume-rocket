import Link from "next/link"
import { ArrowRight, FileText, Github, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Welcome back, John!</h2>
              <p className="text-blue-100">Your resume is 75% optimized. Let's improve it further.</p>
            </div>
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src="/placeholder.svg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
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
                Connect GitHub
              </CardTitle>
              <CardDescription>Analyze your projects for resume</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/github">
                  Connect <ArrowRight className="ml-2 h-4 w-4" />
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resume Score</CardTitle>
              <CardDescription>Your current resume performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Grade</span>
                  <span className="text-sm font-medium text-primary">B+</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ATS Compatibility</p>
                    <p className="text-lg font-semibold">82%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Keyword Match</p>
                    <p className="text-lg font-semibold">68%</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/grader">View Full Report</Link>
              </Button>
            </CardFooter>
          </Card>
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
                  <div>
                    <p className="text-sm font-medium">Resume Updated</p>
                    <p className="text-xs text-muted-foreground">You updated your Software Engineer resume</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cover Letter Generated</p>
                    <p className="text-xs text-muted-foreground">For Google Product Manager position</p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
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
      <div>
        <h2 className="text-xl font-semibold mb-4">Suggested Improvements</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-medium">Add more quantifiable achievements</p>
                  <p className="text-sm text-muted-foreground">
                    Include metrics and results to strengthen your impact statements.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-medium">Optimize for ATS keywords</p>
                  <p className="text-sm text-muted-foreground">
                    Your resume is missing key terms like "agile methodology" and "project management".
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="font-medium">Improve skills section</p>
                  <p className="text-sm text-muted-foreground">
                    Group your skills by category and highlight the most relevant ones first.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/grader">Fix Issues Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
