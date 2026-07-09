import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreWidget } from "../widgets/ScoreWidget";
import { getGrade } from "../grade";

describe("getGrade", () => {
  it("maps scores to letter grades", () => {
    expect(getGrade(96)).toBe("A+");
    expect(getGrade(72)).toBe("B");
    expect(getGrade(10)).toBe("E");
  });
});

describe("ScoreWidget", () => {
  it("shows real ATS and keyword-match values", () => {
    render(
      <ScoreWidget
        reduce
        userResumes={{
          analysis: { suggestions: [], gradingScore: 82, atsScore: 87 },
          status: "done",
          resume: { url: "", name: "cv.pdf", mimetype: "application/pdf" },
          created_on: new Date(),
          updated_on: new Date(),
          user_resume_id: "r1",
        }}
      />
    );
    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.getByText("82%")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /report/i })).toHaveAttribute(
      "href",
      "/dashboard/grader/r1"
    );
  });

  it("renders an upload empty state when there is no resume", () => {
    render(<ScoreWidget reduce />);
    expect(screen.getByRole("link", { name: /upload/i })).toHaveAttribute(
      "href",
      "/dashboard/upload"
    );
  });
});
