<script>
  import LoginButton from '$lib/header/LoginButton.svelte';
  import { authStore } from '$lib/authStore';
  import Avatar from '$lib/Avatar.svelte';

  $: user = $authStore;

  let loginModalOpen = false;
  const handleLoginClick = () => {
    loginModalOpen = true;
  };
</script>

<header>
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <a href="/" class="flex items-center">
        <img src="/logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Svelte Catchup</span>
      </a>
      <div class="flex items-center lg:order-2">
        {#if user}
          <a href="/profile">
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
