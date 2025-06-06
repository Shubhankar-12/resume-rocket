import { createSlice } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

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

    // },
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
      setCookie("token", action.payload, {
        // httpOnly: true,
        // sameSite: "strict",
        // secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
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
      if (!state.token) {
        // Check if token in cookie
        const auth_token = getCookie("token");
        if (auth_token) {
          state.token = auth_token;
        }
      }
    },
  },
});

export const { logout, checkTokenExists, login, setSliceToken } =
  authSlice.actions;
export default authSlice.reducer;
