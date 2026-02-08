import createProjectSchema from "@/lib/schemas/project/create-project.schema";
import z from "zod";

export type CreateProjectDto = z.infer<typeof createProjectSchema>;
