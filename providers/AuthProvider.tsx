"use client";

import AuthContextError from "@/components/auth/AuthContextError";
import AuthContextLoading from "@/components/auth/AuthContextLoading";
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
  const { data, isError, isLoading, error } = useAuth();
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
    if (isLoading) return;

    if (isError && !isPublicPath) {
      router.push("/login");
      return;
    }

    if (user && isPublicPath) {
      router.push("/");
      return;
    }

    if (!user && !isPublicPath) {
      router.push("/login");
      return;
    }
  }, [user, isLoading, isError, isPublicPath, router]);

  if (isLoading && !isPublicPath) return <AuthContextLoading />;

  if (isError && !isPublicPath) return <AuthContextError />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined || !context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};
