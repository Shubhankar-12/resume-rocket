"use client";

import { use, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination";
import { TipsCard } from "@/components/TipsCard";
import { RepositoryCard } from "@/components/RepositoryCard";
import { SelectedProjectCard } from "@/components/SelectedProject";
import { Search, Briefcase, CircleAlertIcon, Github } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import UserAPI from "@/lib/api/user/users";
import { getLanguageColor } from "@/helpers/colors";
import ProjectAnalysisAPI from "@/lib/api/project-analysis/project_analysis";
import { useLoader } from "@/hooks/useLoader";

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  topics: string[];
  updated_at: string;
  additional_comments?: string;
}

export interface AnalysisType {
  project_ids: number[];
  status: string;
  user_id: string;
  role: string;
  selected_project: SelectedProject[];
  project_analysis_id: string;
}

export interface SelectedProject {
  topics: string[];
  _id: string;
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  languageColor: string;
  additional_comments: string;
  ai_score: number;
  relevance: string;
  reason: string;
  key_points: string[];
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
  const [analyzedProjects, setAnalyzedProjects] = useState<SelectedProject[]>(
    []
  );
  const handleCommentChange = (id: number, value: string) => {
    setGithubRepos((prev) =>
      prev.map((repo) =>
        repo.id === id ? { ...repo, additional_comments: value } : repo
      )
    );
    setSelectedRepos((prev) =>
      prev.map((repo) =>
        repo.id === id ? { ...repo, additional_comments: value } : repo
      )
    );
  };

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
      console.log("Total Pages:", data.public_repos);
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
    console.log("Decoded Token:", decodedToken);

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
      loader.show("Fetching repositories...");
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
              additional_comments: "",
            };
          })
          .filter((repo: any) =>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      loader.hide();
    } catch (error) {
      console.error("Error fetching repositories:", error);
      loader.hide();
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
  const selectedRepoIdsWithScores = selectedRepos
    .filter((repo) => selectedRepoIds.includes(repo.id))
    ?.map((repo) => ({
      ...repo,
      aiScore: mockAIScores[repo.id as keyof typeof mockAIScores],
    }))
    ?.sort((a, b) => b?.aiScore?.score - a?.aiScore?.score);

  const loader = useLoader();
  const handleAnalyzeClick = async () => {
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
      loader.show("Creating Selected Projects Analysis...");
      const resp = await ProjectAnalysisAPI.createProjectAnalysis({
        user_id: decodedToken.user.id,
        role: selectedRole,
        projects: selectedRepoIdsWithScores,
      });
      if (resp && resp.data && resp.data.body) {
        setAnalyzedProjects(resp.data.body.selected_project || []);
        setActiveTab("selected");
        loader.hide();
      }
    } catch (error) {
      console.error("Error creating project analysis:", error);
      loader.hide();
    }
  };

  const handleConnect = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`;
  };

  if (!user || user?.provider !== "github") {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Connect GitHub Account</CardTitle>
            <CardDescription>
              Link your GitHub account to analyze your repositories and find the
              best projects to showcase on your resume
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Github className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Enhance Your Resume with GitHub Projects
            </h3>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              We'll analyze your repositories to find the most impressive
              projects based on stars, activity, and technologies used.
            </p>
            <Button onClick={handleConnect} className="gap-2">
              <Github className="h-4 w-4" />
              Connect GitHub Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              onClick={handleAnalyzeClick}
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
              <TabsTrigger
                value="selected"
                disabled={analyzedProjects.length === 0}
              >
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
                      onCommentChange={handleCommentChange}
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
              {totalPages && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </TabsContent>

            <TabsContent value="selected" className="space-y-4">
              {analyzedProjects.length > 0 ? (
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

                  {analyzedProjects.map((repo) => (
                    <SelectedProjectCard
                      key={repo.id}
                      repository={repo}
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
