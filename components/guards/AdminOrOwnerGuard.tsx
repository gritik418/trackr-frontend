import React from "react";

type Props = {
  role: string;
  children: React.ReactNode;
  className?: string;
};

const AdminOrOwnerGuard = ({ role, children, className }: Props) => {
  if (role !== "ADMIN" && role !== "OWNER") {
    return null;
  }

  return <div className={className}>{children}</div>;
};

export default AdminOrOwnerGuard;
