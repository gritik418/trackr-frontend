import { z } from "zod";
import signupSchema from "@/lib/schemas/auth/signup.schema";

export type SignupDto = z.infer<typeof signupSchema>;
