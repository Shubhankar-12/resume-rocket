"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  FileText,
  Download,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronRight,
  Calendar,
  Search,
  PenTool,
  Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import CoverLetterAPI from "@/lib/api/cover-letters/cover_letter";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { usePdfExport } from "@/hooks/usePdfExport";
import { useLoader } from "@/hooks/useLoader";

interface CoverLetterItem {
  cover_letter_id: string;
  cover_letter: string;
  role: string;
  company: string;
  cover_letter_summary: string;
  job_description: string;
  created_on: string;
  updated_on: string;
  resume_id: string;
  user_id: string;
}

export default function CoverLettersPage() {
  const [selectedCoverLetter, setSelectedCoverLetter] =
    useState<CoverLetterItem | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [allCoverLetters, setAllCoverLetters] = useState<CoverLetterItem[]>([]);

  const handleCoverLetterClick = (coverLetter: CoverLetterItem) => {
    setSelectedCoverLetter(coverLetter);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const fetchCoverLetters = async () => {
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
      const response = await CoverLetterAPI.getAllCoverLetters({
        search: searchQuery,
        user_id: decodedToken.user.id,
      });
      if (response && response.data && response.data.body) {
        setAllCoverLetters(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching cover letters:", error);
    }
  };

  useEffect(() => {
    // debounce the search query 500
    const timeout = setTimeout(() => {
      fetchCoverLetters();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleDeleteCoverLetter = async (coverLetterId: string) => {
    try {
      await CoverLetterAPI.updateCoverLetter({
        cover_letter_id: coverLetterId,
        status: "DISABLED",
      });

      fetchCoverLetters();
    } catch (error) {
      console.error("Error deleting cover letter:", error);
    }
  };

  const { exportPageToPdf, isExporting } = usePdfExport();
  const loader = useLoader();

  const handleDownloadCoverLetter = async (coverLetterId: string) => {
    try {
      loader.show("Downloading cover letter...");
      const response = await CoverLetterAPI.getCoverLetterById(coverLetterId);
      if (response && response.data && response.data.body) {
        await exportPageToPdf(
          "http://localhost:3000/cover-letter/" + coverLetterId,
          `cover-letter-${selectedCoverLetter?.role}-${selectedCoverLetter?.company}.pdf`
        );
        loader.hide();
      }
    } catch (error) {
      console.error("Error downloading cover letter:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cover Letters</h1>
          <p className="text-muted-foreground">
            Manage and create personalized cover letters for your job
            applications
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/cover-letters/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Cover Letter
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search cover letters..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Cover Letters</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-1 p-2">
                  {allCoverLetters.length > 0 ? (
                    allCoverLetters.map((coverLetter) => (
                      <CoverLetterListItem
                        key={coverLetter.cover_letter_id}
                        coverLetter={coverLetter}
                        isSelected={
                          selectedCoverLetter?.cover_letter_id ===
                          coverLetter.cover_letter_id
                        }
                        onDelete={() =>
                          handleDeleteCoverLetter(coverLetter.cover_letter_id)
                        }
                        onDownload={() =>
                          handleDownloadCoverLetter(coverLetter.cover_letter_id)
                        }
                        onClick={() => handleCoverLetterClick(coverLetter)}
                      />
                    ))
                  ) : (
                    <div className="flex h-32 flex-col items-center justify-center text-center">
                      <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        No cover letters found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {searchQuery
                          ? "Try a different search term"
                          : "Create your first cover letter"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedCoverLetter ? (
            <Card className="h-full">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{selectedCoverLetter.role}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Created on {formatDate(selectedCoverLetter.created_on)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      handleDownloadCoverLetter(
                        selectedCoverLetter.cover_letter_id
                      )
                    }
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/dashboard/cover-letters/edit/${selectedCoverLetter.cover_letter_id}`}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Summary</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedCoverLetter.cover_letter_summary}
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="mb-2 text-sm font-medium">Cover Letter</h3>
                      <div className="rounded-md border p-6">
                        <ScrollArea className="h-[calc(100vh-500px)]">
                          <div className="space-y-4">
                            {selectedCoverLetter.cover_letter &&
                              selectedCoverLetter.cover_letter
                                .split("\n\n")
                                .map((paragraph, index) => (
                                  <p key={index} className="text-sm">
                                    {paragraph}
                                  </p>
                                ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>

                    <Separator />
                    <div>
                      <h3 className="mb-2 text-sm font-medium">
                        Job Description
                      </h3>
                      <div className="rounded-md bg-muted p-3">
                        <p className="text-sm">
                          {selectedCoverLetter.job_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          ) : (
            <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium">Select a Cover Letter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a cover letter from the list to view its details
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

interface CoverLetterListItemProps {
  coverLetter: CoverLetterItem;
  isSelected: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
}

function CoverLetterListItem({
  coverLetter,
  isSelected,
  onClick,
  onDelete,
  onDownload,
}: CoverLetterListItemProps) {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-3 transition-all hover:bg-accent/50 ${
        isSelected ? "border-teal-600 bg-teal-50 dark:bg-teal-950/30" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
            <PenTool className="h-4 w-4 text-teal-600" />
          </div>
          <div>
            <div className="font-medium">{coverLetter.role}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              <span>{coverLetter.company}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/cover-letters/edit/${coverLetter.cover_letter_id}`}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDownload(coverLetter.cover_letter_id)}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(coverLetter.cover_letter_id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight
            className={`h-4 w-4 ${
              isSelected ? "text-teal-600" : "text-muted-foreground"
            }`}
          />
        </div>
      </div>
      <div className="mt-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {coverLetter.cover_letter_summary}
        </p>
      </div>
    </div>
  );
}
