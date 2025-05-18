"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  FileUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function RedesignedLanding({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [pricingRef, pricingInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Software Engineer",
      company: "TechGiant Inc.",
      text: "After using ResumeRocket to optimize my resume, I started getting callbacks for interviews within days. The ATS optimization feature was a game-changer!",
      image: "/test-1.jpg",
    },
    {
      name: "Michael Chen",
      title: "Product Manager",
      company: "InnovateCorp",
      text: "The job-specific tailoring feature helped me customize my resume for each application. I landed my dream job at a tech company after just 3 weeks of using ResumeRocket.",
      image: "/test-2.jpg",
    },
    {
      name: "Emily Rodriguez",
      title: "Marketing Specialist",
      company: "BrandForward",
      text: "The cover letter generator saved me hours of work. Each letter was perfectly tailored to the job description and helped me stand out from other applicants.",
      image: "/test-3.jpg",
    },
  ];

  const features = [
    {
      title: "Resume Grading",
      description:
        "Get a comprehensive grade and analysis of your resume with actionable feedback to improve it.",
      icon: <Award className="h-5 w-5 text-primary" />,
    },
    {
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with keyword analysis and formatting suggestions.",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Job-Specific Tailoring",
      description:
        "Customize your resume for specific job descriptions to maximize your match score and stand out.",
      icon: <Star className="h-5 w-5 text-primary" />,
    },
    {
      title: "Cover Letter Generator",
      description:
        "Create personalized cover letters that complement your resume and address specific job requirements.",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: "GitHub Project Analyzer",
      description:
        "Showcase your best coding projects by analyzing your GitHub repositories and highlighting relevant skills.",
      icon: <Github className="h-5 w-5 text-primary" />,
    },
    {
      title: "AI-Powered Suggestions",
      description:
        "Get intelligent recommendations to improve your resume content, formatting, and impact statements.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
  ];

  const faqs = [
    {
      question: "How does ResumeRocket improve my resume?",
      answer:
        "ResumeRocket uses advanced AI algorithms to analyze your resume against industry standards, job descriptions, and ATS requirements. It provides personalized recommendations to enhance content, formatting, and keyword optimization.",
    },
    {
      question: "Can I use ResumeRocket for different industries?",
      answer:
        "Yes! ResumeRocket is designed to work across all industries and job types. Our system recognizes industry-specific terminology and requirements to provide tailored recommendations.",
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
    {
      question: "How many resumes can I analyze with the free plan?",
      answer:
        "The free plan allows you to analyze one resume. For unlimited resume analyses and advanced features, you'll need to upgrade to our Pro plan.",
    },
  ];

  return (
    <div className="flex w-full  flex-col min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute top-3/4 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl opacity-50 animate-float animation-delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-40 animate-float animation-delay-300"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl px-4 lg:px-8 h-20 flex items-center justify-between border-b">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent gradient-animation">
              ResumeRocket
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex gap-8"
        >
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors-smooth relative group"
          >
            <span>Features</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors-smooth relative group"
          >
            <span>Pricing</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary transition-colors-smooth relative group"
          >
            <span>Testimonials</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:text-primary transition-colors-smooth relative group"
          >
            <span>FAQ</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:flex items-center gap-4"
        >
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth"
                className="text-sm font-medium hover:text-primary transition-colors-smooth"
              >
                Log In
              </Link>
              <Button
                asChild
                className="relative overflow-hidden group hover-lift bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                <Link href="/auth">
                  <span className="relative z-10">Sign Up Free</span>
                </Link>
              </Button>
            </>
          ) : (
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors-smooth"
            >
              Dashboard
            </Link>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:hidden p-2 rounded-md transition-transform-bounce hover:scale-110"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full fixed inset-x-0 top-20 z-40 overflow-hidden bg-background border-b"
          >
            <div className="px-4  w-full max-w-full">
              <nav className="flex flex-col gap-4 py-8">
                <Link
                  href="#features"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors-smooth border-b animate-slide-in-right animation-delay-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors-smooth border-b animate-slide-in-right animation-delay-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors-smooth border-b animate-slide-in-right animation-delay-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#faq"
                  className="text-lg font-medium py-2 hover:text-primary transition-colors-smooth border-b animate-slide-in-right animation-delay-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </nav>
              <div className="flex w-full flex-col gap-4 mt-4 mb-8">
                <Button
                  variant="outline"
                  asChild
                  className="w-full animate-slide-in-left animation-delay-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/auth">Log In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full animate-slide-in-left animation-delay-400 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/auth">Sign Up Free</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="w-full py-20 md:py-32 lg:py-40 xl:py-48 overflow-hidden relative"
        >
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col justify-center space-y-8"
              >
                <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse-soft"></span>
                  <span className="font-medium">
                    Trusted by 10,000+ job seekers
                  </span>
                </Badge>

                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent gradient-animation">
                      Land Your Dream Job
                    </span>
                    <br />
                    <span>with AI-Powered Resume Optimization</span>
                  </h1>
                  <p className="max-w-[600px] text-xl md:text-2xl text-muted-foreground">
                    ResumeRocket analyzes, grades, and tailors your resume to
                    specific job descriptions, helping you stand out to
                    recruiters and beat ATS systems.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-lg h-14 px-8"
                  >
                    <Link href="/auth">
                      <span className="relative z-10 flex items-center">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 hover:bg-primary/5 hover-lift text-lg h-14 px-8"
                  >
                    <Link href="/dashboard">View Demo</Link>
                  </Button>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                      >
                        {/* <span>{i}</span> */}
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={`/user-${i + 1}.jpg`}
                            width={40}
                            height={40}
                            className="rounded-full"
                            alt="user"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <span>
                    Join 10,000+ professionals who transformed their career
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mx-auto aspect-video relative sm:w-full lg:order-last group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-500 animate-glow"></div>
                <div className="relative w-full h-auto shadow-2xl rounded-xl border border-primary/10 transition-transform duration-500 group-hover:scale-[1.02] overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-background to-muted flex items-center justify-center p-8">
                    <div className="w-full h-full bg-background rounded-lg shadow-lg p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="h-6 w-24 bg-muted rounded-md"></div>
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="h-8 w-3/4 bg-primary/10 rounded-md"></div>
                        <div className="flex gap-4">
                          <div className="h-24 w-24 bg-secondary/10 rounded-md"></div>
                          <div className="flex-1 flex flex-col gap-2">
                            <div className="h-4 w-full bg-muted rounded-md"></div>
                            <div className="h-4 w-3/4 bg-muted rounded-md"></div>
                            <div className="h-4 w-1/2 bg-muted rounded-md"></div>
                          </div>
                        </div>
                        <div className="h-4 w-full bg-muted rounded-md"></div>
                        <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                        <div className="h-4 w-4/6 bg-muted rounded-md"></div>
                        <div className="mt-auto flex justify-end">
                          <div className="h-10 w-32 bg-primary/20 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-background rounded-lg shadow-xl p-4 border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Resume Score</div>
                      <div className="text-sm text-muted-foreground">
                        92% Match
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute -top-6 -right-6 bg-background rounded-lg shadow-xl p-4 border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Star className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium">ATS Optimized</div>
                      <div className="text-sm text-muted-foreground">
                        Ready to Apply
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">
                Scroll to explore
              </span>
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </div>
        </motion.section>

        {/* Brands Section */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                TRUSTED BY LEADING COMPANIES
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map(
                  (brand, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="flex items-center justify-center"
                    >
                      <div className="text-xl md:text-2xl font-semibold text-muted-foreground/70">
                        {brand}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          id="features"
          className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                <FileText className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Features</span>
              </Badge>
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Powerful Resume Tools
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to create, optimize, and tailor your
                  resume for job success
                </p>
              </div>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="bg-background rounded-xl p-6 shadow-lg border border-muted hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1 group"
                >
                  <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
              <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-6">
                  <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                    <Sparkles className="mr-2 h-4 w-4 text-secondary" />
                    <span className="font-medium">AI-Powered</span>
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-bold">
                    See how your resume stacks up against the competition
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Our AI analyzes thousands of successful resumes to provide
                    you with actionable insights and improvements.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Keyword optimization",
                      "ATS compatibility",
                      "Industry-specific suggestions",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                    <Link href="/auth" className="flex items-center">
                      Try it Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-50"></div>
                  <div className="relative bg-background rounded-xl shadow-xl border border-primary/10 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold">Resume Analysis</h4>
                        <Badge>92% Match</Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              Keyword Optimization
                            </span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: "95%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">ATS Compatibility</span>
                            <span className="text-sm font-medium">88%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: "88%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Content Quality</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                <FileText className="mr-2 h-4 w-4 text-accent" />
                <span className="font-medium">How It Works</span>
              </Badge>
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Simple 3-Step Process
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Get your resume optimized in minutes, not hours
                </p>
              </div>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-3 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>

              {[
                {
                  step: "01",
                  title: "Upload Your Resume",
                  description:
                    "Upload your existing resume or create a new one using our templates.",
                  icon: <FileUp className="h-6 w-6 text-primary" />,
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description:
                    "Our AI analyzes your resume against job descriptions and industry standards.",
                  icon: <Sparkles className="h-6 w-6 text-secondary" />,
                },
                {
                  step: "03",
                  title: "Get Optimized",
                  description:
                    "Receive tailored suggestions and implement them with one click.",
                  icon: <CheckCircle className="h-6 w-6 text-accent" />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * i }}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-lg border border-muted z-10 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-primary/20 mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          ref={pricingRef}
          id="pricing"
          className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float animation-delay-300"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                <Award className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Pricing</span>
              </Badge>
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Simple, Transparent Pricing
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Choose the plan that's right for your job search needs
                </p>
              </div>
            </motion.div>

            <Tabs
              defaultValue="monthly"
              className="w-full max-w-md mx-auto mb-12"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={pricingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex flex-col p-8 bg-background shadow-xl rounded-2xl border border-muted justify-between transition-all duration-300 hover:shadow-2xl hover:border-primary/20 group"
              >
                <div>
                  <Badge className="bg-muted mb-4">Free</Badge>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    Free Plan
                  </h3>
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
                <Button className="mt-8 w-full hover-lift" variant="outline">
                  <Link href="/auth" className="w-full">
                    Get Started
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={pricingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col p-8 bg-gradient-to-br from-primary to-secondary shadow-xl rounded-2xl border-2 border-primary justify-between relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-background text-primary px-4 py-1 font-bold">
                  Popular
                </div>
                <div>
                  <Badge className="bg-white/20 text-white mb-4">Pro</Badge>
                  <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                  <div className="mt-4 text-white">
                    <span className="text-5xl font-extrabold">$9.99</span>
                    <span className="text-white/70">/month</span>
                  </div>
                  <p className="mt-2 text-white/80">
                    Everything you need for a successful job search
                  </p>
                  <div className="h-px w-full bg-white/20 my-6"></div>
                  <ul className="mt-6 space-y-4 text-white">
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
                <Button className="mt-8 bg-white text-primary hover:bg-white/90 w-full hover-lift">
                  <Link href="/auth" className="w-full">
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground">
                All plans come with a 14-day money-back guarantee. No questions
                asked.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {[
                  "No credit card required",
                  "Cancel anytime",
                  "24/7 support",
                ].map((item, i) => (
                  <Badge key={i} variant="outline" className="bg-background">
                    <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                    {item}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          id="testimonials"
          className="w-full py-24 md:py-32 lg:py-40 bg-muted/30"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                <Star className="mr-2 h-4 w-4 text-secondary" />
                <span className="font-medium">Testimonials</span>
              </Badge>
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    What Our Users Say
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Success stories from job seekers who used ResumeRocket
                </p>
              </div>
            </motion.div>

            <div className="relative">
              <div className="max-w-4xl mx-auto">
                <div className="relative h-[400px] md:h-[300px] overflow-hidden">
                  {testimonials.map((testimonial, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: activeTestimonial === i ? 1 : 0,
                        x:
                          activeTestimonial === i
                            ? 0
                            : activeTestimonial > i
                            ? -100
                            : 100,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 ${
                        activeTestimonial === i ? "z-10" : "z-0"
                      }`}
                    >
                      <div className="bg-background rounded-2xl shadow-xl p-8 md:p-10 border border-muted h-full flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-70"></div>
                            <div className="relative rounded-full w-16 h-16 bg-muted flex items-center justify-center border-2 border-background">
                              {testimonial.image ? (
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                  <Image
                                    src={`/user-${i + 1}.jpg`}
                                    alt={testimonial.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                    priority
                                  />
                                </div>
                              ) : (
                                <span className="font-medium text-primary text-xl">
                                  {testimonial.name.charAt(0)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">
                              {testimonial.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {testimonial.title} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 fill-secondary text-secondary"
                            />
                          ))}
                        </div>
                        <p className="text-lg md:text-xl italic flex-1">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center mt-8 gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTestimonial === i
                          ? "bg-primary scale-125"
                          : "bg-muted"
                      }`}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Active Users", value: "10,000+" },
                  { label: "Resumes Optimized", value: "50,000+" },
                  { label: "Success Rate", value: "92%" },
                  { label: "Job Offers", value: "5,000+" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          ref={faqRef}
          id="faq"
          className="w-full py-24 md:py-32 lg:py-40"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                <span className="font-medium">FAQ</span>
              </Badge>
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to know about ResumeRocket
                </p>
              </div>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-muted py-2"
                    >
                      <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground mb-6">
                Still have questions? We're here to help.
              </p>
              <Button variant="outline" className="hover-lift">
                <Link href="/contact" className="flex items-center">
                  Contact Support
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="w-full py-24 md:py-32 lg:py-40 bg-muted/30"
        >
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6 relative">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float animation-delay-300"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/10 rounded-3xl blur-2xl opacity-70"></div>
              <div className="relative bg-background rounded-3xl border border-primary/10 p-8 md:p-12 shadow-2xl">
                <div className="space-y-6">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mx-auto">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    <span className="font-medium">Limited Time Offer</span>
                  </Badge>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pb-2">
                    Ready to land your dream job?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-xl text-muted-foreground">
                    Join thousands of job seekers who have optimized their
                    resumes with ResumeRocket. Get started today and receive a{" "}
                    <span className="font-bold">free resume review</span>.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-3 mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="w-full text-lg shadow-lg group overflow-hidden relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-14"
                  >
                    <Link href="/auth">
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started Free
                        <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    No credit card required. Start with our free plan today.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent gradient-animation">
                  ResumeRocket
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered resume optimization to help you land your dream job.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors-smooth"
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
                    className="transition-transform-bounce hover:scale-110"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors-smooth"
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
                    className="transition-transform-bounce hover:scale-110"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors-smooth"
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
                    className="transition-transform-bounce hover:scale-110"
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Career Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Resume Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ResumeRocket. All rights
              reserved.
            </p>
            <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors-smooth"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors-smooth"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors-smooth"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors-smooth"
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
