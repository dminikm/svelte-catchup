import { superValidate } from 'sveltekit-superforms/client';
import { loginAction } from '../login/types.js';

export async function load() {
  const form = await superValidate(loginAction, { id: 'login' });
  return { loginForm: form };
}
