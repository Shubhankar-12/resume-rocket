export const CAREER_GOALS = [
  { value: "NEW_JOB", label: "Looking for a new job", icon: "Briefcase" },
  { value: "CAREER_CHANGE", label: "Changing careers", icon: "ArrowRightLeft" },
  { value: "FIRST_JOB", label: "Getting my first job", icon: "GraduationCap" },
  { value: "FREELANCING", label: "Going freelance", icon: "Laptop" },
] as const;

export type CareerGoal = "NEW_JOB" | "CAREER_CHANGE" | "FIRST_JOB" | "FREELANCING";

export interface OnboardingFormData {
  careerGoal: CareerGoal | null;
  targetRole: string | null;
  resumeId: string | null;
  score: number | null;
  suggestions: { title: string; description: string }[];
}

export const ONBOARDING_STEPS = [
  "Career Goal",
  "Target Role",
  "Upload Resume",
  "Your Score",
] as const;
