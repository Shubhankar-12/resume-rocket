"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  RefreshCw,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Calendar,
  DollarSign,
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

export default function RefundPolicyPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
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

  const refundHighlights = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "14-Day Guarantee",
      description: "Full refund within 14 days of purchase, no questions asked",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Easy Process",
      description: "Simple refund request process through your account",
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Quick Processing",
      description: "Refunds processed within 3-5 business days",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Full Amount",
      description: "100% refund of your subscription fee",
    },
  ];

  const refundSteps = [
    {
      step: "1",
      title: "Request Refund",
      description:
        "Contact our support team or use the self-service option in your account",
    },
    {
      step: "2",
      title: "Verification",
      description:
        "We verify your request and confirm eligibility within 24 hours",
    },
    {
      step: "3",
      title: "Processing",
      description:
        "Refund is processed and sent to your original payment method",
    },
    {
      step: "4",
      title: "Confirmation",
      description:
        "You receive confirmation and the refund appears in 3-5 business days",
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
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Return & Refund Policy
                </Badge>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Return & Refund Policy
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                We stand behind our service with a comprehensive refund policy.
                Your satisfaction is our priority, and we make returns simple
                and hassle-free.
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

        {/* Refund Highlights */}
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
                  Our Refund Guarantee
                </h2>
                <p className="text-xl text-muted-foreground">
                  Simple, transparent, and customer-friendly refund process
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {refundHighlights.map((highlight, i) => (
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

        {/* Refund Process */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How to Request a Refund
                </h2>
                <p className="text-xl text-muted-foreground">
                  Follow these simple steps to process your refund
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
                {/* Connecting line */}
                <motion.div
                  className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                  initial={{ scaleX: 0 }}
                  animate={contentInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {refundSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    custom={i}
                    className="text-center relative"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 z-10 relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.step}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Refund Policy Content */}
        <section className="py-20 bg-muted/30">
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
                          1. Refund Eligibility
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          We offer a 14-day money-back guarantee for all paid
                          subscriptions. You are eligible for a full refund if:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            You request a refund within 14 days of your initial
                            purchase
                          </li>
                          <li>You have not violated our Terms of Service</li>
                          <li>Your account is in good standing</li>
                          <li>
                            You provide a valid reason for the refund request
                          </li>
                        </ul>
                        <p className="text-muted-foreground mt-4">
                          <strong>Note:</strong> Free accounts are not eligible
                          for refunds as no payment was made.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          2. Refund Process
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              How to Request
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              You can request a refund through any of the
                              following methods:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>
                                Email us at{" "}
                                <a
                                  href="mailto:refunds@resumerocket.com"
                                  className="text-primary hover:underline"
                                >
                                  refunds@resumerocket.com
                                </a>
                              </li>
                              <li>
                                Use the "Request Refund" option in your account
                                settings
                              </li>
                              <li>
                                Contact our support team through live chat
                              </li>
                              <li>
                                Call our customer service at +1 (555) 123-4567
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Required Information
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              When requesting a refund, please provide:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Your account email address</li>
                              <li>Order/transaction ID</li>
                              <li>Reason for refund request</li>
                              <li>Date of purchase</li>
                            </ul>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          3. Processing Timeline
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Review Period
                            </h3>
                            <p className="text-muted-foreground">
                              We will review your refund request within 24 hours
                              of submission. Most requests are approved
                              automatically if they meet our eligibility
                              criteria.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Processing Time
                            </h3>
                            <p className="text-muted-foreground">
                              Once approved, refunds are processed within 1-2
                              business days. The time it takes for the refund to
                              appear in your account depends on your payment
                              method:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                              <li>
                                <strong>Credit/Debit Cards:</strong> 3-5
                                business days
                              </li>
                              <li>
                                <strong>PayPal:</strong> 1-2 business days
                              </li>
                              <li>
                                <strong>Bank Transfer:</strong> 5-7 business
                                days
                              </li>
                              <li>
                                <strong>Digital Wallets:</strong> 1-3 business
                                days
                              </li>
                            </ul>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          4. Refund Amount
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Full Refund
                            </h3>
                            <p className="text-muted-foreground">
                              You will receive a 100% refund of the amount paid
                              for your subscription. This includes:
                            </p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                              <li>Monthly subscription fees</li>
                              <li>
                                Annual subscription fees (prorated if
                                applicable)
                              </li>
                              <li>Any applicable taxes paid</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Processing Fees
                            </h3>
                            <p className="text-muted-foreground">
                              We absorb all processing fees associated with
                              refunds. You will not be charged any additional
                              fees for processing your refund.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          5. Account Access After Refund
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          Once a refund is processed:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            Your paid subscription will be immediately cancelled
                          </li>
                          <li>You will lose access to premium features</li>
                          <li>Your account will revert to the free plan</li>
                          <li>
                            You can download your data for 30 days after the
                            refund
                          </li>
                          <li>
                            You may re-subscribe at any time in the future
                          </li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          6. Exceptions and Special Cases
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Non-Refundable Items
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              The following are not eligible for refunds:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              <li>Requests made after the 14-day period</li>
                              <li>
                                Accounts terminated for Terms of Service
                                violations
                              </li>
                              <li>Fraudulent or chargeback transactions</li>
                              <li>
                                Gift subscriptions (refund goes to original
                                purchaser)
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              Partial Refunds
                            </h3>
                            <p className="text-muted-foreground">
                              In exceptional circumstances, we may offer partial
                              refunds for annual subscriptions based on unused
                              time. These are evaluated on a case-by-case basis.
                            </p>
                          </div>
                        </div>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          7. Dispute Resolution
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          If you're not satisfied with our refund decision:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>
                            Contact our customer service manager for review
                          </li>
                          <li>Provide additional documentation if requested</li>
                          <li>
                            We will respond within 48 hours with a final
                            decision
                          </li>
                          <li>
                            All decisions are made in good faith and customer
                            satisfaction
                          </li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          8. Chargebacks and Payment Disputes
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          Before initiating a chargeback with your bank or
                          credit card company:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li>Please contact us first to resolve the issue</li>
                          <li>
                            We can often resolve disputes faster than the
                            chargeback process
                          </li>
                          <li>Chargebacks may result in account suspension</li>
                          <li>
                            We reserve the right to dispute illegitimate
                            chargebacks
                          </li>
                        </ul>
                      </motion.section>

                      <motion.section variants={itemVariants} className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          9. Changes to This Policy
                        </h2>
                        <p className="text-muted-foreground">
                          We may update this refund policy from time to time.
                          Changes will be posted on this page with an updated
                          "Last modified" date. Continued use of our service
                          after changes constitutes acceptance of the new
                          policy.
                        </p>
                      </motion.section>

                      <motion.section variants={itemVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                          10. Contact Information
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          For refund requests or questions about this policy,
                          contact us:
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-muted-foreground">
                            <strong>Refund Email:</strong>{" "}
                            <a
                              href="mailto:refunds@resumerocket.com"
                              className="text-primary hover:underline"
                            >
                              refunds@resumerocket.com
                            </a>
                            <br />
                            <strong>Support Email:</strong>{" "}
                            <a
                              href="mailto:support@resumerocket.com"
                              className="text-primary hover:underline"
                            >
                              support@resumerocket.com
                            </a>
                            <br />
                            <strong>Phone:</strong> +1 (555) 123-4567
                            <br />
                            <strong>Address:</strong> 123 Innovation Drive,
                            Suite 100, San Francisco, CA 94105
                            <br />
                            <strong>Business Hours:</strong> Monday - Friday,
                            9:00 AM - 6:00 PM PST
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

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div variants={itemVariants}>
                <Card className="shadow-xl border-primary/10 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">
                        Need Help with a Refund?
                      </h3>
                      <p className="text-muted-foreground">
                        Our customer support team is here to help you with any
                        refund questions or requests. We're committed to making
                        the process as smooth as possible.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                        >
                          <a href="mailto:refunds@resumerocket.com">
                            Request Refund
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/contact">Contact Support</Link>
                        </Button>
                      </div>
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
