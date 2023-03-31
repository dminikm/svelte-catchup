<script lang="ts">
  import { loginAction } from '../routes/login/types';
  import Button from './Button.svelte';
  import Form from './Form.svelte';
  import TextField from './TextField.svelte';
  import { applyAction, type SubmitFunction } from '$app/forms';
  import { page } from '$app/stores';

  $: pagePath = $page.url.pathname;
  $: pageQuery = $page.url.searchParams.get('redirectTo');

  const loginEnhancer: SubmitFunction = () => {
    return async ({ result }) => {
      // Apply actions on success or failure
      if (result.type === 'success' || result.type === 'failure') {
        return await applyAction(result);
      }

      // Redirect only when on the login page
      if (result.type === 'redirect' && pagePath.startsWith('/login')) {
        return await applyAction(result);
      }
    };
  };
</script>

<Form
  id="login"
  method="POST"
  action="/login"
  schema={loginAction}
  enhance={loginEnhancer}
  class="loginForm"
  let:values
  let:errors
  let:onInput
>
  <!-- Redirect from the login page -->
  {#if pagePath.startsWith('/login')}
    <input type="hidden" name="redirectTo" value={pageQuery} />
  {/if}

  <TextField
    id="username"
    name="username"
    label="Username"
    value={values.username}
    error={errors.username}
    on:input={onInput}
  />

  <TextField
    id="password"
    name="password"
    label="Password"
    value={values.password}
    error={errors.password}
    on:input={onInput}
  />

  <Button width="full" submit>Log In</Button>
</Form>

<style lang="postcss">
  :global(.loginForm > *) {
    @apply my-2;
  }

  :global(.loginForm) {
    min-width: 400px;
  }
</style>
