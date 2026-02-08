"use client";

import { useGetWorkspaceDetailsQuery } from "@/features/workspace/workspace.api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import DashboardContextLoading from "./DashboardContextLoading";

const DashboardProvider = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => {
  const router = useRouter();
  const { data, isLoading, error } = useGetWorkspaceDetailsQuery(slug, {
    skip: !slug,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isLoading && (error || !data?.workspace)) {
      router.replace("/");
    }
  }, [isLoading, error, data, router]);

  if (isLoading) {
    return <DashboardContextLoading />;
  }

  if (error || !data?.workspace) {
    return null;
  }

  return <>{children}</>;
};

export default DashboardProvider;
