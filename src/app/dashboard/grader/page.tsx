import Link from "next/link"
import { ArrowRight, CheckCircle, Download, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function GraderPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resume Grading Report</h1>
        <p className="text-muted-foreground">Comprehensive analysis of your resume</p>
      </div>

      {/* Overall Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 bg-gradient-to-br from-blue-500 to-teal-500 text-white">
          <CardHeader>
            <CardTitle className="text-white">Overall Grade</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="text-7xl font-bold">B+</div>
            <p className="mt-2 text-blue-100">75/100 points</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>How your resume performs in key areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">ATS Compatibility</span>
                <span className="text-sm font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Keyword Match</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Content Quality</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Formatting</span>
                <span className="text-sm font-medium">90%</span>
              </div>
              <Progress value={90} className="h-2" />
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
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Clean, professional formatting</p>
                  <p className="text-sm text-muted-foreground">
                    Your resume has a consistent layout that's easy to scan.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Strong technical skills section</p>
                  <p className="text-sm text-muted-foreground">
                    You've included relevant technical skills that match industry demands.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Good use of action verbs</p>
                  <p className="text-sm text-muted-foreground">
                    Your experience descriptions start with strong action verbs.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Appropriate length</p>
                  <p className="text-sm text-muted-foreground">Your resume is concise and fits on two pages.</p>
                </div>
              </li>
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
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="font-medium">Lack of quantifiable achievements</p>
                  <p className="text-sm text-muted-foreground">
                    Add more specific metrics and results to demonstrate your impact.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="font-medium">Missing key ATS keywords</p>
                  <p className="text-sm text-muted-foreground">
                    Your resume is missing terms like "agile methodology" and "project management".
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="font-medium">Weak summary statement</p>
                  <p className="text-sm text-muted-foreground">
                    Your professional summary could be more compelling and targeted.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="font-medium">Skills not organized by category</p>
                  <p className="text-sm text-muted-foreground">Group your skills by category for better readability.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Keyword Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Analysis</CardTitle>
          <CardDescription>How well your resume matches industry keywords</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Present Keywords</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  JavaScript
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  React
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  Node.js
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  TypeScript
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  AWS
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  Docker
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  Git
                </div>
                <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm">
                  REST API
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                  Agile
                </div>
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                  Project Management
                </div>
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                  CI/CD
                </div>
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                  Kubernetes
                </div>
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                  Microservices
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Actionable Suggestions</CardTitle>
          <CardDescription>Specific improvements to enhance your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Add Quantifiable Achievements</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enhance your impact statements with specific metrics. For example:
              </p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                <p className="text-red-500 line-through">Led development of cloud-based application</p>
                <p className="text-green-500 mt-1">
                  Led development of cloud-based application that reduced processing time by 35% and saved $50K annually
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Improve Your Summary Statement</h3>
              <p className="text-sm text-muted-foreground mt-1">Make your summary more targeted and compelling:</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                <p className="text-red-500 line-through">Experienced software engineer with a passion for coding.</p>
                <p className="text-green-500 mt-1">
                  Results-driven Senior Software Engineer with 5+ years of experience building scalable cloud
                  applications and optimizing system performance. Expertise in JavaScript, React, and AWS.
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Reorganize Skills Section</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Group your skills by category for better readability:
              </p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                <p className="font-medium">Programming Languages:</p>
                <p>JavaScript, TypeScript, Python, SQL</p>
                <p className="font-medium mt-2">Frameworks & Libraries:</p>
                <p>React, Node.js, Express, Jest</p>
                <p className="font-medium mt-2">Tools & Platforms:</p>
                <p>AWS, Docker, Git, CI/CD, Jira</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button className="w-full sm:w-auto" variant="outline">
            <Link href="/dashboard/job-description" className="flex items-center">
              Tailor for Job Description
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
