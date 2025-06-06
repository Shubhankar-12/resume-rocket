import { createSlice } from "@reduxjs/toolkit";

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
      if (!action.payload.token) {
        // Redirect to login
        return;
      }
      let tokenPayload = JSON.parse(
        Buffer.from(action.payload.token.split(".")[1], "base64").toString()
      );
      state.user = tokenPayload.user;

      state.token = action.payload.token;
      state.isLoggedIn = true;

      setCookie("token", action.payload.token, {
        // httpOnly: true,
        // sameSite: "strict",
        // secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      console.log(state.token, "state");
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
      state.user = tokenPayload.employee;

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
