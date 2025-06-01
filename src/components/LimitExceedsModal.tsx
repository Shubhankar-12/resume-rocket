"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, ArrowRight, X } from "lucide-react";

interface LimitExceededModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: "resume_upload" | "cover_letter" | "github_analysis";
  currentPlan: "FREE" | "BASIC" | "PRO";
  currentUsage: number;
  maxLimit: number;
}

const limitMessages = {
  resume_upload: {
    title: "Resume Upload Limit Reached",
    description: "You've reached your resume upload limit for this month.",
    feature: "resume uploads",
  },
  cover_letter: {
    title: "Cover Letter Generation Limit Reached",
    description:
      "You've reached your cover letter generation limit for this month.",
    feature: "cover letter generations",
  },
  github_analysis: {
    title: "GitHub Analysis Limit Reached",
    description:
      "You've reached your GitHub project analysis limit for this month.",
    feature: "GitHub project analyses",
  },
};

const planLimits = {
  free: { resume_upload: 1, cover_letter: 2, github_analysis: 3 },
  basic: { resume_upload: 5, cover_letter: 10, github_analysis: 15 },
  pro: { resume_upload: 25, cover_letter: 50, github_analysis: 100 },
  enterprise: {
    resume_upload: "Unlimited",
    cover_letter: "Unlimited",
    github_analysis: "Unlimited",
  },
};

const planPrices = {
  basic: { monthly: 199, yearly: 1899 },
  pro: { monthly: 499, yearly: 4799 },
  enterprise: { monthly: 1599, yearly: 14999 },
};

export function LimitExceededModal({
  isOpen,
  onClose,
  limitType,
  currentPlan,
  currentUsage,
  maxLimit,
}: LimitExceededModalProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const message = limitMessages[limitType];

  const getNextPlan = () => {
    if (currentPlan === "FREE") return "basic";
    if (currentPlan === "BASIC") return "pro";
    return "enterprise";
  };

  const nextPlan = getNextPlan();
  const nextPlanLimits = planLimits[nextPlan as keyof typeof planLimits];
  const nextPlanLimit = nextPlanLimits[limitType];

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    // Simulate upgrade process
    setTimeout(() => {
      setIsUpgrading(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/20">
                <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <DialogTitle className="text-lg font-semibold">
                {message.title}
              </DialogTitle>
            </div>
            {/* <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button> */}
          </div>
          <DialogDescription className="text-left">
            {message.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
            <AlertDescription className="text-sm">
              <div className="flex items-center justify-between">
                <span>Current usage:</span>
                <Badge
                  variant="outline"
                  className="border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-300"
                >
                  {currentUsage} / {maxLimit} {message.feature}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-800 dark:bg-teal-900/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              <h4 className="font-medium text-teal-900 dark:text-teal-100">
                Upgrade to{" "}
                {nextPlan.charAt(0).toUpperCase() + nextPlan.slice(1)}
              </h4>
            </div>
            <p className="text-sm text-teal-700 dark:text-teal-300 mb-3">
              Get{" "}
              {typeof nextPlanLimit === "string"
                ? nextPlanLimit.toLowerCase()
                : nextPlanLimit}{" "}
              {message.feature} per month
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-teal-600 dark:text-teal-400">
                  Starting at{" "}
                </span>
                <span className="font-semibold text-teal-900 dark:text-teal-100">
                  ₹{planPrices[nextPlan as keyof typeof planPrices]?.monthly}
                  /month
                </span>
              </div>
              <Badge className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
                Popular
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600"
            asChild
          >
            <Link href="/dashboard/plans">
              {isUpgrading ? (
                "Redirecting..."
              ) : (
                <>
                  Upgrade Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Link>
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
