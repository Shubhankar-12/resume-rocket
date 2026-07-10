import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * Server-only best-effort auth check for public pages that render the shared
 * Header (which needs `isLoggedIn`). Reads the httpOnly `token` cookie, decodes
 * it, and confirms the user still resolves on the backend. Never throws.
 */
export async function getIsLoggedIn(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return false;
    const decoded = jwt.decode(token) as { user?: { id?: string } } | null;
    if (!decoded?.user?.id) return false;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/api/v1/user?user_id=${decoded.user.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return false;
    const response = await res.json();
    return Boolean(response.body);
  } catch {
    return false;
  }
}
