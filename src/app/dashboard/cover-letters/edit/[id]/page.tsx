"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, FileText } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import CoverLetterAPI from "@/lib/api/cover-letters/cover_letter";

const UpdateCoverLetterPage = () => {
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState({
    cover_letter: "",
    resume_id: "",
    cover_letter_id: "",
    cover_letter_summary: "",
    job_description: "",
    role: "",
    company: "",
  });
  const { id } = useParams();
  const router = useRouter();

  const fetchCoverLetter = async () => {
    try {
      const response = await CoverLetterAPI.getCoverLetterById(id);
      if (response && response.data && response.data.body) {
        setGeneratedCoverLetter(response.data.body);
      }
    } catch (error) {
      console.error("Error fetching cover letter:", error);
    }
  };

  useEffect(() => {
    fetchCoverLetter();
  }, []);

  const handleSave = async () => {
    try {
      const response = await CoverLetterAPI.updateCoverLetter(
        generatedCoverLetter
      );
      if (response && response.data && response.data.body) {
        router.push("/dashboard/cover-letters");
      }
    } catch (error) {
      console.error("Error updating cover letter:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Cover Letter</h2>
      <Card>
        <CardContent>
          <div className="my-4">
            <Label className="py-4 ">Generated Cover Letter</Label>
            <ScrollArea className="h-[calc(100vh-400px)]">
              <Textarea
                className="mt-2 min-h-[300px]"
                value={generatedCoverLetter.cover_letter}
                onChange={(e) =>
                  setGeneratedCoverLetter((prev) => ({
                    ...prev,
                    cover_letter: e.target.value,
                  }))
                }
              />
            </ScrollArea>
          </div>
          <div className="my-4">
            <Label className="py-4 ">Cover Letter Summary</Label>
            <Textarea
              className="mt-2 min-h-[100px]"
              value={generatedCoverLetter.cover_letter_summary}
              onChange={(e) =>
                setGeneratedCoverLetter((prev) => ({
                  ...prev,
                  cover_letter_summary: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
            <Button onClick={handleSave}>Save Cover Letter</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateCoverLetterPage;
