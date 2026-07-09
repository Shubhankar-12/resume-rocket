import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the serverless Chromium binary + puppeteer-core out of the bundle so
  // Next traces them as external packages (required for PDF generation to work
  // in the serverless runtime).
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  // The Chromium binary lives in bin/*.br and is read from disk at runtime (not
  // require()d), so Next's file tracer can't discover it on its own — include it
  // explicitly for the PDF route or the function ships without a browser.
  outputFileTracingIncludes: {
    "/api/generate-pdf": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
});
