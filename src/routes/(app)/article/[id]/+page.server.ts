import { adminPB } from '$lib/server/pb';
import { z } from 'zod';

const userValidator = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  email: z.string().email(),
});

const articleValidator = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  created: z.string(),
  image: z.string(),
  expand: z.object({
    author: userValidator,
  }),
});

const commentValidator = z.object({
  id: z.string(),
  content: z.string(),
  created: z.string(),
  expand: z.object({
    author: userValidator,
  }),
});

const commentsValidator = z.array(commentValidator);

function delay<T>(prom: Promise<T>, delayMs: number = 1000): Promise<T> {
  return new Promise((resolve, reject) => {
    prom.then((e) => setTimeout(() => resolve(e), delayMs)).catch((e) => setTimeout(() => reject(e), delayMs));
  });
}

export async function load({ params }) {
  const post = await adminPB.collection('posts').getOne(params.id, { expand: 'author' });
  const validatedPost = await articleValidator.parseAsync(post);

  const validatedComments = delay(
    adminPB
      .collection('comments')
      .getFullList({ filter: `post = "${post.id}"`, expand: 'author' })
      .then(commentsValidator.parseAsync)
      .then((comments) =>
        comments.map((comment) => ({
          id: comment.id,
          content: comment.content,
          created: new Date(comment.created),
          author: comment.expand.author,
        }))
      ),
    5000
  );

  const remappedPost = {
    id: post.id,
    title: validatedPost.title,
    created: new Date(validatedPost.created),
    author: validatedPost.expand.author,
    image: validatedPost.image,
    content: validatedPost.content,
  };

  return {
    post: remappedPost,
    streamed: {
      comments: validatedComments,
    },
  };
}
