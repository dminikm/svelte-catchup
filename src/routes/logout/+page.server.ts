import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  cookies.delete('session');
  throw redirect(302, '/');
}

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('session');
    throw redirect(302, '/');
  },
};
