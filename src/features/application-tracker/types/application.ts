export const APPLICATION_STATUSES = [
  "BOOKMARKED",
  "APPLIED",
  "PHONE_SCREEN",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  BOOKMARKED: "Bookmarked",
  APPLIED: "Applied",
  PHONE_SCREEN: "Phone Screen",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  BOOKMARKED: "bg-gray-100 dark:bg-gray-800",
  APPLIED: "bg-blue-50 dark:bg-blue-950",
  PHONE_SCREEN: "bg-yellow-50 dark:bg-yellow-950",
  INTERVIEW: "bg-purple-50 dark:bg-purple-950",
  OFFER: "bg-green-50 dark:bg-green-950",
  REJECTED: "bg-red-50 dark:bg-red-950",
};

export interface Application {
  application_id: string;
  user_id: string;
  company: string;
  role: string;
  job_url: string;
  job_description: string;
  status: ApplicationStatus;
  position: number;
  notes: string;
  applied_date: string | null;
  resume_id: string | null;
  cover_letter_id: string | null;
  created_on: string;
  updated_on: string;
}

export interface CreateApplicationData {
  company: string;
  role: string;
  job_url?: string;
  job_description?: string;
  notes?: string;
  status?: ApplicationStatus;
  applied_date?: string | null;
  resume_id?: string | null;
  cover_letter_id?: string | null;
}

export type KanbanColumns = Record<ApplicationStatus, Application[]>;
