import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentActivityWidget } from "../widgets/RecentActivityWidget";
import { GithubWidget } from "../widgets/GithubWidget";
import { QuickActionsWidget } from "../widgets/QuickActionsWidget";

describe("RecentActivityWidget", () => {
  it("shows a resume activity row when present", () => {
    render(
      <RecentActivityWidget
        userResumes={{
          analysis: { suggestions: [], gradingScore: 80, atsScore: 80 },
          status: "done",
          resume: { url: "", name: "cv.pdf", mimetype: "application/pdf" },
          created_on: new Date(),
          updated_on: new Date(),
          user_resume_id: "r1",
        }}
      />
    );
    expect(screen.getByText(/resume added/i)).toBeInTheDocument();
  });

  it("shows an empty state with no activity", () => {
    render(<RecentActivityWidget />);
    expect(screen.getByText(/no activity yet/i)).toBeInTheDocument();
  });
});

describe("GithubWidget", () => {
  it("shows the username when connected", () => {
    render(
      <GithubWidget
        provider="github"
        githubProfile={{ githubId: "1", username: "shubh", profileUrl: "", reposUrl: "" }}
      />
    );
    expect(screen.getByText(/@shubh/)).toBeInTheDocument();
  });

  it("prompts to connect when not linked", () => {
    render(<GithubWidget />);
    expect(screen.getByRole("link", { name: /connect github/i })).toHaveAttribute(
      "href",
      "/dashboard/github"
    );
  });
});

describe("QuickActionsWidget", () => {
  it("includes Connect GitHub only when not linked", () => {
    const { rerender } = render(<QuickActionsWidget provider="github" />);
    expect(screen.queryByRole("link", { name: /connect github/i })).not.toBeInTheDocument();
    rerender(<QuickActionsWidget provider="email" />);
    expect(screen.getByRole("link", { name: /connect github/i })).toBeInTheDocument();
  });
});
