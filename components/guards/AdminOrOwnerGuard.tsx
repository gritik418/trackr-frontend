import React from "react";

type Props = {
  role: string;
  children: React.ReactNode;
};

const AdminOrOwnerGuard = ({ role, children }: Props) => {
  if (role !== "ADMIN" && role !== "OWNER") {
    return null;
  }

  return <div>{children}</div>;
};

export default AdminOrOwnerGuard;
