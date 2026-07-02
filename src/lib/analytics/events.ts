export const EVENTS = {
  LANDING_VIEWED: "landing_viewed",
  HERO_CTA_CLICKED: "hero_cta_clicked",
  DEMO_VIEWED: "demo_viewed",
  FEATURE_SECTION_VIEWED: "feature_section_viewed",
  COMPARISON_ROW_HOVERED: "comparison_row_hovered",
  PRICING_TEASER_CLICKED: "pricing_teaser_clicked",
  FAQ_OPENED: "faq_opened",
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",
  CONSENT_GIVEN: "consent_given",
  CONSENT_DECLINED: "consent_declined",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

type CtaPosition = "hero" | "how" | "demo" | "final" | "header";

export type EventPropsMap = {
  landing_viewed: {
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  };
  hero_cta_clicked: { cta_label: string; cta_position: CtaPosition };
  demo_viewed: Record<string, never>;
  feature_section_viewed: { feature_id: string };
  comparison_row_hovered: { competitor_name: string };
  pricing_teaser_clicked: { plan_id: string };
  faq_opened: { question_id: string };
  signup_started: { source: "landing" | "header" | "other" };
  signup_completed: { source: "landing" | "header" | "other" };
  consent_given: Record<string, never>;
  consent_declined: Record<string, never>;
};

export type EventProps<E extends EventName> = EventPropsMap[E];
