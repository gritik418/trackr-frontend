import { api } from "@/lib/api";
import { CreateOrganizationDto } from "@/types/organization/create-organization.interface";

export const createOrganization = async (data: CreateOrganizationDto) => {
  const response = await api.post("/organizations", data);
  return response.data;
};
