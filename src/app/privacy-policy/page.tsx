"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Eye,
  Lock,
  UserCheck,
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

export default function PrivacyPolicyPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
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

  const privacyHighlights = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Protection",
      description: "Your personal information is encrypted and securely stored",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Transparency",
      description: "Clear information about what data we collect and why",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Your Control",
      description: "You can access, modify, or delete your data anytime",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "No Selling",
      description: "We never sell your personal information to third parties",
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
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Policy
                </Badge>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Your Privacy Matters
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                We're committed to protecting your privacy and being transparent
                about how we collect, use, and protect your personal
                information.
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

        {/* Privacy Highlights */}
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
                  Our Privacy Commitments
                </h2>
                <p className="text-xl text-muted-foreground">
                  Key principles that guide our privacy practices
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {privacyHighlights.map((highlight, i) => (
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

        {/* Privacy Policy Content */}
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
                          1. Information We Collect
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Personal Information
                            </h3>
                            <p className="text-muted-foreground">
                              We collect information you provide directly to us,
                              such as when you create an account, upload your
                              resume, or contact us for support. This includes:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                              <li>
                                Name, email address, and contact information
                              </li>
                              <li>Resume content and career information</li>
                              <li>
                                Payment information (processed securely by our
                                payment providers)
                              </li>
                              <li>
                                Communication preferences and support inquiries
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Usage Information
                            </h3>
                            <p className="text-muted-foreground">
                              We automatically collect certain information about
                              your use of our services, including:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                              <li>Device information and browser type</li>
                              <li>IP address and location data</li>
                              <li>Usage patterns and feature interactions</li>
                              <li>Performance and error logs</li>
                            </ul>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          2. How We Use Your Information
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          We use the information we collect to provide,
                          maintain, and improve our services. Specifically, we
                          use your information to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Analyze and optimize your resume content</li>
                          <li>
                            Provide personalized job recommendations and career
                            advice
                          </li>
                          <li>Process payments and manage your subscription</li>
                          <li>Send you important updates about our services</li>
                          <li>
                            Provide customer support and respond to your
                            inquiries
                          </li>
                          <li>Improve our AI algorithms and service quality</li>
                          <li>Ensure security and prevent fraud</li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          3. Information Sharing and Disclosure
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          We do not sell, trade, or otherwise transfer your
                          personal information to third parties. We may share
                          your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            <strong>Service Providers:</strong> With trusted
                            third-party service providers who assist us in
                            operating our platform
                          </li>
                          <li>
                            <strong>Legal Requirements:</strong> When required
                            by law or to protect our rights and safety
                          </li>
                          <li>
                            <strong>Business Transfers:</strong> In connection
                            with a merger, acquisition, or sale of assets
                          </li>
                          <li>
                            <strong>With Your Consent:</strong> When you
                            explicitly authorize us to share your information
                          </li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          4. Data Security
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          We implement industry-standard security measures to
                          protect your personal information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>End-to-end encryption for data transmission</li>
                          <li>Secure data storage with regular backups</li>
                          <li>
                            Regular security audits and vulnerability
                            assessments
                          </li>
                          <li>
                            Access controls and employee training on data
                            protection
                          </li>
                          <li>Compliance with SOC 2 Type II standards</li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          5. Your Rights and Choices
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          You have several rights regarding your personal
                          information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            <strong>Access:</strong> Request a copy of the
                            personal information we hold about you
                          </li>
                          <li>
                            <strong>Correction:</strong> Update or correct
                            inaccurate personal information
                          </li>
                          <li>
                            <strong>Deletion:</strong> Request deletion of your
                            personal information
                          </li>
                          <li>
                            <strong>Portability:</strong> Request a copy of your
                            data in a portable format
                          </li>
                          <li>
                            <strong>Opt-out:</strong> Unsubscribe from marketing
                            communications
                          </li>
                        </ul>
                        <p className="text-muted-foreground mt-4">
                          To exercise these rights, please contact us at{" "}
                          <a
                            href="mailto:privacy@resumerocket.com"
                            className="text-primary hover:underline"
                          >
                            privacy@resumerocket.com
                          </a>
                          .
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          6. Cookies and Tracking
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          We use cookies and similar tracking technologies to
                          enhance your experience:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            <strong>Essential Cookies:</strong> Required for
                            basic site functionality
                          </li>
                          <li>
                            <strong>Analytics Cookies:</strong> Help us
                            understand how you use our services
                          </li>
                          <li>
                            <strong>Preference Cookies:</strong> Remember your
                            settings and preferences
                          </li>
                        </ul>
                        <p className="text-muted-foreground mt-4">
                          You can control cookie settings through your browser
                          preferences.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          7. International Data Transfers
                        </h2>
                        <p className="text-muted-foreground">
                          Your information may be transferred to and processed
                          in countries other than your own. We ensure
                          appropriate safeguards are in place to protect your
                          data in accordance with this privacy policy and
                          applicable laws.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          8. Children's Privacy
                        </h2>
                        <p className="text-muted-foreground">
                          Our services are not intended for children under 13
                          years of age. We do not knowingly collect personal
                          information from children under 13. If you become
                          aware that a child has provided us with personal
                          information, please contact us immediately.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          9. Changes to This Policy
                        </h2>
                        <p className="text-muted-foreground">
                          We may update this privacy policy from time to time.
                          We will notify you of any material changes by posting
                          the new policy on this page and updating the "Last
                          updated" date. We encourage you to review this policy
                          periodically.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          10. Contact Us
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          If you have any questions about this privacy policy or
                          our privacy practices, please contact us:
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-muted-foreground">
                            <strong>Email:</strong>{" "}
                            <a
                              href="mailto:privacy@resumerocket.com"
                              className="text-primary hover:underline"
                            >
                              privacy@resumerocket.com
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
