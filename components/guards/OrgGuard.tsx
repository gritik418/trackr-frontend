"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectOrganization } from "@/features/organization/organization.slice";

type OrgGuardProps = {
  children: ReactNode;
};

export default function OrgGuard({ children }: OrgGuardProps) {
  const organization = useSelector(selectOrganization);
  const router = useRouter();

  useEffect(() => {
    if (!organization) {
      router.replace("/org");
    }
  }, [organization, router]);

  if (!organization) {
    return null;
  }

  return <>{children}</>;
}
