"use client";

import type React from "react";

import { useState } from "react";
import { flushSync } from "react-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/marketing/PageHero";

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    flushSync(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    });

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
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak with our team directly",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available 9 AM - 6 PM EST",
      action: "#",
    },
    {
      icon: <HeadphonesIcon className="h-6 w-6" />,
      title: "Priority Support",
      description: "Premium support for Pro users",
      contact: "priority@resumerocket.com",
      action: "mailto:priority@resumerocket.com",
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
      value: "Monday - Friday: 9:00 AM - 6:00 PM PST\nWeekends: 10:00 AM - 4:00 PM PST",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Team Size",
      value: "50+ dedicated professionals\nAcross 3 time zones",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Get in Touch"
        intro="Have questions about ResumeRocket? Need help optimizing your resume? Our team is here to help you succeed in your job search."
        meta={
          <>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-rr-accent" aria-hidden />
              24/7 Support Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-rr-accent" aria-hidden />
              Average Response: 2 hours
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-rr-accent" aria-hidden />
              Expert Career Guidance
            </span>
          </>
        }
      />

      <section className="mx-auto max-w-[1200px] px-4 pb-24 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-rr-text md:text-4xl">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-lg text-rr-text-secondary">
            Choose the contact method that works best for you
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method, i) => (
            <div key={i} className="rounded-2xl border border-rr-border bg-rr-card p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
                {method.icon}
              </span>
              <h3 className="mb-1 font-display text-lg font-semibold text-rr-text">
                {method.title}
              </h3>
              <p className="mb-3 text-sm text-rr-text-secondary">{method.description}</p>
              <a
                href={method.action}
                className="text-sm font-medium text-rr-accent hover:underline"
              >
                {method.contact}
              </a>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {officeInfo.map((info, i) => (
            <div key={i} className="rounded-2xl border border-rr-border bg-rr-card p-6 text-center">
              <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-rr-accent-light text-rr-accent">
                {info.icon}
              </span>
              <h3 className="mb-2 font-display font-semibold text-rr-text">{info.label}</h3>
              <p className="whitespace-pre-line text-sm text-rr-text-secondary">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold tracking-[-0.02em] text-rr-text md:text-4xl">
              Send Us a Message
            </h2>
            <p className="text-lg text-rr-text-secondary">
              Fill out the form below and we&apos;ll get back to you as soon as possible
            </p>
          </div>

          <div className="rounded-2xl border border-rr-border bg-rr-card p-6 md:p-8">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rr-accent-light">
                  <CheckCircle className="h-10 w-10 text-rr-success" aria-hidden />
                </span>
                <h3 className="mb-4 font-display text-2xl font-bold text-rr-text">
                  Message Sent Successfully!
                </h3>
                <p className="text-rr-text-secondary">
                  Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-rr-text">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-rr-text">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-rr-text">
                      Category *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-rr-text">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-rr-text">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please provide details about your inquiry..."
                    required
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 w-full bg-rr-accent text-lg text-white hover:bg-rr-accent-hover"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
