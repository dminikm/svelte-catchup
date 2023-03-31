// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type PocketBase from 'pocketbase';
import type User from './lib/authStore';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pocketbase: PocketBase;
      user?: User;
    }

    interface PageData {
      user?: User;
    }

    // interface Platform {}
  }
}

export {};
