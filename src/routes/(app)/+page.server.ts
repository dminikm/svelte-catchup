import { adminPB } from '$lib/server/pb';
import { z } from 'zod';

const userValidator = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  email: z.string().email(),
});

const postValidator = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  image: z.string(),
  expand: z.object({
    author: userValidator,
  }),
});

const postsValidator = z.array(postValidator);

export async function load() {
  const posts = await adminPB.collection('posts').getFullList({ sort: '-created,id', expand: 'author' });
  const validatedPosts = await postsValidator.parseAsync(posts);
  const remappedPosts = validatedPosts.map((post) => ({
    id: post.id,
    title: post.title,
    created: new Date(post.created),
    author: post.expand.author,
    image: post.image,
  }));

  return {
    posts: remappedPosts,
  };
}
