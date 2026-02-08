import React from "react";
import { WorkspaceLayout } from "@/components/dashboard/WorkspaceLayout";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) return null;

  return <WorkspaceLayout slug={slug}>{children}</WorkspaceLayout>;
}
