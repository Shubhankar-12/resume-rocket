"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import AuthAPI from "@/lib/api";
import { useDispatch } from "react-redux";
import { login } from "@/lib/api/store/slices/authSlice";

export default function GithubCallback() {
  const params = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");
  const router = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = useState<any>();

  const githubAuth = async () => {
    if (!code) {
      console.error("No code provided in the URL parameters.");
      return;
    }
    try {
      const response = await AuthAPI.githubAuth({
        code: code,
        state: state,
      });
      if (response && response.data) {
        console.log("GitHub authentication successful:", response.data);
        setToken(response.data.body.token); // Assuming the token is in response.data.token
        dispatch(login({ token: response.data.body.token.token })); // Assuming the token is in response.data.token
      }
    } catch (error) {
      console.error("Error during GitHub authentication:", error);
    }
  };

  useEffect(() => {
    githubAuth();
  }, [code, state]);

  return (
    <div className="p-8 text-center text-xl font-semibold">
      Logging you in via GitHub...
      {token && JSON.stringify(token.token)}
    </div>
  );
}
