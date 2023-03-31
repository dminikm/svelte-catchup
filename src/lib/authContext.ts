import { writable, type Writable } from 'svelte/store';
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
  setContext(
    AUTH_CONTEXT_KEY,
    writable(null, (set) => page.subscribe((value) => set(value.data.user)))
  );
}

export function getAuthContext() {
  return getContext(AUTH_CONTEXT_KEY) as AuthStore;
}
