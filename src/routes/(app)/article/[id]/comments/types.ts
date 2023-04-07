import { z } from 'zod';

export const commentActionValidator = z.object({
  content: z.string().min(10, 'Comment must contain at least 10 characters!'),
});

export const commentValidator = z.object({
  content: z.string(),
  created: z.string(),
  expand: z.object({
    author: z.object({
      id: z.string(),
      username: z.string(),
      avatar: z.string(),
    }),
  }),
});

export type Comment = {
  id: string;
  content: string;
  created: Date;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
};
