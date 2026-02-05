import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be less than 20 characters')
    .regex(/[A-Z]/, 'One uppercase letter required')
    .regex(/[a-z]/, 'One lowercase letter required')
    .regex(/[0-9]/, 'One number required')
    .regex(/[\W_]/, 'One special character required'),
  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"],
});

export default signupSchema