import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import { deleteCookie } from "cookies-next";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null as string | null,
    isLoggedIn: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      deleteCookie("token");
    },

    login: (state, action) => {
      console.log("Login action", action.payload);
      if (!action.payload) {
        // Redirect to login
        return;
      }
      const decodedToken: any = jwt.decode(action.payload);
      if (!decodedToken || !decodedToken.user) {
        console.error("Invalid token payload", action.payload);
        return;
      }

      state.user = decodedToken.user;
      state.token = action.payload;
      state.isLoggedIn = true;
      console.log("Login state", state);
    },

    setSliceToken: (state, action) => {
      console.log("Hi aciton");
      console.log("token Slice Update", action.payload);
      if (!action.payload) {
        // Redirect to login
      }
      let tokenPayload = JSON.parse(
        Buffer.from(action.payload.split(".")[1], "base64").toString()
      );
      console.log("tokenPayload", tokenPayload);

      state.user = tokenPayload.user;
      state.token = action.payload;
    },

    checkTokenExists: (state: any) => {
      // Token is now managed via httpOnly cookies and /api/me route.
      // This action is a no-op kept for backwards compatibility.
    },
  },
});

export const { logout, checkTokenExists, login, setSliceToken } =
  authSlice.actions;
export default authSlice.reducer;
