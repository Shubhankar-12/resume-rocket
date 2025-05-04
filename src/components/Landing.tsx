"use client";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  ChevronRight,
  Star,
  Github,
  FileText,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function Landing({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg px-4 lg:px-8 h-16 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Log In
              </Link>
              <Button asChild className="relative overflow-hidden group">
                <Link href="/auth">
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Link>
              </Button>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-16 px-4">
          <nav className="flex flex-col gap-4 py-8">
            <Link
              href="#features"
              className="text-lg font-medium py-2 hover:text-primary transition-colors border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium py-2 hover:text-primary transition-colors border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium py-2 hover:text-primary transition-colors border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-lg font-medium py-2 hover:text-primary transition-colors border-b"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="outline"
              asChild
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/auth">Log In</Link>
            </Button>
            <Button
              asChild
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/auth">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            {/* Background Shapes */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] relative">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                  <span className="font-medium">
                    Trusted by 10,000+ job seekers
                  </span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pb-2">
                    Land Your Dream Job with AI-Powered Resume Optimization
                  </h1>
                  <p className="max-w-[600px] text-xl text-muted-foreground">
                    ResumeAI analyzes, grades, and tailors your resume to
                    specific job descriptions, helping you stand out to
                    recruiters and beat ATS systems.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <Link href="/auth">
                      <span className="relative z-10 flex items-center">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 hover:bg-primary/5"
                  >
                    <Link href="/dashboard">View Demo</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <span>
                    Join 10,000+ professionals who transformed their career
                  </span>
                </div>
              </div>
              <div className="mx-auto aspect-video relative sm:w-full lg:order-last group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                <Image
                  src="/dashboard.png"
                  alt="ResumeAI Dashboard"
                  height={500}
                  width={500}
                  className="relative w-full h-auto shadow-lg rounded-xl border border-primary/10 transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-16 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                <FileText className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Features</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Resume Tools
                </h2>
                <p className="max-w-[900px] text-xl text-muted-foreground">
                  Everything you need to create, optimize, and tailor your
                  resume for job success
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <ul className="grid gap-6">
                  <li className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Resume Grading</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Get a comprehensive grade and analysis of your resume
                        with actionable feedback to improve it.
                      </p>
                    </div>
                  </li>
                  <li className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">ATS Optimization</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Ensure your resume passes through Applicant Tracking
                        Systems with keyword analysis and formatting
                        suggestions.
                      </p>
                    </div>
                  </li>
                  <li className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">
                          Job-Specific Tailoring
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        Customize your resume for specific job descriptions to
                        maximize your match score and stand out.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-2 sm:w-full group">
                <Image
                  src="/grader.png"
                  alt="Resume Grading Feature"
                  height={500}
                  width={500}
                  className="w-full h-auto shadow-lg rounded-xl border transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16">
              <div className="mx-auto aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-2 sm:w-full lg:order-last group">
                <Image
                  src="/cover-letter.png"
                  alt="Cover Letter Generator"
                  height={500}
                  width={500}
                  className="w-full h-auto shadow-lg rounded-xl border transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <ul className="grid gap-6">
                  <li className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">
                          Cover Letter Generator
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        Create personalized cover letters that complement your
                        resume and address specific job requirements.
                      </p>
                    </div>
                  </li>
                  <li className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Github className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">
                          GitHub Project Analyzer
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        Showcase your best coding projects by analyzing your
                        GitHub repositories and highlighting relevant skills.
                      </p>
                    </div>
                  </li>
                  <li className="bg-background rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">
                          AI-Powered Suggestions
                        </h3>
                      </div>
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

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                <Award className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Pricing</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-xl text-muted-foreground">
                  Choose the plan that's right for your job search needs
                </p>
              </div>
            </div>

            <div className="grid gap-8 pt-6 lg:grid-cols-2 xl:grid-cols-2 max-w-4xl mx-auto">
              <div className="flex flex-col p-8 bg-background shadow-lg rounded-2xl border border-muted justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div>
                  <div className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm mb-4">
                    <span className="font-medium">Free</span>
                  </div>
                  <h3 className="text-2xl font-bold">Free Plan</h3>
                  <div className="mt-4 text-primary">
                    <span className="text-5xl font-extrabold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Perfect for getting started with resume optimization
                  </p>
                  <div className="h-px w-full bg-muted my-6"></div>
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                      <span>Basic resume analysis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                      <span>Limited ATS compatibility check</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                      <span>1 resume upload</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5 text-primary" />
                      <span>Basic formatting suggestions</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8 w-full" variant="outline">
                  <Link href="/signup" className="w-full">
                    Get Started
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col p-8 bg-primary shadow-lg rounded-2xl border-2 border-primary justify-between relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-background text-primary px-4 py-1 font-bold">
                  Popular
                </div>
                <div>
                  <div className="inline-flex items-center rounded-full bg-primary-foreground/20 px-3 py-1 text-sm mb-4">
                    <span className="font-medium text-primary-foreground">
                      Pro
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-foreground">
                    Pro Plan
                  </h3>
                  <div className="mt-4 text-primary-foreground">
                    <span className="text-5xl font-extrabold">$9.99</span>
                    <span className="text-primary-foreground/70">/month</span>
                  </div>
                  <p className="mt-2 text-primary-foreground/80">
                    Everything you need for a successful job search
                  </p>
                  <div className="h-px w-full bg-primary-foreground/20 my-6"></div>
                  <ul className="mt-6 space-y-4 text-primary-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      <span>Unlimited resume analyses</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      <span>Advanced ATS optimization</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      <span>Job-specific tailoring</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      <span>Cover letter generation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      <span>GitHub project analysis</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-3 h-5 w-5" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
                <Button className="mt-8 bg-background text-primary hover:bg-background/90 w-full">
                  <Link href="/signup" className="w-full">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-16 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                <Star className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Testimonials</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Our Users Say
                </h2>
                <p className="max-w-[900px] text-xl text-muted-foreground">
                  Success stories from job seekers who used ResumeAI
                </p>
              </div>
            </div>

            <div className="grid gap-8 pt-8 lg:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  title: "Software Engineer",
                  text: "After using ResumeAI to optimize my resume, I started getting callbacks for interviews within days. The ATS optimization feature was a game-changer!",
                },
                {
                  name: "Michael Chen",
                  title: "Product Manager",
                  text: "The job-specific tailoring feature helped me customize my resume for each application. I landed my dream job at a tech company after just 3 weeks of using ResumeAI.",
                },
                {
                  name: "Emily Rodriguez",
                  title: "Marketing Specialist",
                  text: "The cover letter generator saved me hours of work. Each letter was perfectly tailored to the job description and helped me stand out from other applicants.",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="flex flex-col p-6 bg-background shadow-lg rounded-xl border border-muted hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-sm opacity-70"></div>
                        <img
                          src="/placeholder.svg?height=50&width=50"
                          alt={`${testimonial.name} Avatar`}
                          className="relative rounded-full w-12 h-12 object-cover border-2 border-background"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">FAQ</span>
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-xl text-muted-foreground">
                  Everything you need to know about ResumeAI
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {[
                {
                  question: "How does ResumeAI improve my resume?",
                  answer:
                    "ResumeAI uses advanced AI algorithms to analyze your resume against industry standards, job descriptions, and ATS requirements. It provides personalized recommendations to enhance content, formatting, and keyword optimization.",
                },
                {
                  question: "Can I use ResumeAI for different industries?",
                  answer:
                    "Yes! ResumeAI is designed to work across all industries and job types. Our system recognizes industry-specific terminology and requirements to provide tailored recommendations.",
                },
                {
                  question: "How accurate is the ATS compatibility check?",
                  answer:
                    "Our ATS compatibility check simulates how your resume will be processed by leading ATS systems. It has a 95% accuracy rate in identifying potential issues that could prevent your resume from reaching human reviewers.",
                },
                {
                  question: "Can I cancel my Pro subscription anytime?",
                  answer:
                    "Absolutely. There are no long-term commitments with our Pro plan. You can cancel anytime with no questions asked, and you'll continue to have access until the end of your billing period.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-muted bg-background p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6 relative">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="mx-auto max-w-3xl relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-background rounded-3xl border border-primary/10 p-8 md:p-12 shadow-xl">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent pb-2">
                    Ready to land your dream job?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-xl text-muted-foreground">
                    Join thousands of job seekers who have optimized their
                    resumes with ResumeAI.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-3 mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="w-full text-lg shadow-lg group overflow-hidden relative"
                  >
                    <Link href="/auth">
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started Free
                        <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    No credit card required. Start with our free plan today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t py-8 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered resume optimization to help you land your dream job.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Career Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Resume Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
            </p>
            <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
