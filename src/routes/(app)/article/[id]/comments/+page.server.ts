import { fail } from '@sveltejs/kit';
import { commentActionValidator, commentValidator } from './types';

export const actions = {
  default: async ({ request, locals, params }) => {
    if (!locals.user) {
      throw new Error('You must be signed in to post a comment!');
    }

    const formData = await request.formData();
    const formId = formData.get('formId');

    const data = Object.fromEntries(formData);
    let result = commentActionValidator.safeParse(data);

    if (!result.success) {
      return fail(400, {
        formId,
        values: { content: formData.get('content') },
        errors: result.error.formErrors.fieldErrors,
      });
    }

    const { content } = result.data;

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
        formId,
        successs: true,
        comment: {
          id: result.id,
          content,
          created: new Date(validatedComment.created),
          author: { ...validatedComment.expand.author },
        },
      };
    } catch (err) {
      return fail(400, {
        formId,
        values: { content },
        errors: {
          content: 'An error occured while posting comment!',
        },
      });
    }
  },
};
