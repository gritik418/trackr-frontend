import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
});

export default forgotPasswordSchema