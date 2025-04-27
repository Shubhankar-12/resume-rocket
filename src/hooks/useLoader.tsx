"use client";

import { useAppDispatch } from "@/lib/store/slices/hooks";
import { showLoader, hideLoader, setProgress } from "@/lib/store/slices/loader";

export function useLoader() {
  const dispatch = useAppDispatch();

  const show = (message?: string) => {
    dispatch(showLoader(message));
  };

  const hide = () => {
    dispatch(hideLoader());
  };

  const updateProgress = (progress: number) => {
    dispatch(setProgress(progress));
  };

  return { show, hide, updateProgress };
}
