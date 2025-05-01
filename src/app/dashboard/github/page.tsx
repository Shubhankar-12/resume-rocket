"use client";

import { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination";
import { TipsCard } from "@/components/TipsCard";
import { RepositoryCard } from "@/components/RepositoryCard";
import { SelectedProjectCard } from "@/components/SelectedProject";
import { Search, Briefcase, CircleAlertIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import UserAPI from "@/lib/api/user/users";
import { getLanguageColor } from "@/helpers/colors";

// Mock GitHub repositories data
const mockRepositories = [
  {
    id: 1,
    name: "react-dashboard",
    description:
      "A responsive dashboard built with React, TypeScript, and Tailwind CSS",
    stars: 124,
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["react", "typescript", "tailwind", "dashboard"],
    updated_at: "2023-10-15",
  },
  {
    id: 2,
    name: "next-ecommerce",
    description:
      "E-commerce platform built with Next.js, Prisma, and Stripe integration",
    stars: 87,
    language: "JavaScript",
    languageColor: "#f1e05a",
    topics: ["nextjs", "ecommerce", "stripe", "prisma"],
    updated_at: "2023-11-02",
  },
  {
    id: 3,
    name: "node-api-starter",
    description:
      "RESTful API starter template with Node.js, Express, and MongoDB",
    stars: 56,
    language: "JavaScript",
    languageColor: "#f1e05a",
    topics: ["nodejs", "express", "mongodb", "api"],
    updated_at: "2023-09-28",
  },
  {
    id: 4,
    name: "vue-task-manager",
    description: "Task management application built with Vue.js and Vuex",
    stars: 42,
    language: "Vue",
    languageColor: "#41b883",
    topics: ["vue", "vuex", "task-manager"],
    updated_at: "2023-08-17",
  },
  {
    id: 5,
    name: "python-data-analysis",
    description:
      "Data analysis and visualization tools using Python, Pandas, and Matplotlib",
    stars: 35,
    language: "Python",
    languageColor: "#3572A5",
    topics: ["python", "pandas", "data-analysis", "matplotlib"],
    updated_at: "2023-10-05",
  },
  {
    id: 6,
    name: "react-native-fitness",
    description: "Fitness tracking mobile app built with React Native and Expo",
    stars: 29,
    language: "JavaScript",
    languageColor: "#f1e05a",
    topics: ["react-native", "expo", "fitness", "mobile"],
    updated_at: "2023-11-10",
  },
  {
    id: 7,
    name: "go-microservices",
    description:
      "Microservices architecture example using Go, gRPC, and Docker",
    stars: 78,
    language: "Go",
    languageColor: "#00ADD8",
    topics: ["go", "microservices", "grpc", "docker"],
    updated_at: "2023-09-12",
  },
  {
    id: 8,
    name: "angular-crm",
    description:
      "Customer relationship management system built with Angular and Firebase",
    stars: 31,
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["angular", "firebase", "crm"],
    updated_at: "2023-07-22",
  },
  {
    id: 9,
    name: "django-blog",
    description: "Full-featured blog platform built with Django and PostgreSQL",
    stars: 45,
    language: "Python",
    languageColor: "#3572A5",
    topics: ["django", "blog", "postgresql"],
    updated_at: "2023-10-30",
  },
  {
    id: 10,
    name: "flutter-weather-app",
    description:
      "Weather forecast application built with Flutter and OpenWeatherMap API",
    stars: 38,
    language: "Dart",
    languageColor: "#00B4AB",
    topics: ["flutter", "weather", "mobile", "api"],
    updated_at: "2023-11-05",
  },
  {
    id: 11,
    name: "rust-cli-tools",
    description: "Collection of command-line utilities built with Rust",
    stars: 62,
    language: "Rust",
    languageColor: "#dea584",
    topics: ["rust", "cli", "utilities"],
    updated_at: "2023-08-28",
  },
  {
    id: 12,
    name: "svelte-portfolio",
    description: "Personal portfolio website built with Svelte and TailwindCSS",
    stars: 27,
    language: "Svelte",
    languageColor: "#ff3e00",
    topics: ["svelte", "portfolio", "tailwindcss"],
    updated_at: "2023-09-18",
  },
  {
    id: 13,
    name: "laravel-saas-boilerplate",
    description:
      "Software as a Service boilerplate built with Laravel and Vue.js",
    stars: 93,
    language: "PHP",
    languageColor: "#4F5D95",
    topics: ["laravel", "saas", "vue", "subscription"],
    updated_at: "2023-10-22",
  },
  {
    id: 14,
    name: "kotlin-android-notes",
    description:
      "Note-taking Android application built with Kotlin and Room database",
    stars: 41,
    language: "Kotlin",
    languageColor: "#A97BFF",
    topics: ["kotlin", "android", "room", "notes"],
    updated_at: "2023-11-08",
  },
  {
    id: 15,
    name: "express-auth-api",
    description:
      "Authentication API with JWT, OAuth, and role-based access control",
    stars: 54,
    language: "JavaScript",
    languageColor: "#f1e05a",
    topics: ["express", "authentication", "jwt", "oauth"],
    updated_at: "2023-09-25",
  },
  {
    id: 16,
    name: "react-design-system",
    description:
      "Reusable component library and design system for React applications",
    stars: 112,
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["react", "design-system", "components", "storybook"],
    updated_at: "2023-10-12",
  },
  {
    id: 17,
    name: "swift-ios-chat",
    description:
      "Real-time chat application for iOS built with Swift and Firebase",
    stars: 37,
    language: "Swift",
    languageColor: "#ffac45",
    topics: ["swift", "ios", "firebase", "chat"],
    updated_at: "2023-08-05",
  },
  {
    id: 18,
    name: "graphql-apollo-server",
    description:
      "GraphQL server built with Apollo Server, Node.js, and MongoDB",
    stars: 68,
    language: "JavaScript",
    languageColor: "#f1e05a",
    topics: ["graphql", "apollo", "nodejs", "mongodb"],
    updated_at: "2023-11-01",
  },
  {
    id: 19,
    name: "docker-compose-examples",
    description:
      "Collection of Docker Compose examples for various development stacks",
    stars: 83,
    language: "Docker",
    languageColor: "#384d54",
    topics: ["docker", "docker-compose", "devops"],
    updated_at: "2023-09-30",
  },
  {
    id: 20,
    name: "machine-learning-projects",
    description:
      "Various machine learning projects using TensorFlow and scikit-learn",
    stars: 59,
    language: "Python",
    languageColor: "#3572A5",
    topics: ["machine-learning", "tensorflow", "scikit-learn", "data-science"],
    updated_at: "2023-10-18",
  },
];

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  topics: string[];
  updated_at: string;
}

// Mock AI-generated scores and explanations
const mockAIScores = {
  1: {
    score: 92,
    relevance: "High",
    explanation:
      "This React dashboard project demonstrates your frontend skills with modern technologies like TypeScript and Tailwind CSS, which are highly sought after for frontend developer roles.",
  },
  2: {
    score: 88,
    relevance: "High",
    explanation:
      "Your e-commerce platform showcases full-stack development skills with Next.js and integration with third-party services like Stripe, which is valuable for full-stack developer positions.",
  },
  3: {
    score: 85,
    relevance: "Medium",
    explanation:
      "This Node.js API starter demonstrates your backend development skills and understanding of RESTful principles, which are important for backend or full-stack roles.",
  },
  4: {
    score: 78,
    relevance: "Medium",
    explanation:
      "The Vue task manager shows your versatility with different frontend frameworks, though React is more commonly requested in job descriptions.",
  },
  5: {
    score: 72,
    relevance: "Low",
    explanation:
      "While this Python data analysis project shows your analytical skills, it may be less relevant for web development roles unless you're applying for data-focused positions.",
  },
  6: {
    score: 86,
    relevance: "Medium",
    explanation:
      "Your React Native fitness app demonstrates mobile development skills, which can be valuable for companies looking for developers who can work across platforms.",
  },
  7: {
    score: 90,
    relevance: "High",
    explanation:
      "The Go microservices project showcases your backend architecture skills and understanding of modern deployment practices, which are highly valued for backend roles.",
  },
  8: {
    score: 82,
    relevance: "Medium",
    explanation:
      "This Angular CRM project demonstrates your experience with enterprise-level frameworks and real-time databases, useful for frontend or full-stack positions.",
  },
  9: {
    score: 75,
    relevance: "Low",
    explanation:
      "The Django blog shows your Python web development skills, but may be less relevant if you're applying for JavaScript-focused positions.",
  },
  10: {
    score: 80,
    relevance: "Medium",
    explanation:
      "Your Flutter weather app demonstrates cross-platform mobile development skills and API integration, which can be valuable for mobile developer roles.",
  },
  11: {
    score: 84,
    relevance: "Medium",
    explanation:
      "The Rust CLI tools showcase your systems programming skills and performance optimization, which can be valuable for backend or DevOps roles.",
  },
  12: {
    score: 76,
    relevance: "Medium",
    explanation:
      "Your Svelte portfolio demonstrates knowledge of modern frontend frameworks and design skills, though Svelte is less commonly required than React or Angular.",
  },
  13: {
    score: 89,
    relevance: "High",
    explanation:
      "The Laravel SaaS boilerplate shows your full-stack development skills and understanding of subscription-based business models, valuable for full-stack roles.",
  },
  14: {
    score: 77,
    relevance: "Low",
    explanation:
      "Your Kotlin Android app demonstrates mobile development skills specific to Android, which may be less relevant for web development positions.",
  },
  15: {
    score: 87,
    relevance: "High",
    explanation:
      "The Express authentication API showcases your understanding of security concepts and backend development, which are critical for many web development roles.",
  },
  16: {
    score: 94,
    relevance: "High",
    explanation:
      "Your React design system demonstrates component architecture skills and attention to UI/UX details, which are highly valued for frontend developer positions.",
  },
  17: {
    score: 74,
    relevance: "Low",
    explanation:
      "The Swift iOS chat app shows your mobile development skills specific to iOS, which may be less relevant for web development positions.",
  },
  18: {
    score: 91,
    relevance: "High",
    explanation:
      "Your GraphQL Apollo server demonstrates modern API development skills and knowledge of alternatives to REST, which are increasingly sought after.",
  },
  19: {
    score: 83,
    relevance: "Medium",
    explanation:
      "The Docker Compose examples showcase your DevOps knowledge and containerization skills, which are valuable for full-stack or DevOps positions.",
  },
  20: {
    score: 79,
    relevance: "Low",
    explanation:
      "While your machine learning projects demonstrate strong technical skills, they may be less relevant for web development roles unless you're applying for AI/ML positions.",
  },
};

export default function GitHubProjectSelection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);
  const [activeTab, setActiveTab] = useState("repositories");
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState<{
    provider: string;
    username: string;
    profileUrl: string;
    reposUrl: string;
  } | null>(null);

  const [githubRepos, setGithubRepos] = useState<Repository[]>([]);

  const getTotalPages = async () => {
    try {
      if (!user || user.provider !== "github" || !user.reposUrl) {
        console.log("Github user not found", user);

        console.error("Github user not found");
        return;
      }
      const resp = await fetch(`https://api.github.com/users/${user.username}`);
      const data = await resp.json();
      setTotalPages(Math.ceil(data.public_repos / itemsPerPage));
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const fetchUser = async () => {
    const token = await getCookie("token");
    if (!token) {
      console.error("Token not found");
      return;
    }
    const decodedToken: any = await jwt.decode(token);
    if (!decodedToken || !decodedToken.user || !decodedToken.user.id) {
      console.error("Invalid token or user ID not found");
      return;
    }
    try {
      const resp = await UserAPI.getUser(decodedToken.user.id);
      if (resp && resp.data && resp.data.body) {
        setUser({
          provider: resp.data.body.provider,
          username: resp.data.body.username,
          reposUrl: resp.data.body.githubProfile.reposUrl,
          profileUrl: resp.data.body.githubProfile.profileUrl,
        });
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchRepos = async () => {
    try {
      if (!user || user.provider !== "github" || !user.reposUrl) {
        console.error("Github user not found");
        return;
      }
      const resp = await fetch(
        `${user.reposUrl}?sort=updated&direction=desc&per_page=${itemsPerPage}&page=${currentPage}`
      );
      const data = await resp.json();
      setGithubRepos(
        data
          .map((repo: any) => {
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description || "",
              stars: repo.stargazers_count || 0,
              language: repo.language || "-",
              languageColor: repo.language
                ? getLanguageColor(repo.language)
                : "#000000",
              topics: repo.topics || [],
              updated_at: repo.updated_at,
            };
          })
          .filter((repo: any) =>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user?.username) getTotalPages();
  }, [user]);

  useEffect(() => {
    if (user?.username) {
      fetchRepos();
    }
  }, [user, currentPage, searchQuery]);

  // Filter repositories based on search query
  const filteredRepos = mockRepositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle repository selection
  const toggleRepoSelection = (repoId: number) => {
    if (selectedRepoIds.includes(repoId)) {
      setSelectedRepoIds(selectedRepoIds.filter((id) => id !== repoId));
      setSelectedRepos(selectedRepos.filter((repo) => repo.id !== repoId));
    } else {
      if (selectedRepoIds.length < 5) {
        setSelectedRepoIds([...selectedRepoIds, repoId]);
        setSelectedRepos([
          ...selectedRepos,
          githubRepos.find((repo) => repo.id === repoId)!,
        ]);
      }
    }
  };

  useEffect(() => {
    console.log("selectedRepoIds", selectedRepos);
  }, [selectedRepos.length]);

  // Get selected repositories with AI scores
  const selectedRepoIdsWithScores = mockRepositories
    .filter((repo) => selectedRepoIds.includes(repo.id))
    .map((repo) => ({
      ...repo,
      aiScore: mockAIScores[repo.id as keyof typeof mockAIScores],
    }))
    .sort((a, b) => b.aiScore.score - a.aiScore.score);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">GitHub Project Selection</h1>
        <p className="text-muted-foreground">
          Select up to 5 repositories to showcase in your portfolio or resume
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="role" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Role you're applying for
            </Label>
            <Input
              id="role"
              placeholder="e.g. Frontend Developer, Full Stack Engineer"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
          </div>
          <div className="mb-0.5">
            <Button
              variant={selectedRepoIds.length > 0 ? "default" : "outline"}
              className="text-sm"
            >
              {selectedRepoIds.length > 0
                ? `Analyze Selected ${selectedRepoIds.length} repositories`
                : "Select repositories"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="repositories">All Repositories</TabsTrigger>
              <TabsTrigger value="selected">
                Selected Projects Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repositories" className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search repositories..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                >
                  Clear
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {githubRepos.length > 0 ? (
                  githubRepos.map((repo) => (
                    <RepositoryCard
                      key={repo.id}
                      repository={repo}
                      isSelected={selectedRepoIds.includes(repo.id)}
                      onToggleSelect={() => toggleRepoSelection(repo.id)}
                      disabled={
                        !selectedRepoIds.includes(repo.id) &&
                        selectedRepoIds.length >= 5
                      }
                    />
                  ))
                ) : (
                  <div className="col-span-2 rounded-lg border border-dashed p-8 text-center">
                    <h3 className="text-lg font-medium">
                      No repositories found
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your search or clear the filter
                    </p>
                  </div>
                )}
              </div>

              {filteredRepos.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </TabsContent>

            <TabsContent value="selected" className="space-y-4">
              {selectedRepoIds.length > 0 ? (
                <div className="space-y-4">
                  {selectedRole && (
                    <Alert>
                      <CircleAlertIcon className="h-4 w-4" />
                      <AlertTitle>
                        Projects selected for: {selectedRole}
                      </AlertTitle>
                      <AlertDescription>
                        These projects have been analyzed for relevance to your
                        target role.
                      </AlertDescription>
                    </Alert>
                  )}

                  {selectedRepoIdsWithScores.map((repo) => (
                    <SelectedProjectCard
                      key={repo.id}
                      repository={repo}
                      aiScore={repo.aiScore}
                      onRemove={() => toggleRepoSelection(repo.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-3">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">
                      No projects selected
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Select up to 5 repositories from the "All Repositories"
                      tab to see them previewed here with relevance scores.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => setActiveTab("repositories")}
                    >
                      Browse Repositories
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <TipsCard />
        </div>
      </div>
    </div>
  );
}
