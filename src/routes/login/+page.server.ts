import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, type Load } from '@sveltejs/kit';
import { loginAction } from './types';
import type { User } from '$lib/authContext';

export const load: PageServerLoad = ({ locals }) => {
  // Redirect away from this page when logged in
  if (locals.pocketbase.authStore.isValid) {
    throw redirect(302, '/');
  }
};

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();
    const formId = formData.get('formId');

    const data = Object.fromEntries(formData);
    let result = loginAction.safeParse(data);

    if (!result.success) {
      return fail(400, {
        formId,
        values: { username: formData.get('username') },
        errors: result.error.formErrors.fieldErrors,
      });
    }

    const { username, password, redirectTo } = result.data;

    let user: User | null = null;
    try {
      let result = await locals.pocketbase.collection('users').authWithPassword(username, password);
      user = { id: result.record.id, name: result.record.username, image: result.record.avatar };

      // Set cookies on success
      cookies.set('session', locals.pocketbase.authStore.exportToCookie());
    } catch (err) {
      return fail(400, {
        formId,
        values: { username },
        errors: {
          password: 'Invalid username or password',
        },
      });
    }

    // If we have a redirect, redirect to that page
    if (redirectTo) {
      throw redirect(302, redirectTo);
    }

    return { formId, success: true, user };
  },
} satisfies Actions;
