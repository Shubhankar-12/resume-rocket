import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LoaderState {
  isLoading: boolean;
  message: string;
  progress: number | null;
}

const initialState: LoaderState = {
  isLoading: false,
  message: "Loading...",
  progress: null,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = true;
      state.message = action.payload || "Loading...";
      state.progress = null;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setProgress } = loaderSlice.actions;
export default loaderSlice.reducer;
