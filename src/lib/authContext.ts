import { derived, writable, type Writable } from 'svelte/store';
import { page } from '$app/stores';
import { getContext, setContext } from 'svelte';

const AUTH_CONTEXT_KEY = Symbol();

export type User = {
  id: string;
  name: string;
  image?: string;
};

export type AuthStore = Writable<User | null>;

export function setAuthContext() {
  const userStore = derived(page, (page) => page.data.user);
  const writableUserStore = writable<User | null>(null, (set) => userStore.subscribe((value) => set(value ?? null)));

  setContext(AUTH_CONTEXT_KEY, writableUserStore);
}

export function getAuthContext() {
  return getContext(AUTH_CONTEXT_KEY) as AuthStore;
}
