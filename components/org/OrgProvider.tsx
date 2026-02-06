"use client";
import { useGetOrganizationDetailsQuery } from "@/features/organization/organization.api";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import OrgContextLoading from "./OrgContextLoading";

const OrgProvider = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => {
  const pathname = usePathname();
  const { data, isLoading, error } = useGetOrganizationDetailsQuery(slug, {
    skip: !slug,
  });

  const publicOrgRoutes = ["/org", "/org/create"];

  if (isLoading) {
    return <OrgContextLoading />;
  }

  if (error && !publicOrgRoutes.includes(pathname)) {
    return redirect("/org");
  }

  if (!data?.organization && !publicOrgRoutes.includes(pathname)) {
    return redirect("/org");
  }
  return <div>{children}</div>;
};

export default OrgProvider;
