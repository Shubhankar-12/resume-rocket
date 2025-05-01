import { Separator } from "@/components/ui/separator";
import React from "react";
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

type Props = {
  params: { id: string };
};

async function getCoverLetter(id: string): Promise<CoverLetterItem | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_USER_API}/api/v1/cover-letter?cover_letter_id=${id}`;

    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ` + process.env.NEXT_PUBLIC_API_TOKEN,
      },
    });

    if (!resp.ok) {
      return null;
    }
    const response = await resp.json();

    return response.body;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function CoverDownload({ params }: Props) {
  const paramsData = await params;
  const selectedCoverLetter = await getCoverLetter(paramsData.id);
  if (!selectedCoverLetter) {
    return <div>No Cover Letter Found</div>;
  }

  return (
    <div className="p-6">
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
            <div className="space-y-4">
              {selectedCoverLetter.cover_letter
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="text-sm">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <Separator />
        <div>
          <h3 className="mb-2 text-sm font-medium">Job Description</h3>
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm">{selectedCoverLetter.job_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
