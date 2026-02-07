import z from "zod";
import createWorkspaceSchema from "@/lib/schemas/workspace/create-workspace.schema";

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
