import z from "zod";
import updateWorkspaceSchema from "@/lib/schemas/workspace/update-workspace.schema";

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
