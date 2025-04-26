"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">ResumeAI</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary"
          >
            Testimonials
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="text-sm font-medium hover:text-primary">
            Log In
          </Link>
          <Button asChild>
            <Link href="/auth">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Land Your Dream Job with AI-Powered Resume Optimization
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ResumeAI analyzes, grades, and tailors your resume to
                    specific job descriptions, helping you stand out to
                    recruiters and beat ATS systems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="/dashboard">View Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="ResumeAI Dashboard"
                  className="w-full h-auto shadow-lg rounded-xl border"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Powerful Resume Tools
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to create, optimize, and tailor your
                  resume for job success
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Resume Grading</h3>
                      <p className="text-muted-foreground">
                        Get a comprehensive grade and analysis of your resume
                        with actionable feedback to improve it.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">ATS Optimization</h3>
                      <p className="text-muted-foreground">
                        Ensure your resume passes through Applicant Tracking
                        Systems with keyword analysis and formatting
                        suggestions.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Job-Specific Tailoring
                      </h3>
                      <p className="text-muted-foreground">
                        Customize your resume for specific job descriptions to
                        maximize your match score and stand out.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full">
                <img
                  src="/placeholder.svg?height=310&width=550"
                  alt="Resume Grading Feature"
                  className="w-full h-auto shadow-lg rounded-xl border"
                />
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last">
                <img
                  src="/placeholder.svg?height=310&width=550"
                  alt="Cover Letter Generator"
                  className="w-full h-auto shadow-lg rounded-xl border"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Cover Letter Generator
                      </h3>
                      <p className="text-muted-foreground">
                        Create personalized cover letters that complement your
                        resume and address specific job requirements.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        GitHub Project Analyzer
                      </h3>
                      <p className="text-muted-foreground">
                        Showcase your best coding projects by analyzing your
                        GitHub repositories and highlighting relevant skills.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        AI-Powered Suggestions
                      </h3>
                      <p className="text-muted-foreground">
                        Get intelligent recommendations to improve your resume
                        content, formatting, and impact statements.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your job search needs
                </p>
              </div>
            </div>
            <div className="grid gap-6 pt-12 lg:grid-cols-2 xl:grid-cols-2 max-w-4xl mx-auto">
              <div className="flex flex-col p-6 bg-background shadow-lg rounded-lg border justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-center">Free</h3>
                  <div className="mt-4 text-center text-primary">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Basic resume analysis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Limited ATS compatibility check</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>1 resume upload</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>Basic formatting suggestions</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8" variant="outline">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
              <div className="flex flex-col p-6 bg-primary shadow-lg rounded-lg border justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  Popular
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-center text-primary-foreground">
                    Pro
                  </h3>
                  <div className="mt-4 text-center text-primary-foreground">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="text-primary-foreground/70">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-primary-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Unlimited resume analyses</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Advanced ATS optimization</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Job-specific tailoring</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Cover letter generation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>GitHub project analysis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8 bg-background text-primary hover:bg-background/90">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Success stories from job seekers who used ResumeAI
                </p>
              </div>
            </div>
            <div className="grid gap-6 pt-12 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-background shadow-lg rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50"
                    alt="User Avatar"
                    className="rounded-full w-12 h-12"
                  />
                  <div>
                    <h3 className="font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "After using ResumeAI to optimize my resume, I started getting
                  callbacks for interviews within days. The ATS optimization
                  feature was a game-changer!"
                </p>
              </div>
              <div className="flex flex-col p-6 bg-background shadow-lg rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50"
                    alt="User Avatar"
                    className="rounded-full w-12 h-12"
                  />
                  <div>
                    <h3 className="font-bold">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">
                      Product Manager
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The job-specific tailoring feature helped me customize my
                  resume for each application. I landed my dream job at a tech
                  company after just 3 weeks of using ResumeAI."
                </p>
              </div>
              <div className="flex flex-col p-6 bg-background shadow-lg rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/placeholder.svg?height=50&width=50"
                    alt="User Avatar"
                    className="rounded-full w-12 h-12"
                  />
                  <div>
                    <h3 className="font-bold">Emily Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Marketing Specialist
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The cover letter generator saved me hours of work. Each
                  letter was perfectly tailored to the job description and
                  helped me stand out from other applicants."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to land your dream job?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of job seekers who have optimized their resumes
                with ResumeAI.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/auth">Get Started Free</Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                No credit card required. Start with our free plan today.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
