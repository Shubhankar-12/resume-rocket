"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "@/lib/store/slices/authSlice";

interface Auth {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Auth) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          dispatch(login(data.data.token));
          setIsAuthenticated(true);
        } else {
          dispatch(logout());
          router.push("/auth");
        }
      } catch {
        dispatch(logout());
        router.push("/auth");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return <>{isAuthenticated && !isLoading ? <>{children}</> : <div>Loading...</div>}</>;
};

export default RequireAuth;
