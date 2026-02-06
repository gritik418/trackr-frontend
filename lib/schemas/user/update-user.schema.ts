import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30).regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});

export default updateUserSchema;
