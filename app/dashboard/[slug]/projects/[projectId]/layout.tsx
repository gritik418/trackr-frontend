import ProjectProvider from "@/components/project/ProjectProvider";
import React from "react";

const ProjectLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string; projectId: string }>;
}) => {
  const { projectId } = await params;
  return <ProjectProvider projectId={projectId}>{children}</ProjectProvider>;
};

export default ProjectLayout;
