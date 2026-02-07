import { z } from "zod";

const inviteMemberSchema = z.object({
  email: z.email("Please enter a valid email address"),
  role: z.enum(["ADMIN", "MEMBER"]).default("MEMBER").optional(),
});

export default inviteMemberSchema;
