"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FileText,
  Scale,
  Shield,
  Users,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TermsPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const termsHighlights = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Fair Usage",
      description: "Clear guidelines for using our services responsibly",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Your Rights",
      description: "Understanding your rights and our obligations",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Standards",
      description: "Maintaining a professional and respectful environment",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Service Terms",
      description: "Detailed terms governing our service offerings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <ThemeToggle />

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">
                ResumeRocket
              </span>
            </Link>
          </motion.div>
          <Button variant="outline" asChild className="hover-lift">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="py-20 md:py-32 relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div variants={itemVariants}>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-6">
                  <FileText className="mr-2 h-4 w-4" />
                  Terms & Conditions
                </Badge>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Terms & Conditions
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Please read these terms and conditions carefully before using
                our services. By accessing ResumeRocket, you agree to be bound
                by these terms.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
              >
                <Calendar className="h-4 w-4" />
                <span>Last updated: January 15, 2024</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Terms Highlights */}
        <section ref={contentRef} className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Key Terms Overview
                </h2>
                <p className="text-xl text-muted-foreground">
                  Important aspects of our terms and conditions
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {termsHighlights.map((highlight, i) => (
                  <motion.div key={i} variants={itemVariants} custom={i}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                      <CardHeader className="text-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-primary/10 p-4 mx-auto mb-4 text-primary group-hover:bg-primary/20 transition-colors duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {highlight.icon}
                        </motion.div>
                        <CardTitle className="group-hover:text-primary transition-colors duration-300">
                          {highlight.title}
                        </CardTitle>
                        <CardDescription>
                          {highlight.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants}>
                <Card className="shadow-xl border-primary/10">
                  <CardContent className="p-8 md:p-12">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          1. Acceptance of Terms
                        </h2>
                        <p className="text-muted-foreground">
                          By accessing and using ResumeRocket ("the Service"),
                          you accept and agree to be bound by the terms and
                          provision of this agreement. If you do not agree to
                          abide by the above, please do not use this service.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          2. Description of Service
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          ResumeRocket provides AI-powered resume optimization
                          services, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Resume analysis and scoring</li>
                          <li>ATS (Applicant Tracking System) optimization</li>
                          <li>Job-specific resume tailoring</li>
                          <li>Cover letter generation</li>
                          <li>Career guidance and recommendations</li>
                          <li>GitHub project analysis and integration</li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          3. User Accounts and Registration
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Account Creation
                            </h3>
                            <p className="text-muted-foreground">
                              To access certain features of our service, you
                              must register for an account. You agree to provide
                              accurate, current, and complete information during
                              the registration process.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Account Security
                            </h3>
                            <p className="text-muted-foreground">
                              You are responsible for safeguarding your account
                              credentials and for all activities that occur
                              under your account. You must notify us immediately
                              of any unauthorized use of your account.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Account Termination
                            </h3>
                            <p className="text-muted-foreground">
                              We reserve the right to terminate or suspend your
                              account at any time for violations of these terms
                              or for any other reason at our sole discretion.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          4. Subscription and Payment Terms
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Subscription Plans
                            </h3>
                            <p className="text-muted-foreground">
                              We offer both free and paid subscription plans.
                              Paid subscriptions provide access to premium
                              features and enhanced service capabilities.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Payment Processing
                            </h3>
                            <p className="text-muted-foreground">
                              Payments are processed securely through
                              third-party payment processors. By providing
                              payment information, you authorize us to charge
                              the applicable fees.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Automatic Renewal
                            </h3>
                            <p className="text-muted-foreground">
                              Paid subscriptions automatically renew unless
                              cancelled before the renewal date. You can cancel
                              your subscription at any time through your account
                              settings.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          5. User Content and Data
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Content Ownership
                            </h3>
                            <p className="text-muted-foreground">
                              You retain ownership of all content you upload to
                              our service, including resumes, cover letters, and
                              personal information.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              License to Use
                            </h3>
                            <p className="text-muted-foreground">
                              By uploading content, you grant us a limited
                              license to use, process, and analyze your content
                              solely for the purpose of providing our services.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Content Standards
                            </h3>
                            <p className="text-muted-foreground">
                              You agree not to upload content that is illegal,
                              harmful, threatening, abusive, defamatory, or
                              otherwise objectionable.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          6. Acceptable Use Policy
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          You agree not to use our service for any unlawful
                          purpose or in any way that could damage, disable, or
                          impair our service. Prohibited activities include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            Attempting to gain unauthorized access to our
                            systems
                          </li>
                          <li>
                            Using automated tools to access our service without
                            permission
                          </li>
                          <li>Uploading malicious code or viruses</li>
                          <li>
                            Interfering with other users' use of the service
                          </li>
                          <li>Violating any applicable laws or regulations</li>
                          <li>
                            Impersonating others or providing false information
                          </li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          7. Intellectual Property Rights
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Our Intellectual Property
                            </h3>
                            <p className="text-muted-foreground">
                              The service, including all software, algorithms,
                              designs, and content, is protected by copyright,
                              trademark, and other intellectual property laws.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Limited License
                            </h3>
                            <p className="text-muted-foreground">
                              We grant you a limited, non-exclusive,
                              non-transferable license to use our service in
                              accordance with these terms.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          8. Privacy and Data Protection
                        </h2>
                        <p className="text-muted-foreground">
                          Your privacy is important to us. Our collection and
                          use of personal information is governed by our Privacy
                          Policy, which is incorporated into these terms by
                          reference. Please review our Privacy Policy to
                          understand our practices.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          9. Disclaimers and Limitations
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Service Availability
                            </h3>
                            <p className="text-muted-foreground">
                              We strive to maintain high service availability
                              but cannot guarantee uninterrupted access. We may
                              temporarily suspend service for maintenance or
                              updates.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              AI-Generated Content
                            </h3>
                            <p className="text-muted-foreground">
                              Our AI-powered recommendations are provided as
                              guidance only. We do not guarantee job placement
                              or interview success based on our recommendations.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Limitation of Liability
                            </h3>
                            <p className="text-muted-foreground">
                              To the maximum extent permitted by law, we shall
                              not be liable for any indirect, incidental,
                              special, or consequential damages arising from
                              your use of our service.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          10. Termination
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          Either party may terminate this agreement at any time.
                          Upon termination:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            Your access to the service will be immediately
                            suspended
                          </li>
                          <li>
                            You may download your data within 30 days of
                            termination
                          </li>
                          <li>
                            We may delete your data after the 30-day period
                          </li>
                          <li>
                            No refunds will be provided for unused subscription
                            periods
                          </li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          11. Changes to Terms
                        </h2>
                        <p className="text-muted-foreground">
                          We reserve the right to modify these terms at any
                          time. We will notify users of material changes via
                          email or through our service. Continued use of the
                          service after changes constitutes acceptance of the
                          new terms.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          12. Governing Law and Disputes
                        </h2>
                        <p className="text-muted-foreground">
                          These terms are governed by the laws of the State of
                          California, United States. Any disputes arising from
                          these terms or your use of our service will be
                          resolved through binding arbitration in accordance
                          with the rules of the American Arbitration
                          Association.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          13. Contact Information
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          If you have any questions about these terms and
                          conditions, please contact us:
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-muted-foreground">
                            <strong>Email:</strong>{" "}
                            <a
                              href="mailto:legal@resumerocket.com"
                              className="text-primary hover:underline"
                            >
                              legal@resumerocket.com
                            </a>
                            <br />
                            <strong>Address:</strong> 123 Innovation Drive,
                            Suite 100, San Francisco, CA 94105
                            <br />
                            <strong>Phone:</strong> +1 (555) 123-4567
                          </p>
                        </div>
                      </motion.section>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t py-12 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-xl font-bold gradient-text">
              ResumeRocket
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ResumeRocket. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
