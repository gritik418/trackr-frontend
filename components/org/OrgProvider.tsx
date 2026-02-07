"use client";
import { useGetOrganizationDetailsQuery } from "@/features/organization/organization.api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import OrgContextLoading from "./OrgContextLoading";

const OrgProvider = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, error } = useGetOrganizationDetailsQuery(slug, {
    skip: !slug,
    refetchOnMountOrArgChange: true,
  });

  const publicOrgRoutes = ["/org", "/org/create"];

  useEffect(() => {
    if (
      !isLoading &&
      (error || !data?.organization) &&
      !publicOrgRoutes.includes(pathname)
    ) {
      router.replace("/org");
    }
  }, [isLoading, error, data, pathname, router]);

  if (isLoading) {
    return <OrgContextLoading />;
  }

  if ((error || !data?.organization) && !publicOrgRoutes.includes(pathname)) {
    return null;
  }

  return <div>{children}</div>;
};

export default OrgProvider;
