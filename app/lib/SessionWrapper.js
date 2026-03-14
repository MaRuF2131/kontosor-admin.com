"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { setUserInterceptor } from "@/lib/axios";

function AxiosInterceptor({ children }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      setUserInterceptor(session.user.token);
    }
  }, [session]);

  return children;
}

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      <AxiosInterceptor>{children}</AxiosInterceptor>
    </SessionProvider>
  );
}