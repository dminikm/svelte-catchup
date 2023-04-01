import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
  const client = new PocketBase(PUBLIC_BACKEND_URL);
  event.locals.pocketbase = client;

  // Check for cookies
  const session = event.cookies.get('session');
  if (!session) {
    return await resolve(event);
  }

  // If we have a session, authenticate with pocketbase
  client.authStore.loadFromCookie(session);

  try {
    // Check validity on server
    if (client.authStore.isValid) {
      let response = await client.collection('users').authRefresh();

      event.locals.user = { id: response.record.id, name: response.record.username, image: response.record.avatar };
    }
  } catch (_) {
    console.log('Failed to auth!');
  } finally {
    // If we have an invalid session
    // reset state and cookies
    if (!client.authStore.isValid) {
      client.authStore.clear();
      event.cookies.delete('session');
    }

    // Continue with the rest of the request
    return await resolve(event);
  }
};
