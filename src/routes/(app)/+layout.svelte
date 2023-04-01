<script>
  import LoginButton from '$lib/header/LoginButton.svelte';
  import { getAuthContext } from '$lib/authContext';
  import Avatar from '$lib/Avatar.svelte';
  import LoginForm from '$lib/LoginForm.svelte';
  import Dialog from '$lib/Dialog.svelte';

  const authStore = getAuthContext();
  $: user = $authStore;

  let loginModalOpen = false;
  const handleLoginClick = () => {
    loginModalOpen = true;
  };
</script>

<header class="border-b border-gray-500 sticky top-0 z-50">
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <a href="/" class="flex items-center">
        <img src="/logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Svelte Catchup</span>
      </a>
      <div class="flex items-center lg:order-2">
        {#if user}
          <a href="/profile#profile">
            <Avatar name={user.name} image={user.image} />
          </a>
        {:else}
          <LoginButton on:click={handleLoginClick} />
        {/if}
      </div>
    </div>
  </nav>
</header>

<slot />

<Dialog open={loginModalOpen} on:close={() => (loginModalOpen = false)}>
  <div class="p-8">
    <LoginForm on:login={() => (loginModalOpen = false)} />
  </div>
</Dialog>
