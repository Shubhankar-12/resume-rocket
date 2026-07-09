import { describe, it, expect } from "vitest";
import { NAV_ITEMS, isNavActive, breadcrumbFor } from "../nav-items";
import { initialsOf } from "../user";

describe("nav-items", () => {
  it("has Dashboard first and Billing surfaced", () => {
    expect(NAV_ITEMS[0].href).toBe("/dashboard");
    expect(NAV_ITEMS.some((i) => i.href === "/dashboard/billing/credits")).toBe(true);
  });

  it("marks /dashboard active only on exact match", () => {
    expect(isNavActive("/dashboard", "/dashboard")).toBe(true);
    expect(isNavActive("/dashboard/resumes", "/dashboard")).toBe(false);
  });

  it("marks sub-routes active by prefix", () => {
    expect(isNavActive("/dashboard/cover-letters/edit/1", "/dashboard/cover-letters")).toBe(true);
  });

  it("derives breadcrumb labels", () => {
    expect(breadcrumbFor("/dashboard")).toBe("Dashboard");
    expect(breadcrumbFor("/dashboard/tracker")).toBe("Tracker");
    expect(breadcrumbFor("/dashboard/grader/abc123")).toBe("Grader");
    expect(breadcrumbFor("/dashboard/billing/credits")).toBe("Billing");
  });
});

describe("initialsOf", () => {
  it("uses the name when present", () => {
    expect(initialsOf({ name: "Ajay Kumar" })).toBe("AK");
  });
  it("falls back to email, then a default", () => {
    expect(initialsOf({ email: "ajay@x.com" })).toBe("A");
    expect(initialsOf(null)).toBe("U");
  });
});
