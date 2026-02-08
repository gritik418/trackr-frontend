import { z } from "zod";

const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
  iconUrl: z.url("Invalid icon URL").or(z.literal("")).optional(),
});

export default updateWorkspaceSchema;
