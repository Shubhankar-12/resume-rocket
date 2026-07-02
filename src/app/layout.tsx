import type React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "@/components/StoreProvider";
import { LoaderProvider } from "@/components/Loader/loader-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PostHogProvider } from "@/components/PostHogProvider";
import { ConsentBanner } from "@/components/ConsentBanner";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeRocket - Resume Grader & Job Application Tailor",
  description: "Optimize your resume and job applications with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <LoaderProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${inter.className} ${spaceGrotesk.variable}`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <ErrorBoundary>
                <PostHogProvider>{children}</PostHogProvider>
              </ErrorBoundary>
              <ConsentBanner />
            </ThemeProvider>
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                  strategy="afterInteractive"
                />
                <Script id="ga4" strategy="afterInteractive">
                  {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
                </Script>
              </>
            )}
          </body>
        </html>
      </LoaderProvider>
    </StoreProvider>
  );
}
