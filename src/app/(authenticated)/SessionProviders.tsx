"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const SessionProviders = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
