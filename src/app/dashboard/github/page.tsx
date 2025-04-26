"use client"

import { useState } from "react"
import { ArrowRight, Github, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function GitHubPage() {
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    // Simulate GitHub connection
    setTimeout(() => {
      setIsConnected(true)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">GitHub Project Analyzer</h1>
        <p className="text-muted-foreground">Connect your GitHub account to showcase your best projects</p>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect GitHub Account</CardTitle>
            <CardDescription>
              Link your GitHub account to analyze your repositories and find the best projects to showcase on your
              resume
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Github className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enhance Your Resume with GitHub Projects</h3>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              We'll analyze your repositories to find the most impressive projects based on stars, activity, and
              technologies used.
            </p>
            <Button onClick={handleConnect} className="gap-2">
              <Github className="h-4 w-4" />
              Connect GitHub Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>GitHub Account</CardTitle>
                  <CardDescription>Connected account information</CardDescription>
                </div>
                <Badge variant="outline" className="gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span> Connected
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt="GitHub Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-muted-foreground">@johndoe</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="text-sm">
                      <span className="font-medium">24</span> repositories
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">156</span> contributions
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recommended Projects for Resume</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-primary hover:underline">
                        <a href="#" className="flex items-center">
                          e-commerce-platform
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </CardTitle>
                      <CardDescription>Full-stack e-commerce application</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">48 stars</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      A complete e-commerce platform built with React, Node.js, and MongoDB. Features include user
                      authentication, product catalog, shopping cart, and payment processing.
                    </p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Node.js</Badge>
                        <Badge variant="secondary">Express</Badge>
                        <Badge variant="secondary">MongoDB</Badge>
                        <Badge variant="secondary">Redux</Badge>
                        <Badge variant="secondary">Stripe API</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Resume Value</h4>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Relevance to Software Engineer roles</span>
                        <span className="text-xs font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Resume
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-primary hover:underline">
                        <a href="#" className="flex items-center">
                          task-management-app
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </CardTitle>
                      <CardDescription>Kanban-style task management application</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">32 stars</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      A drag-and-drop task management application with real-time updates. Includes features like task
                      assignment, due dates, labels, and team collaboration.
                    </p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Firebase</Badge>
                        <Badge variant="secondary">Tailwind CSS</Badge>
                        <Badge variant="secondary">React DnD</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Resume Value</h4>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Relevance to Software Engineer roles</span>
                        <span className="text-xs font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Resume
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-primary hover:underline">
                        <a href="#" className="flex items-center">
                          weather-dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </CardTitle>
                      <CardDescription>Interactive weather visualization app</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">27 stars</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      A weather dashboard that displays current conditions and forecasts with interactive charts and
                      maps. Uses multiple weather APIs for comprehensive data.
                    </p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">Chart.js</Badge>
                        <Badge variant="secondary">Mapbox API</Badge>
                        <Badge variant="secondary">OpenWeather API</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Resume Value</h4>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Relevance to Software Engineer roles</span>
                        <span className="text-xs font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Resume
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resume Integration</CardTitle>
              <CardDescription>How to showcase your GitHub projects on your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Sample Resume Entry</h3>
                  <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                    <p className="font-medium">E-Commerce Platform | GitHub</p>
                    <ul className="list-disc list-inside mt-1 text-muted-foreground">
                      <li>Developed a full-stack e-commerce application with React, Node.js, and MongoDB</li>
                      <li>Implemented secure user authentication and payment processing with Stripe API</li>
                      <li>Designed responsive UI with Redux for state management</li>
                      <li>Deployed application with CI/CD pipeline on AWS</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tips for Showcasing Projects</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm">Focus on your contributions and the problems you solved</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm">Highlight technologies that are relevant to the job you're applying for</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm">Quantify your impact when possible (e.g., improved performance by 40%)</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
                      <p className="text-sm">Include links to live demos or repositories if space permits</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate Project Descriptions for Resume</Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
