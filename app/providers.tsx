"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { theme } from "./theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <CssBaseline />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
