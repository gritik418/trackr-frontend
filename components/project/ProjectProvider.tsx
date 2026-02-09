"use client";
import { useGetProjectByIdQuery } from "@/features/project/project.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import React from "react";
import { useSelector } from "react-redux";
import ProjectLoading from "./ProjectLoading";
import ProjectNotFound from "./ProjectNotFound";

const ProjectProvider = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) => {
  const workspace = useSelector(selectWorkspace);
  const { data, isLoading } = useGetProjectByIdQuery(
    {
      projectId,
      workspaceId: workspace?.id || "",
    },
    {
      skip: !workspace?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading) {
    return <ProjectLoading />;
  }

  if (!data) {
    return <ProjectNotFound />;
  }

  return <>{children}</>;
};

export default ProjectProvider;
