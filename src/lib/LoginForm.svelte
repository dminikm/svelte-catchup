<script lang="ts">
  import { loginAction } from '../routes/login/types';
  import Button from './Button.svelte';
  import TextField from './TextField.svelte';
  import { page } from '$app/stores';
  import { createEventDispatcher } from 'svelte';
  import { getAuthContext, type User } from './authContext';
  import type { Validation } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';

  export let data: Validation<typeof loginAction>;
  let dispatch = createEventDispatcher();
  const authStore = getAuthContext();

  $: pagePath = $page.url.pathname;
  $: pageQuery = $page.url.searchParams.get('redirectTo') ?? $page?.form?.redirectTo;

  const { form, errors, enhance } = superForm(data, {
    id: 'login',
    validators: loginAction,
    validationMethod: 'oninput',
    defaultValidator: 'keep',
    resetForm: true,
    onResult({ result }) {
      if (result.type == 'success') {
        dispatchLogin(result?.data?.user);
      }
    },
  });

  const dispatchLogin = (user: User) => {
    authStore.set(user);
    dispatch('login');
  };
</script>

<form method="POST" action="/login" class="loginForm" use:enhance>
  <!-- Redirect from the login page -->
  {#if pagePath.startsWith('/login')}
    <input type="hidden" name="redirectTo" value={pageQuery ?? '/'} />
  {/if}

  <TextField id="username" name="username" label="Username" bind:value={$form.username} error={$errors.username?.[0]} />

  <TextField id="password" name="password" label="Password" bind:value={$form.password} error={$errors.password?.[0]} />

  <Button width="full" submit>Log In</Button>
</form>

<style lang="postcss">
  :global(.loginForm > *) {
    @apply my-2;
  }

  .loginForm {
    min-width: 400px;
  }
</style>
