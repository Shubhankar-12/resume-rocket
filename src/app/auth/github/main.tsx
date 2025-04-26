"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText } from "lucide-react";
import Link from "next/link";
import AuthAPI from "@/lib/api";
import { useDispatch } from "react-redux";
import { login } from "@/lib/store/slices/authSlice";

export default function GitHubCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const authenticateWithGitHub = async () => {
    if (!code) {
      console.error("No code provided in the URL parameters.");
      return;
    }
    try {
      const response = await AuthAPI.githubAuth({
        code: code,
        state: state,
      });
      if (response && response.data) {
        console.log("GitHub authentication successful:", response.data);

        dispatch(login({ token: response.data.body.token.token })); // Assuming the token is in response.data.token
      }
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
    }
  };
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  useEffect(() => {
    if (error) {
      setStatus("error");
      setErrorMessage("Authentication failed. Please try again.");
      return;
    }

    if (code) {
      authenticateWithGitHub()
        .then(() => {
          setStatus("success");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          setErrorMessage("Authentication failed. Please try again.");
        });
    } else {
      setStatus("error");
      setErrorMessage("No code provided in the URL parameters.");
    }
  }, [code, state, error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2"
      >
        <FileText className="h-6 w-6 text-teal-600" />
        <span className="text-xl font-bold">ResumeAI</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">GitHub Authentication</CardTitle>
          <CardDescription>
            {status === "loading" && "Processing your GitHub login..."}
            {status === "success" && "Authentication successful!"}
            {status === "error" && "Authentication failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Please wait while we authenticate your GitHub account...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="rounded-full bg-teal-100 p-3 dark:bg-teal-900/30">
                <CheckCircle className="h-8 w-8 text-teal-600" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                You have successfully authenticated with GitHub. Redirecting to
                dashboard...
              </p>
            </div>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
                <div className="mt-4">
                  <Link
                    href="/auth"
                    className="text-sm font-medium underline underline-offset-4"
                  >
                    Return to login page
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
