import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <DashboardLayout slug={slug}>{children}</DashboardLayout>;
}
