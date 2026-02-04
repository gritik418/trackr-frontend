import z from "zod"
import forgotPasswordSchema from "@/lib/validations/auth/forgot-password.schema"
import resetPasswordSchema from "@/lib/validations/auth/reset-password.schema"

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>
