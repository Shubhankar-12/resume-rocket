import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialProof } from "../sections/SocialProof";
import { Testimonials } from "../sections/Testimonials";
import { PROOF_STRIP, TESTIMONIALS } from "../../data/fabricated-proof";

describe("SocialProof", () => {
  it("renders the proof strip values", () => {
    render(<SocialProof />);
    expect(screen.getByText(PROOF_STRIP.userCount)).toBeTruthy();
    expect(screen.getByText(PROOF_STRIP.rating)).toBeTruthy();
    expect(screen.getByText(PROOF_STRIP.feature)).toBeTruthy();
  });
});

describe("Testimonials", () => {
  it("renders all three testimonials", () => {
    render(<Testimonials />);
    TESTIMONIALS.forEach((t) => expect(screen.getByText(t.name)).toBeTruthy());
  });
});
