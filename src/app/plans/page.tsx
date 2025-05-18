"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Shield, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Define plan types
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

export default function PlansPage() {
  const [yearly, setYearly] = useState(false);
  //   const { toast } = useconsole.log();

  // Define the plans
  const plans: Plan[] = [
    {
      id: "free",
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
      id: "basic",
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
      id: "pro",
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

  // Function to handle Razorpay payment
  const handleSubscribe = (plan: Plan) => {
    const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

    if (price === 0) {
      console.log({
        title: "Free Plan Selected",
        description: "You've selected the free plan. No payment required.",
      });
      return;
    }

    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Replace with your actual Razorpay key
        amount: price * 100, // Amount in smallest currency unit (e.g., paise for INR)
        currency: "INR",
        name: "ResumeRocket",
        description: `${plan.name} Plan - ${
          yearly ? "Yearly" : "Monthly"
        } Subscription`,
        image: "/logo.png", // Add your logo URL
        handler: (response: any) => {
          // Handle successful payment
          console.log({
            title: "Payment Successful!",
            description: `Your payment for the ${plan.name} plan was successful. Payment ID: ${response.razorpay_payment_id}`,
          });
        },
        prefill: {
          name: "User Name", // Can be dynamically filled from user profile
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#7C3AED", // Primary color of your app
        },
        modal: {
          ondismiss: () => {
            console.log({
              title: "Payment Cancelled",
              description:
                "You cancelled the payment process. You can try again anytime.",
              variant: "destructive",
            });
          },
        },
      };

      // @ts-ignore - Razorpay is loaded dynamically
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };

    script.onerror = () => {
      console.log({
        title: "Payment Error",
        description: "Failed to load payment gateway. Please try again later.",
        variant: "destructive",
      });
    };

    document.body.appendChild(script);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
          Choose Your Plan
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Select the perfect plan to accelerate your job search and career
          growth
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center mt-8 space-x-3">
          <span
            className={cn("text-sm", !yearly && "font-medium text-foreground")}
          >
            Monthly
          </span>
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
            className="data-[state=checked]:bg-purple-600"
          />
          <span
            className={cn("text-sm", yearly && "font-medium text-foreground")}
          >
            Yearly
            <Badge
              variant="outline"
              className="ml-2 bg-purple-100 text-purple-800 border-purple-200"
            >
              Save 20%
            </Badge>
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <AnimatePresence>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:ring-2 hover:ring-offset-2",
                plan.popular && "ring-purple-500"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-bold uppercase tracking-wider bg-purple-600 text-white px-4 py-1 rounded-bl-lg shadow-md">
                    Popular
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "p-1",
                  plan.popular && "bg-gradient-to-r from-purple-500 to-pink-500"
                )}
              >
                <div className="bg-card rounded-t-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className={cn("p-2 rounded-lg", plan.color)}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.description}
                  </p>

                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-extrabold">
                      ₹{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {plan.monthlyPrice > 0
                        ? yearly
                          ? "/year"
                          : "/month"
                        : ""}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6"
                  >
                    <Button
                      onClick={() => handleSubscribe(plan)}
                      className={cn(
                        "w-full",
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          : ""
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.monthlyPrice === 0 ? "Get Started" : "Subscribe"}
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="p-6 pt-4 space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Plan includes:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start"
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          !feature.included && "text-muted-foreground"
                        )}
                      >
                        {feature.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-bold">Need a custom plan?</h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Contact our sales team for custom enterprise solutions tailored to
          your organization's needs.
        </p>
        <Button variant="outline" className="mt-4">
          Contact Sales
        </Button>
      </motion.div>
    </div>
  );
}
