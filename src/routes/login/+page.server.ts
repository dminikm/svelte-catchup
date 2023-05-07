import type { Actions, PageServerLoad } from './$types';
import { fail, redirect, type Load } from '@sveltejs/kit';
import { loginAction } from './types';
import type { User } from '$lib/authContext';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = ({ locals }) => {
  // Redirect away from this page when logged in
  if (locals.pocketbase.authStore.isValid) {
    throw redirect(302, '/');
  }
};

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const form = await superValidate(request, loginAction, { id: 'login' });
    if (!form.valid) return fail(400, { form });

    const { username, password, redirectTo } = form.data;

    let user: User | null = null;
    try {
      let result = await locals.pocketbase.collection('users').authWithPassword(username, password);
      user = { id: result.record.id, name: result.record.username, image: result.record.avatar };

      // Set cookies on success
      cookies.set('session', locals.pocketbase.authStore.exportToCookie());
    } catch (err) {
      return setError(form, 'password', 'Invalid username or password');
    }

    // If we have a redirect, redirect to that page
    if (redirectTo) {
      throw redirect(302, redirectTo);
    }

    return { form, user };
  },
} satisfies Actions;
