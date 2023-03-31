import { z } from 'zod';

export const loginAction = z.object({
  username: z.string().min(1, 'Username must not be empty'),
  password: z.string().min(1, 'Password must not be empty'),
  redirectTo: z.string().optional(),
});
