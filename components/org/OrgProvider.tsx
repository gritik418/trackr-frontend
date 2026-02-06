"use client";
import { useGetOrganizationDetailsQuery } from "@/features/organization/organization.api";
import { useParams } from "next/navigation";
import React from "react";

const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const { isLoading, error } = useGetOrganizationDetailsQuery(
    params.slug as string,
    {
      skip: !params.slug,
    },
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">Error</div>
    );
  }
  return <div>{children}</div>;
};

export default OrgProvider;
