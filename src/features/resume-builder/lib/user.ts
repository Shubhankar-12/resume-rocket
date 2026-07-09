import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

/** Derive the current user id from the `token` cookie (decoded, not verified — client-side only). */
export function getUserIdFromToken(): string | null {
  try {
    const token = getCookie("token") as string | undefined;
    if (!token) return null;
    const decoded = jwt.decode(token) as {
      user?: { id?: string };
      user_id?: string;
      id?: string;
    } | null;
    return decoded?.user?.id ?? decoded?.user_id ?? decoded?.id ?? null;
  } catch {
    return null;
  }
}
