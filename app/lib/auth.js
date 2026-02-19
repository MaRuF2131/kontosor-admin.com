"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "./axios";

export const useAdminAuth = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/admin/me");
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading && !data?.user) {
      router.push("/admin/login");
    }
  }, [data, isLoading]);

  return { user: data?.user, isLoading };
};
