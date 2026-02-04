import { z } from 'zod';
import emailVerificationSchema from '@/lib/validations/auth/email-verification.schema';

export type EmailVerificationDto = z.infer<typeof emailVerificationSchema>;
