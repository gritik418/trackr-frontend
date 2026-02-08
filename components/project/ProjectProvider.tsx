"use client";
import { useGetProjectByIdQuery } from "@/features/project/project.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import React from "react";
import { useSelector } from "react-redux";

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
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Project not found</div>;
  }

  return <div>{children}</div>;
};

export default ProjectProvider;
