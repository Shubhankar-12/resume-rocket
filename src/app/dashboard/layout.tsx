"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  Github,
  Home,
  LogOut,
  Mail,
  Settings,
  Upload,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import RequireAuth from "@/components/RequireAuth";
import { logout } from "@/lib/store/slices/authSlice";
import { useDispatch } from "react-redux";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
  { name: "Cover Letters", href: "/dashboard/cover-letters", icon: Mail },
  { name: "GitHub Projects", href: "/dashboard/github", icon: Github },
  { name: "Upload Resume", href: "/dashboard/upload", icon: Upload },
  { name: "Resume Grader", href: "/dashboard/grader", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    console.log("Logout clicked");

    dispatch(logout());
    router.push("/auth");
  };
  return (
    <RequireAuth>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 ease-in-out hidden md:block bg-card border-r`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <Link href="/dashboard" className="flex items-center">
                {isSidebarOpen ? (
                  <h1 className="text-xl font-bold text-primary">ResumeAI</h1>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">R</span>
                  </div>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:flex hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-300 ${
                    isSidebarOpen ? "" : "rotate-180"
                  }`}
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                    ${
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  `}
                  >
                    <item.icon
                      className={`
                      ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }
                      mr-3 h-5 w-5 flex-shrink-0 transition-colors
                    `}
                      aria-hidden="true"
                    />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            John Doe
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            john.doe@example.com
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleLogout()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {isSidebarOpen && <ModeToggle />}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t">
          <div className="grid grid-cols-5 h-16">
            {navigation.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }
                flex flex-col items-center justify-center
              `}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name.split(" ")[0]}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-background border-b h-16 flex items-center justify-between px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
              <h1 className="text-xl font-semibold ml-2 md:hidden">ResumeAI</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
