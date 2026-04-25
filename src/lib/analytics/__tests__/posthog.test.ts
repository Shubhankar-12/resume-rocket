import { describe, it, expect, beforeEach, vi } from "vitest";

const mockPosthog = {
  init: vi.fn(),
  capture: vi.fn(),
  identify: vi.fn(),
  opt_in_capturing: vi.fn(),
  opt_out_capturing: vi.fn(),
  reset: vi.fn(),
  __loaded: false,
};

vi.mock("posthog-js", () => ({
  default: mockPosthog,
}));

vi.mock("../consent", () => ({
  getConsent: vi.fn(() => "unknown"),
}));

describe("posthog wrapper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPosthog.__loaded = false;
  });

  it("does not init when consent is unknown", async () => {
    const { initAnalytics } = await import("../posthog");
    initAnalytics();
    expect(mockPosthog.init).not.toHaveBeenCalled();
  });

  it("initializes posthog when consent is accepted", async () => {
    const consent = await import("../consent");
    vi.mocked(consent.getConsent).mockReturnValue("accepted");
    process.env.NEXT_PUBLIC_POSTHOG_KEY = "phc_test";
    const { initAnalytics } = await import("../posthog");
    initAnalytics();
    expect(mockPosthog.init).toHaveBeenCalledWith(
      "phc_test",
      expect.objectContaining({
        autocapture: false,
        session_recording: expect.objectContaining({
          maskAllInputs: true,
        }),
      })
    );
  });

  it("captureEvent is a no-op when consent is unknown", async () => {
    const { captureEvent } = await import("../posthog");
    captureEvent("landing_viewed", {});
    expect(mockPosthog.capture).not.toHaveBeenCalled();
  });

  it("captureEvent forwards to posthog when loaded + accepted", async () => {
    const consent = await import("../consent");
    vi.mocked(consent.getConsent).mockReturnValue("accepted");
    mockPosthog.__loaded = true;
    const { captureEvent } = await import("../posthog");
    captureEvent("hero_cta_clicked", { cta_label: "Start free", cta_position: "hero" });
    expect(mockPosthog.capture).toHaveBeenCalledWith("hero_cta_clicked", {
      cta_label: "Start free",
      cta_position: "hero",
    });
  });
});
