"use client";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface JobDescDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  jobDesc: string;
}

export function JobDescDialog({ open, setOpen, jobDesc }: JobDescDialogProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    // change the copy icon to tick for 500ms
    setCopied(true);
    navigator.clipboard.writeText(jobDesc);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-auto w-auto">
        <DialogHeader>
          <DialogTitle>Job Description</DialogTitle>
          <DialogDescription>
            {copied
              ? "Job Description copied to clipboard"
              : "Copy job description"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Job Description
            </Label>
            <Textarea
              id="link"
              rows={10}
              cols={100}
              defaultValue={jobDesc}
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            disabled={copied}
            onClick={handleCopy}
            variant="secondary"
          >
            {copied ? (
              <Check className="mr-2 h-4 -4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
