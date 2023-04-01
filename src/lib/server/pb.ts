import { PRIVATE_BACKEND_EMAIL, PRIVATE_BACKEND_PASSWORD } from '$env/static/private';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const adminPB = new PocketBase(PUBLIC_BACKEND_URL);
adminPB.admins.authWithPassword(PRIVATE_BACKEND_EMAIL, PRIVATE_BACKEND_PASSWORD);
