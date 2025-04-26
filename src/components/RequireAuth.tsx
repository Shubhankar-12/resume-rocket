"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import AuthAPI from "@/lib/api";
import { useDispatch } from "react-redux";
import { logout, setSliceToken } from "@/lib/store/slices/authSlice";
import UserAPI from "@/lib/api/user/users";

interface Auth {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Auth) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [isLoading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token: any = getCookie("token"); // Get token from cookie

    if (token) {
      setToken(token); // Set user if the token is present and valid
    } else {
      console.log("No token found");
      return router.push("/auth"); // Redirect to login if no token is found
    }
    // Set loading to false after checking the token

    setLoading(false);
  }, [token]);

  const fetchEmployee = async () => {
    if (!token) {
      return;
    }

    dispatch(setSliceToken(token));
    try {
      let decodedToken = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );

      const reponse = await UserAPI.getUser(decodedToken?.user?.id);

      if (reponse?.data?.statusCode !== 200) {
        dispatch(logout());
        return router.push("/auth");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        return router.push("/auth");
      }
    }
  };
  useEffect(() => {
    // fetchPermissions();
    fetchEmployee();
  }, [token]);

  return <>{token && !isLoading ? <>{children}</> : <div>Loading...</div>}</>;
};

export default RequireAuth;
