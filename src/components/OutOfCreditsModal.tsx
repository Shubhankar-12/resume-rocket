"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  open: boolean;
  creditsNeeded: number;
  onClose: () => void;
}

export function OutOfCreditsModal({ open, creditsNeeded, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Out of credits</DialogTitle>
          <DialogDescription>
            This action needs {creditsNeeded} credit{creditsNeeded === 1 ? "" : "s"}. Top up to
            continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-4">
          <Button asChild className="flex-1" onClick={onClose}>
            <Link href="/dashboard/billing/credits">Buy credits</Link>
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
