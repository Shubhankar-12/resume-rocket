"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function JobDescriptionPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)
    setProgress(0)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Job Description Analyzer</h1>
        <p className="text-muted-foreground">Paste a job description to tailor your resume</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Job Description</CardTitle>
          <CardDescription>Paste the full job description to analyze key requirements and skills</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" className="w-full" disabled={!jobDescription.trim() || isAnalyzing}>
              Analyze Job Description
            </Button>
          </CardFooter>
        </form>
      </Card>

      {analysisComplete && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Key Requirements</CardTitle>
              <CardDescription>Important skills and qualifications from the job description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">JavaScript</div>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">React</div>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Node.js</div>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">TypeScript</div>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">AWS</div>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">CI/CD</div>
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Agile</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Experience Level</h3>
                  <p>5+ years of software development experience</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Education</h3>
                  <p>Bachelor's degree in Computer Science or related field</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Develop and maintain web applications</li>
                    <li>Collaborate with cross-functional teams</li>
                    <li>Implement best practices for code quality</li>
                    <li>Participate in code reviews and technical discussions</li>
                    <li>Troubleshoot and debug issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume Match Analysis</CardTitle>
              <CardDescription>How your current resume matches this job description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Match</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Matching Skills</h3>
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
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                        CI/CD
                      </div>
                      <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                        Agile
                      </div>
                      <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm">
                        Kubernetes
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Experience Match</h3>
                  <p className="text-amber-600 dark:text-amber-400">
                    Your experience (3 years) is below the required level (5+ years)
                  </p>
                </div>
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
  )
}
