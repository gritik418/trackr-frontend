import { z } from "zod";
import emailVerificationSchema from "@/lib/schemas/auth/email-verification.schema";

export type EmailVerificationDto = z.infer<typeof emailVerificationSchema>;
