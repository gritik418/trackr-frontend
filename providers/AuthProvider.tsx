"use client";

import { useAuth } from "@/features/auth/auth.hooks";
import { User } from "@/types/user/user.interface";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

interface AuthContextType {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const user = data?.user;
  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    isAuthenticated,
  };

  const isPublicPath =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify-email" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/";

  useEffect(() => {
    if (!isLoading && !user && !isPublicPath) {
      router.push("/login");
    }
    if (!isLoading && user && isPublicPath) {
      router.push("/");
    }
  }, [user, isLoading, isPublicPath, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined || !context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};
