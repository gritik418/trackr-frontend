import z from "zod";
import forgotPasswordSchema from "@/lib/schemas/auth/forgot-password.schema";
import resetPasswordSchema from "@/lib/schemas/auth/reset-password.schema";

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
