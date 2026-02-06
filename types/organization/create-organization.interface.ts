import createOrganizationSchema from "@/lib/schemas/organization/create-organization.schema";
import z from "zod";

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>;
