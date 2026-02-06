import z from "zod";
import updateOrganizationSchema from "@/lib/schemas/organization/update-organization.schema";

export type UpdateOrganizationDto = z.infer<typeof updateOrganizationSchema>;
