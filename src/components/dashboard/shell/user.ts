/**
 * Defensive shape for the decoded-JWT auth user (Redux `state.auth.user`).
 * The exact JWT payload is verified during implementation; all fields optional.
 */
export interface DashboardUser {
  name?: string;
  email?: string;
  avatar?: { url?: string };
  plan?: string;
}

export function initialsOf(user: DashboardUser | null): string {
  if (!user) return "U";
  const source = (user.name ?? user.email ?? "").trim();
  if (!source) return "U";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source[0].toUpperCase();
}
