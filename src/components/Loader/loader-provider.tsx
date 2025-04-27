"use client";

import type React from "react";
import { FullPageLoader } from "./loader";
import StoreProvider from "../StoreProvider";

interface LoaderProviderProps {
  children: React.ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  return (
    <StoreProvider>
      {children}
      <FullPageLoader />
    </StoreProvider>
  );
}
