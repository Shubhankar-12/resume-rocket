import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Landing from "@/components/Landing";

async function checkLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }
  const decodedToken: any = await jwt.decode(token);
  if (!decodedToken || !decodedToken.user || !decodedToken.user.id) {
    return false;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_USER_API}/api/v1/user?user_id=${decodedToken.user.id}`,
    {
      headers: {
        Authorization: `Bearer ` + token,
      },
    }
  );
  if (!res.ok) return null;
  const response = await res.json();

  return response.body ? true : false;
}

export default async function Page() {
  const loggedIn = await checkLoggedIn();

  return <Landing isLoggedIn={Boolean(loggedIn)} />;
}
