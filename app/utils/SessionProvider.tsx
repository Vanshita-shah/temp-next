"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProviderProps } from "@/types/types";
import SessionExpirationPopup from "@/components/modal/SessionExpirationPopup";

const AuthProvider = ({ session, children }: AuthProviderProps) => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    if (session) {
      const expirationTime = session.expire_time - Date.now();

      // Handle negative expiration time
      if (expirationTime <= 0) {
        setIsSessionExpired(true);
        return;
      }

      // Set a timeout with buffer to avoid race conditions in session expiration
      const timeout = setTimeout(() => {
        setIsSessionExpired(true);
      }, expirationTime - 100000); // Buffer of 100 seconds

      return () => clearTimeout(timeout);
    }

    setIsSessionExpired(false);
  }, [session]);

  return (
    <>
      {isSessionExpired && <SessionExpirationPopup />}
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
};

export default AuthProvider;
