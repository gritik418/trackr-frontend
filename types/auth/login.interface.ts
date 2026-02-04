import { z } from 'zod';
import loginSchema from '@/lib/validations/auth/login.schema';

export type LoginDto = z.infer<typeof loginSchema>;
