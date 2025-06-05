"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useAnimation,
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
  Zap,
  Target,
  TrendingUp,
  Shield,
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
import { ThemeToggle } from "./ThemeToggle";

// Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Floating Elements
const EnhancedFloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary floating element */}
      <motion.div
        className="absolute top-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-60 animate-morph"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Secondary floating element */}
      <motion.div
        className="absolute top-3/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-50 animate-morph"
        style={{
          background:
            "linear-gradient(225deg, rgba(236, 72, 153, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Tertiary floating element */}
      <motion.div
        className="absolute top-2/3 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-40 animate-morph"
        style={{
          background:
            "linear-gradient(45deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
        }}
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Additional smaller elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full blur-2xl opacity-20"
          style={{
            background: `linear-gradient(${
              45 + i * 45
            }deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)`,
            left: `${10 + i * 12}%`,
            top: `${15 + i * 8}%`,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -15, 15, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};

// Mouse Follower Component
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-6 h-6 rounded-full bg-primary/20 blur-sm"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  );
};
interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: Feature[];
  popular?: boolean;
  icon: React.ElementType;
  color: string;
}

export default function EnhancedLanding({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const [billingInterval, setBillingInterval] = useState("monthly");

  const plans: Plan[] = [
    {
      id: "FREE",
      name: "Free",
      description: "Basic resume analysis for job seekers",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Sparkles,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      features: [
        { name: "1 Resume Upload", included: true },
        { name: "Basic ATS Check", included: true },
        { name: "Limited Resume Analysis", included: true },
        { name: "Email Support", included: true },
        { name: "Cover Letter Generation", included: false },
        { name: "GitHub Project Analysis", included: false },
        { name: "Job-Specific Tailoring", included: false },
        { name: "Priority Support", included: false },
      ],
    },
    {
      id: "BASIC",
      name: "Basic",
      description: "Essential tools for serious job seekers",
      monthlyPrice: 199,
      yearlyPrice: 1899, // 20 % OF (199 * 12 = 2398)
      icon: Shield,
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      features: [
        { name: "5 Resume Uploads", included: true },
        { name: "Advanced ATS Check", included: true },
        { name: "Full Resume Analysis", included: true },
        { name: "Email Support", included: true },
        { name: "Cover Letter Generation", included: true },
        { name: "GitHub Project Analysis", included: false },
        { name: "Job-Specific Tailoring", included: false },
        { name: "Priority Support", included: false },
      ],
    },
    {
      id: "PRO",
      name: "Pro",
      description: "Complete toolkit for career advancement",
      monthlyPrice: 499,
      yearlyPrice: 4799,
      icon: Zap,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      popular: true,
      features: [
        { name: "Unlimited Resume Uploads", included: true },
        { name: "Advanced ATS Check", included: true },
        { name: "Full Resume Analysis", included: true },
        { name: "Email Support", included: true },
        { name: "Cover Letter Generation", included: true },
        { name: "GitHub Project Analysis", included: true },
        { name: "Job-Specific Tailoring", included: true },
        { name: "Priority Support", included: true },
      ],
    },
  ];

  // Enhanced scroll tracking
  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, []);

  // Intersection observers with enhanced options
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  const [pricingRef, pricingInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  const [faqRef, faqInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  // Auto-rotate testimonials with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Software Engineer",
      company: "TechGiant Inc.",
      text: "After using ResumeRocket to optimize my resume, I started getting callbacks for interviews within days. The ATS optimization feature was a game-changer!",
      image: "/test-1.jpg",
      rating: 5,
    },
    {
      name: "Michael Chen",
      title: "Product Manager",
      company: "InnovateCorp",
      text: "The job-specific tailoring feature helped me customize my resume for each application. I landed my dream job at a tech company after just 3 weeks of using ResumeRocket.",
      image: "/test-2.jpg",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      title: "Marketing Specialist",
      company: "BrandForward",
      text: "The cover letter generator saved me hours of work. Each letter was perfectly tailored to the job description and helped me stand out from other applicants.",
      image: "/test-3.jpg",
      rating: 5,
    },
  ];

  // Enhanced features with new icons
  const features = [
    {
      title: "AI Resume Analysis",
      description:
        "Get comprehensive analysis with actionable feedback to improve your resume's impact and effectiveness.",
      icon: <Zap className="h-5 w-5 text-primary" />,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "ATS Optimization",
      description:
        "Ensure your resume passes through Applicant Tracking Systems with advanced keyword analysis.",
      icon: <Target className="h-5 w-5 text-primary" />,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Job-Specific Tailoring",
      description:
        "Customize your resume for specific job descriptions to maximize your match score and visibility.",
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      gradient: "from-pink-500 to-red-600",
    },
    {
      title: "Cover Letter Generator",
      description:
        "Create personalized cover letters that complement your resume and address specific requirements.",
      icon: <FileText className="h-5 w-5 text-primary" />,
      gradient: "from-green-500 to-blue-600",
    },
    {
      title: "GitHub Integration",
      description:
        "Showcase your best coding projects by analyzing repositories and highlighting relevant skills.",
      icon: <Github className="h-5 w-5 text-primary" />,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Smart Suggestions",
      description:
        "Get intelligent recommendations to improve content, formatting, and impact statements.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      gradient: "from-yellow-500 to-orange-600",
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

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-gradient-to-b from-background to-background/95 ">
      {/* Enhanced Floating Elements */}
      <EnhancedFloatingElements />
      <FloatingParticles />
      <MouseFollower />
      <ThemeToggle />

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 glass border-b mobile-safe"
        style={{
          backdropFilter: `blur(${Math.min(scrollY / 10, 20)}px)`,
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center">
              <motion.span
                className="text-2xl font-bold gradient-text"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                ResumeRocket
              </motion.span>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex gap-8"
          >
            {["Features", "Pricing", "Testimonials", "FAQ"].map(
              (item, index) => (
                <motion.div key={item} variants={itemVariants}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium hover:text-primary transition-all-smooth relative group"
                  >
                    <span>{item}</span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              )
            )}
          </motion.nav>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-4"
          >
            {!isLoggedIn ? (
              <>
                <motion.div variants={itemVariants}>
                  <Link
                    href="/auth"
                    className="text-sm font-medium hover:text-primary transition-colors-smooth"
                  >
                    Log In
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    asChild
                    className="relative overflow-hidden group hover-lift bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  >
                    <Link href="/auth">
                      <span className="relative z-10">Sign Up Free</span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
              </>
            ) : (
              <motion.div variants={itemVariants}>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors-smooth"
                >
                  Dashboard
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-md transition-transform-bounce"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-20 z-40 glass border-b mobile-safe bg-white"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-4 py-8"
            >
              <nav className="flex flex-col gap-4">
                {["Features", "Pricing", "Testimonials", "FAQ"].map(
                  (item, index) => (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      custom={index}
                    >
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="text-lg font-medium py-2 hover:text-primary transition-colors-smooth border-b border-muted/50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>
              <motion.div
                variants={containerVariants}
                className="flex flex-col gap-4 mt-6"
              >
                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full hover-lift"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/auth">Log In</Link>
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white hover-lift"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/auth">Sign Up Free</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10">
        {/* Enhanced Hero Section */}
        <motion.section
          ref={heroRef}
          // style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="w-full pt-20 md:pt-32 lg:pt-40 xl:pt-48 overflow-hidden relative mobile-safe"
        >
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] relative">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col justify-center space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 animate-pulse-glow">
                    <motion.span
                      className="flex h-2 w-2 rounded-full bg-primary mr-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <span className="font-medium dark:text-white text-black">
                      Trusted by 10,000+ job seekers
                    </span>
                  </Badge>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6">
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight mobile-text-scale">
                    <motion.span
                      className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                      style={{ backgroundSize: "200% 200%" }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      Land Your Dream Job
                    </motion.span>
                    <br />
                    <span>with AI-Powered Resume Optimization</span>
                  </h1>
                  <motion.p
                    variants={itemVariants}
                    className="max-w-[600px] text-xl md:text-2xl text-muted-foreground"
                  >
                    ResumeRocket analyzes, grades, and tailors your resume to
                    specific job descriptions, helping you stand out to
                    recruiters and beat ATS systems.
                  </motion.p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-lg h-14 px-8 hover-lift"
                  >
                    <Link href="/auth">
                      <span className="relative z-10 flex items-center">
                        Get Started Free
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.div>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/20 hover:bg-primary/5 hover-lift text-lg h-14 px-8"
                  >
                    <Link href="/dashboard">View Demo</Link>
                  </Button>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  className="flex items-center space-x-4 text-sm text-muted-foreground mt-2"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        custom={i}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-background flex items-center justify-center text-xs font-medium relative"
                      >
                        <Image
                          src={`/user-${i}.jpg`}
                          width={40}
                          height={40}
                          objectFit="contain"
                          className="w-full h-full rounded-full object-cover"
                          alt={`User ${i}`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <motion.span variants={itemVariants}>
                    Join 10,000+ professionals who transformed their career
                  </motion.span>
                </motion.div>
              </motion.div>

              {/* Enhanced Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="mx-auto aspect-video relative sm:w-full lg:order-last group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 rounded-xl blur opacity-70"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative w-full h-auto shadow-2xl rounded-xl border border-primary/10 overflow-hidden"
                  whileHover={{ scale: 1.02, rotateY: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-background to-muted flex items-center justify-center p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="w-full h-full bg-background rounded-lg shadow-lg p-6 flex flex-col"
                    >
                      {/* Mock Resume Interface */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <motion.div
                          className="h-6 w-24 bg-muted rounded-md"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-4">
                        <motion.div
                          className="h-8 w-3/4 bg-primary/10 rounded-md"
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1, delay: 1 }}
                        />
                        <div className="flex gap-4">
                          <motion.div
                            className="h-24 w-24 bg-secondary/10 rounded-md"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                          />
                          <div className="flex-1 flex flex-col gap-2">
                            {[100, 75, 50].map((width, i) => (
                              <motion.div
                                key={i}
                                className="h-4 bg-muted rounded-md"
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{
                                  duration: 0.8,
                                  delay: 1.4 + i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        {[100, 85, 65].map((width, i) => (
                          <motion.div
                            key={i}
                            className="h-4 bg-muted rounded-md"
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ duration: 0.6, delay: 2 + i * 0.1 }}
                          />
                        ))}
                        <div className="mt-auto flex justify-end">
                          <motion.div
                            className="h-10 w-32 bg-primary/20 rounded-md"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4, delay: 2.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -bottom-6 -left-6 bg-background rounded-lg shadow-xl p-4 border border-primary/10 hover-lift"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <div className="font-medium">Resume Score</div>
                      <motion.div
                        className="text-sm text-muted-foreground"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        92% Match
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute -top-6 -right-6 bg-background rounded-lg shadow-xl p-4 border border-primary/10 hover-lift"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Star className="h-5 w-5 text-secondary" />
                    </motion.div>
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

            {/* Enhanced Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 2,
              }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-sm text-muted-foreground mb-2">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Brands Section */}
        {/* <section className="w-full py-12 bg-muted/30 mobile-safe">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                TRUSTED BY LEADING COMPANIES
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
                {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map(
                  (brand, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center justify-center"
                    >
                      <div className="text-xl md:text-2xl font-semibold text-muted-foreground/70 hover:text-muted-foreground transition-colors-smooth">
                        {brand}
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section> */}

        {/* Enhanced Features Section */}
        <section
          ref={featuresRef}
          id="features"
          className="w-full pt-12 md:pt-24 lg:pt-32 relative overflow-hidden mobile-safe"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 animate-bounce-in">
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium dark:text-white text-black">
                    Features
                  </span>
                </Badge>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-3 max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mobile-text-scale">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Powerful Resume Tools
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to create, optimize, and tailor your
                  resume for job success
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-background rounded-xl p-6 shadow-lg border border-muted hover:shadow-xl transition-all duration-300 hover:border-primary/20 group relative overflow-hidden"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Feature Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern"></div>
              <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-6">
                  <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                    <Sparkles className="mr-2 h-4 w-4 text-secondary" />
                    <span className="font-medium dark:text-white text-black">
                      AI-Powered
                    </span>
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
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white hover-lift">
                    <Link href="/auth" className="flex items-center">
                      Try it Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-50"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <div className="relative bg-background rounded-xl shadow-xl border border-primary/10 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold">Resume Analysis</h4>
                        <Badge>92% Match</Badge>
                      </div>
                      <div className="space-y-4">
                        {[
                          { label: "Keyword Optimization", value: 95 },
                          { label: "ATS Compatibility", value: 88 },
                          { label: "Content Quality", value: 92 },
                        ].map((item, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{item.label}</span>
                              <span className="text-sm font-medium">
                                {item.value}%
                              </span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary rounded-full"
                                initial={{ width: 0 }}
                                animate={
                                  featuresInView
                                    ? { width: `${item.value}%` }
                                    : {}
                                }
                                transition={{ duration: 1, delay: 1 + i * 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced How It Works Section */}
        <section className="w-full py-24 bg-muted/30 mobile-safe">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                <FileText className="mr-2 h-4 w-4 text-accent" />
                <span className="font-medium dark:text-white text-black">
                  How It Works
                </span>
              </Badge>
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mobile-text-scale">
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
              {/* Enhanced connecting line */}
              <motion.div
                className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />

              {[
                {
                  step: "01",
                  title: "Upload Your Resume",
                  description:
                    "Upload your existing resume or create a new one using our templates.",
                  icon: <FileUp className="h-6 w-6 text-primary" />,
                  color: "primary",
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description:
                    "Our AI analyzes your resume against job descriptions and industry standards.",
                  icon: <Sparkles className="h-6 w-6 text-primary" />,
                  color: "primary",
                },
                {
                  step: "03",
                  title: "Get Optimized",
                  description:
                    "Receive tailored suggestions and implement them with one click.",
                  icon: <CheckCircle className="h-6 w-6 text-primary" />,
                  color: "primary",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * i }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center text-center relative"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-lg border border-muted z-10 mb-6"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold text-primary/20 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Section */}
        {/* Enhanced Pricing Section */}
        <section
          ref={pricingRef}
          id="pricing"
          className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden mobile-safe"
        >
          <div className="container px-4 md:px-6 relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={pricingInView ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  <Award className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium dark:text-white text-black">
                    Pricing
                  </span>
                </Badge>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-3 max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mobile-text-scale">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Simple, Transparent Pricing
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Choose the plan that's right for your job search needs
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md mx-auto mb-12"
            >
              <Tabs
                defaultValue="monthly"
                value={billingInterval}
                onValueChange={setBillingInterval}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`flex flex-col p-8 shadow-xl rounded-2xl border justify-between transition-all duration-300 hover:shadow-2xl group relative overflow-hidden ${
                    plan.popular
                      ? "bg-gradient-to-br from-primary to-secondary border-2 border-primary"
                      : "bg-background border-muted hover:border-primary/20"
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      className="absolute top-0 right-0 rounded-bl-2xl bg-background text-primary px-4 py-1 font-bold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      Popular
                    </motion.div>
                  )}

                  <div>
                    <Badge
                      className={
                        plan.popular
                          ? "bg-white/20 text-white mb-4"
                          : "bg-muted mb-4"
                      }
                    >
                      {plan.name}
                    </Badge>
                    <h3
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        plan.popular ? "text-white" : "group-hover:text-primary"
                      }`}
                    >
                      {plan.name} Plan
                    </h3>
                    <div
                      className={`mt-4 ${
                        plan.popular ? "text-white" : "text-primary"
                      }`}
                    >
                      <span className="text-5xl font-extrabold">
                        ₹
                        {billingInterval === "monthly"
                          ? plan.monthlyPrice
                          : Math.floor(plan.yearlyPrice / 12)}
                      </span>
                      <span
                        className={
                          plan.popular
                            ? "text-white/70"
                            : "text-muted-foreground"
                        }
                      >
                        /month
                      </span>
                    </div>
                    {billingInterval === "yearly" && plan.yearlyPrice > 0 && (
                      <p
                        className={`text-sm mt-1 ${
                          plan.popular
                            ? "text-white/80"
                            : "text-muted-foreground"
                        }`}
                      >
                        Billed annually: ₹{plan.yearlyPrice}
                      </p>
                    )}
                    <p
                      className={`mt-2 ${
                        plan.popular ? "text-white/80" : "text-muted-foreground"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <div
                      className={`h-px w-full my-6 ${
                        plan.popular ? "bg-white/20" : "bg-muted"
                      }`}
                    ></div>
                    <ul
                      className={`mt-6 space-y-4 ${
                        plan.popular ? "text-white" : ""
                      }`}
                    >
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={pricingInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                          className={`flex items-center ${
                            !feature.included ? "opacity-50" : ""
                          }`}
                        >
                          {feature.included ? (
                            <CheckCircle
                              className={`mr-3 h-5 w-5 ${
                                plan.popular ? "text-white" : "text-primary"
                              }`}
                            />
                          ) : (
                            <X className="mr-3 h-5 w-5 text-muted-foreground" />
                          )}
                          <span>{feature.name}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className={`mt-8 w-full hover-lift ${
                      plan.popular
                        ? "bg-white text-primary hover:bg-white/90"
                        : plan.id === "FREE"
                        ? "variant-outline"
                        : ""
                    }`}
                    variant={plan.id === "FREE" ? "outline" : "default"}
                  >
                    <Link href="/auth" className="w-full">
                      {plan.id === "FREE" ? "Get Started" : "Choose Plan"}
                    </Link>
                  </Button>
                </motion.div>
              ))}
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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={pricingInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  >
                    <Badge variant="outline" className="bg-background">
                      <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                      {item}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section
          ref={testimonialsRef}
          id="testimonials"
          className="w-full py-24 md:py-32 lg:py-40 bg-muted/30 mobile-safe"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                  <Star className="mr-2 h-4 w-4 text-secondary" />
                  <span className="font-medium dark:text-white text-black">
                    Testimonials
                  </span>
                </Badge>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-3 max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mobile-text-scale">
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    What Our Users Say
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Success stories from job seekers who used ResumeRocket
                </p>
              </motion.div>
            </motion.div>

            <div className="relative">
              <div className="max-w-4xl mx-auto">
                <div className="relative h-[400px] md:h-[300px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        className="bg-background rounded-2xl shadow-xl p-8 md:p-10 border border-muted h-full flex flex-col hover-lift"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                          >
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm opacity-70"
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                            />
                            <div className="relative rounded-full w-16 h-16 bg-muted flex items-center justify-center border-2 border-background overflow-hidden">
                              <Image
                                src={
                                  testimonials[activeTestimonial].image ||
                                  "/placeholder.svg"
                                }
                                alt={testimonials[activeTestimonial].name}
                                width={64}
                                height={64}
                                className="rounded-full object-cover w-full h-full"
                              />
                            </div>
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-xl">
                              {testimonials[activeTestimonial].name}
                            </h3>
                            <p className="text-muted-foreground">
                              {testimonials[activeTestimonial].title} at{" "}
                              {testimonials[activeTestimonial].company}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          className="flex mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.div
                              key={star}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4 + star * 0.1 }}
                            >
                              <Star className="h-5 w-5 fill-[#FFD700] text-secondary" />
                            </motion.div>
                          ))}
                        </motion.div>
                        <motion.p
                          className="text-lg md:text-xl italic flex-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          "{testimonials[activeTestimonial].text}"
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-center mt-8 gap-2">
                  {testimonials.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTestimonial === i
                          ? "bg-primary scale-125"
                          : "bg-muted"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
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
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div
                      className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      animate={testimonialsInView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.1,
                        type: "spring",
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-muted-foreground mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section
          ref={faqRef}
          id="faq"
          className="w-full py-24 md:py-32 lg:py-40 mobile-safe"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                  <span className="font-medium dark:text-white text-black">
                    FAQ
                  </span>
                </Badge>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="space-y-3 max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mobile-text-scale">
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to know about ResumeRocket
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
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
                      className="border-b border-muted py-2 hover:bg-muted/20 transition-colors duration-300 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>

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

        {/* Enhanced CTA Section */}
        <section
          ref={ctaRef}
          className="w-full py-24 md:py-32 lg:py-40 bg-muted/30 mobile-safe"
        >
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6 relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              className="mx-auto max-w-3xl relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/10 rounded-3xl blur-2xl opacity-70"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                variants={itemVariants}
                className="relative bg-background rounded-3xl border border-primary/10 p-8 md:p-12 shadow-2xl"
              >
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mx-auto">
                      <Sparkles className="mr-2 h-4 w-4 text-primary" />
                      <span className="font-medium dark:text-white text-black">
                        Limited Time Offer
                      </span>
                    </Badge>
                  </motion.div>
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pb-2 mobile-text-scale"
                  >
                    Ready to land your dream job?
                  </motion.h2>
                  <motion.p
                    variants={itemVariants}
                    className="mx-auto max-w-[600px] text-xl text-muted-foreground"
                  >
                    Join thousands of job seekers who have optimized their
                    resumes with ResumeRocket. Get started today and receive a{" "}
                    <span className="font-bold">free resume review</span>.
                  </motion.p>
                </div>
                <motion.div
                  variants={itemVariants}
                  className="mx-auto w-full max-w-sm space-y-3 mt-8"
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full text-lg shadow-lg group overflow-hidden relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-14 hover-lift"
                  >
                    <Link href="/auth">
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started Free
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <ChevronRight className="ml-1 h-5 w-5" />
                        </motion.div>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    No credit card required. Start with our free plan today.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t py-12 px-4 md:px-6 mobile-safe">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold gradient-text">
                  ResumeRocket
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                AI-powered resume optimization to help you land your dream job.
              </p>
              <div className="flex space-x-4">
                {[
                  {
                    icon: "facebook",
                    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  },
                  {
                    icon: "linkedin",
                    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
                  },
                  {
                    icon: "twitter",
                    path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
                  },
                ].map((social, i) => (
                  <motion.a
                    key={social.icon}
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors-smooth"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
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
                      <path d={social.path}></path>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Testimonials", "FAQ"],
              },
              {
                title: "Resources",
                links: [
                  "Blog",
                  "Career Tips",
                  "Resume Templates",
                  "Help Center",
                ],
              },
              {
                title: "Company",
                links: [
                  "Privacy Policy",
                  "Contact Us",
                  "Refund Policy",
                  "Terms and Conditions",
                ],
              },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * j }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={
                          section.title === "Company"
                            ? `/${link.toLowerCase().replaceAll(" ", "-")}`
                            : `#${link.toLowerCase().replace(" ", "")}`
                        }
                        className="text-sm text-muted-foreground hover:text-primary transition-colors-smooth"
                      >
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ResumeRocket. All rights
              reserved.
            </p>
            <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Contact Us",
              ].map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors-smooth"
                  >
                    {link}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
