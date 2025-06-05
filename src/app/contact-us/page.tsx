"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HeadphonesIcon,
  Users,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contactInfoRef, contactInfoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@resumerocket.com",
      action: "mailto:support@resumerocket.com",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak with our team directly",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      gradient: "from-green-500 to-blue-600",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 6 PM EST",
      action: "#",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "Priority Support",
      description: "Premium support for Pro users",
      contact: "priority@resumerocket.com",
      action: "mailto:priority@resumerocket.com",
      gradient: "from-orange-500 to-red-600",
    },
  ];

  const officeInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "123 Innovation Drive, Suite 100\nSan Francisco, CA 94105",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Business Hours",
      value:
        "Monday - Friday: 9:00 AM - 6:00 PM PST\nWeekends: 10:00 AM - 4:00 PM PST",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Team Size",
      value: "50+ dedicated professionals\nAcross 3 time zones",
    },
  ];

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
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Badge>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Have questions about ResumeRocket? Need help optimizing your
                resume? Our team is here to help you succeed in your job search.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4"
              >
                <Badge variant="outline" className="bg-background">
                  <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                  24/7 Support Available
                </Badge>
                <Badge variant="outline" className="bg-background">
                  <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                  Average Response: 2 hours
                </Badge>
                <Badge variant="outline" className="bg-background">
                  <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                  Expert Career Guidance
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section ref={contactInfoRef} className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={contactInfoInView ? "visible" : "hidden"}
              className="max-w-6xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Multiple Ways to Reach Us
                </h2>
                <p className="text-xl text-muted-foreground">
                  Choose the contact method that works best for you
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
                {contactMethods.map((method, i) => (
                  <motion.div key={i} variants={itemVariants} custom={i}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                      <CardHeader className="text-center">
                        <motion.div
                          className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.gradient} p-4 mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {method.icon}
                        </motion.div>
                        <CardTitle className="group-hover:text-primary transition-colors duration-300">
                          {method.title}
                        </CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <a
                          href={method.action}
                          className="font-medium text-primary hover:underline transition-colors duration-300"
                        >
                          {method.contact}
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Office Information */}
              <motion.div
                variants={itemVariants}
                className="grid gap-8 md:grid-cols-3"
              >
                {officeInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    custom={i}
                    className="text-center p-6 rounded-xl bg-background border border-muted hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <div className="text-primary">{info.icon}</div>
                    </div>
                    <h3 className="font-semibold mb-2">{info.label}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {info.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={formRef} className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Send Us a Message
                </h2>
                <p className="text-xl text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="shadow-xl border-primary/10">
                  <CardContent className="p-8">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.6 }}
                        >
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-4">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-muted-foreground">
                          Thank you for contacting us. We'll get back to you
                          within 24 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              Full Name *
                            </label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="Enter your full name"
                              required
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-sm font-medium"
                            >
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder="Enter your email address"
                              required
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="category"
                              className="text-sm font-medium"
                            >
                              Category *
                            </label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) =>
                                handleInputChange("category", value)
                              }
                            >
                              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">
                                  General Inquiry
                                </SelectItem>
                                <SelectItem value="technical">
                                  Technical Support
                                </SelectItem>
                                <SelectItem value="billing">
                                  Billing & Payments
                                </SelectItem>
                                <SelectItem value="feature">
                                  Feature Request
                                </SelectItem>
                                <SelectItem value="bug">Bug Report</SelectItem>
                                <SelectItem value="partnership">
                                  Partnership
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="subject"
                              className="text-sm font-medium"
                            >
                              Subject *
                            </label>
                            <Input
                              id="subject"
                              value={formData.subject}
                              onChange={(e) =>
                                handleInputChange("subject", e.target.value)
                              }
                              placeholder="Brief description of your inquiry"
                              required
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium"
                          >
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            placeholder="Please provide details about your inquiry..."
                            required
                            rows={6}
                            className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white h-12 text-lg"
                          >
                            {isSubmitting ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "linear",
                                }}
                                className="mr-2"
                              >
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                              </motion.div>
                            ) : (
                              <Send className="mr-2 h-5 w-5" />
                            )}
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </motion.div>
                      </form>
                    )}
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
