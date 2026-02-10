import React from "react";

type Props = {
  role: string;
  children: React.ReactNode;
  className?: string;
};

const OwnerGuard = ({ role, children, className }: Props) => {
  if (role !== "OWNER") {
    return null;
  }
  return <div className={className}>{children}</div>;
};

export default OwnerGuard;
