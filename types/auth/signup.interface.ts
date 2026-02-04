import { z } from 'zod';
import signupSchema from '@/lib/validations/auth/signup.schema';

export type SignupDto = z.infer<typeof signupSchema>;
