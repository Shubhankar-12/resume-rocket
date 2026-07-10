import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sheet, SheetContent, SheetTitle } from "../sheet";

describe("Sheet", () => {
  it("renders content and title when open", () => {
    render(
      <Sheet open>
        <SheetContent side="left">
          <SheetTitle>Menu</SheetTitle>
          <p>Drawer body</p>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Drawer body")).toBeInTheDocument();
  });

  it("defaults to side=right when no side is passed", () => {
    render(
      <Sheet open>
        <SheetContent>
          <SheetTitle>Notifications</SheetTitle>
          <p>Default side body</p>
        </SheetContent>
      </Sheet>
    );
    expect(screen.getByRole("dialog")).toHaveClass("right-0");
  });
});
