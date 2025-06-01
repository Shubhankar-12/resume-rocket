"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Palette } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  const cycleTheme = () => {
    const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />;
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "system":
        return <Palette className="h-5 w-5" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light mode";
      case "dark":
        return "Dark mode";
      case "system":
        return "System theme";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.button
        onClick={cycleTheme}
        className="group relative overflow-hidden rounded-full bg-background/80 backdrop-blur-xl border border-border/50 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label={getLabel()}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
              "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
              "linear-gradient(225deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(315deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Icon with rotation animation */}
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10 text-foreground group-hover:text-primary transition-colors duration-300"
        >
          {getIcon()}
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.8 }}
          whileHover={{ opacity: 1, x: 0, scale: 1 }}
          className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium pointer-events-none"
        >
          {getLabel()}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-background/90" />
        </motion.div>
      </motion.button>

      {/* Floating particles around the button */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI * 2) / 6) * 30],
            y: [0, Math.sin((i * Math.PI * 2) / 6) * 30],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
