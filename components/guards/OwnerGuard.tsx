import React from "react";

type Props = {
  role: string;
  children: React.ReactNode;
};

const OwnerGuard = ({ role, children }: Props) => {
  if (role !== "OWNER") {
    return null;
  }
  return <div>{children}</div>;
};

export default OwnerGuard;
