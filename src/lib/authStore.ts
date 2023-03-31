import { readable, writable, type Readable, derived } from 'svelte/store';
import { page } from '$app/stores';
import { invalidateAll } from '$app/navigation';

export type User = {
  id: string;
  name: string;
  image?: string;
};

type AuthStore = Readable<User | null>;
export const authStore = derived(page, (page) => page.data.user) as AuthStore;
