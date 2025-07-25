"use client";

import type React from "react";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthAPI from "@/lib/api";
import { getCookie, setCookie } from "cookies-next";
import PaymentSubcriptionAPI from "@/lib/api/payment/payment_subs";
import jwt from "jsonwebtoken";
import UserAPI from "@/lib/api/user/users";

export default function AuthPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const checkLogin = async () => {
    const token = getCookie("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    const decodedToken: any = jwt.decode(token as string);
    if (!decodedToken || !decodedToken.user) {
      setIsLoggedIn(false);
      return;
    } else {
      try {
        const resp = await UserAPI.getUser(decodedToken.user.id);
        if (resp && resp.data && resp.data.body) {
          setIsLoggedIn(true);
          router.push("/dashboard");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const resp = await AuthAPI.loginWithEmailPassword(loginData);
      if (resp && resp.data && resp.data.body) {
        setCookie("token", resp.data.body.token);
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errors.length > 0
      ) {
        // setError(
        //   error.response.data.errors[0].message || "Invalid credentials"
        // ); FOR 3000 MS AND THEN REMOVE ERROR

        setError(
          error.response.data.errors[0].message || "Invalid credentials"
        );

        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("An unexpected error occurred. Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      setIsLoading(false);
      console.log("Error during login:", error);
    }
  };

  const createFreeSubscription = async () => {
    try {
      const resp = await PaymentSubcriptionAPI.createSubscription({
        plan: "FREE",
      });
      if (resp && resp.data && resp.data.body) {
        return resp.data.body;
      }
    } catch (error) {
      console.log("Error during creating free subscription:", error);
    }
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const resp = await AuthAPI.registerWithEmail(registerData);
      if (resp && resp.data && resp.data.body) {
        await setCookie("token", resp.data.body.token);
        // Create a free subscription after successful registration
        await createFreeSubscription();
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error during login:", error);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    if (provider === "github") {
      // https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`;
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      {isLoggedIn ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Link
            href="/"
            className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2"
          >
            <FileText className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">ResumeRocket</span>
          </Link>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome to ResumeRocket
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account or create a new one
              </p>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Enter your email and password to login to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        value={loginData.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="#"
                          className="text-xs text-teal-600 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        value={loginData.password}
                      />
                      {
                        // Error message
                        error && <p className="text-red-500 text-sm">{error}</p>
                      }
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-evenly space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => handleOAuthLogin("github")}
                        disabled={isLoading}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      {/* <Button
                    variant="outline"
                    onClick={() => handleOAuthLogin("google")}
                    disabled={isLoading}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button> */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                      Create a new account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                        value={registerData.name}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                        value={registerData.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => {
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          });
                          setError("");
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={(e) => {
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          });
                          setError("");
                        }}
                      />
                    </div>
                    {/* Error message */}
                    {error && <p className="text-red-500">{error}</p>}
                    <Button
                      className="w-full"
                      onClick={handleRegister}
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-evenly space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => handleOAuthLogin("github")}
                        disabled={isLoading}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <p className="text-xs text-muted-foreground">
                      By creating an account, you agree to our{" "}
                      <Link href="#" className="text-teal-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-teal-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
