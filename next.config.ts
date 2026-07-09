import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the serverless Chromium binary + puppeteer-core out of the bundle so
  // Next traces them as external packages (required for PDF generation to work
  // in the serverless runtime).
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
});
