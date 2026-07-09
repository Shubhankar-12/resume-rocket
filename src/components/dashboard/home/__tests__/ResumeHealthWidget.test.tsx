import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeHealthWidget } from "../widgets/ResumeHealthWidget";

describe("ResumeHealthWidget", () => {
  it("lists suggestions as review items", () => {
    render(
      <ResumeHealthWidget
        resumeId="r1"
        analysis={{
          gradingScore: 70,
          atsScore: 80,
          suggestions: [{ title: "Add metrics", description: "Quantify impact" }],
        }}
      />
    );
    expect(screen.getByText("Add metrics")).toBeInTheDocument();
  });

  it("shows an upload prompt when there is no analysis", () => {
    render(<ResumeHealthWidget />);
    expect(screen.getByText(/upload a resume/i)).toBeInTheDocument();
  });
});
