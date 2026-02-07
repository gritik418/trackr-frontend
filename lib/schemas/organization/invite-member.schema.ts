import { z } from "zod";

const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z.enum(["ADMIN", "MEMBER"], {
    required_error: "Role is required",
  }),
});

export default inviteMemberSchema;
