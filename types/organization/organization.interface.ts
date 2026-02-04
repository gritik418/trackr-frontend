import createOrganizationSchema from "@/lib/validations/organization/create-organization.schema";
import z from "zod";

export type CreateOrganizationDto = z.infer<typeof createOrganizationSchema>