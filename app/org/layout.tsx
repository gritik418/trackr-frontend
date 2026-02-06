import OrgProvider from "@/components/org/OrgProvider";
import React from "react";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return <OrgProvider>{children}</OrgProvider>;
};

export default OrganizationLayout;
