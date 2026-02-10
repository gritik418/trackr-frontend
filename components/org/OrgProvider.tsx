"use client";
import { useGetOrganizationDetailsQuery } from "@/features/organization/organization.api";
import { notFound, usePathname, useRouter } from "next/navigation";
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
  const ownerOnlyOrgRoutes = [`/org/${slug}/billing`];
  const adminOrOwnerOnlyOrgRoutes = [
    `/org/${slug}/settings`,
    `/org/${slug}/logs`,
  ];

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

  if (
    ownerOnlyOrgRoutes.includes(pathname) &&
    (!data?.organization ||
      !data.organization.role ||
      data?.organization.role !== "OWNER")
  ) {
    return notFound();
  }

  if (
    adminOrOwnerOnlyOrgRoutes.includes(pathname) &&
    (!data?.organization ||
      !data.organization.role ||
      (data?.organization.role !== "OWNER" &&
        data?.organization.role !== "ADMIN"))
  ) {
    return notFound();
  }

  return <div>{children}</div>;
};

export default OrgProvider;
