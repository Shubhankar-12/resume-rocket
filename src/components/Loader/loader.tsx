"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/lib/store/slices/hooks";
import { FileText, CheckCircle } from "lucide-react";

export function FullPageLoader() {
  const { isLoading, message, progress } = useAppSelector(
    (state) => state.loading
  );
  const [dots, setDots] = useState(".");

  // Animate the dots
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ".";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-8 p-6 text-center">
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="animate-pulse"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground/20"
                />
              </svg>

              {/* <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="339.292"
                    strokeDashoffset="254.469"
                    className="text-teal-600"
                  />
                </svg>
              </motion.div> */}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <FileText className="h-10 w-10 text-teal-600" />
                </motion.div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-medium text-foreground">
                {message}
                {dots}
              </h3>

              {progress !== null && (
                <div className="mx-auto w-64 space-y-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-teal-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {progress}% Complete
                  </p>
                </div>
              )}
            </div>

            {/* <div className="flex space-x-4">
              <AnimatedCircle delay={0} />
              <AnimatedCircle delay={0.2} />
              <AnimatedCircle delay={0.4} />
              <AnimatedCircle delay={0.6} />
              <AnimatedCircle delay={0.8} />
            </div> */}
          </div>

          {/* <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <div className="flex items-center space-x-2 rounded-full bg-background/90 px-4 py-2 shadow-lg">
              <CheckCircle className="h-4 w-4 text-teal-600" />
              <p className="text-sm">Optimizing your experience</p>
            </div>
          </div> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedCircle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
      className="h-3 w-3 rounded-full bg-teal-600"
    />
  );
}
