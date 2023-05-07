import { fail } from '@sveltejs/kit';
import { commentActionValidator, commentValidator } from './types';
import { superValidate, setError } from 'sveltekit-superforms/server';

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

const commentsValidator = z.array(commentValidator);

export async function load({ params }) {
  const post = await adminPB.collection('posts').getOne(params.id, { expand: 'author' });
  const validatedPost = await articleValidator.parseAsync(post);

  // Server API:
  const form = await superValidate(commentActionValidator, {
    id: 'comment',
  });

  const validatedComments = adminPB
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
    form,
    post: remappedPost,
    comments: validatedComments,
  };
}

export const actions = {
  default: async ({ request, locals, params }) => {
    if (!locals.user) {
      throw new Error('You must be signed in to post a comment!');
    }

    const form = await superValidate(request, commentActionValidator, {
      id: 'comment',
    });

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { content } = form.data;

    try {
      let result = await locals.pocketbase.collection('comments').create(
        {
          content,
          author: locals.user.id,
          post: params.id,
        },
        { expand: 'author' }
      );

      let validatedComment = await commentValidator.parseAsync(result);

      return {
        form,
        comment: {
          id: result.id,
          content,
          created: new Date(validatedComment.created),
          author: { ...validatedComment.expand.author },
        },
      };
    } catch (err) {
      return setError(form, 'content', 'An error occured while posting comment!');
    }
  },
};
