"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProviderProps } from "@/types/types";

const AuthProvider = ({ session, children }: AuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
