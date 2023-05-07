<script lang="ts">
  import LoginButton from '$lib/header/LoginButton.svelte';
  import { getAuthContext } from '$lib/authContext';
  import Avatar from '$lib/Avatar.svelte';
  import LoginForm from '$lib/LoginForm.svelte';
  import Dialog from '$lib/Dialog.svelte';
  import { createPopperActions } from 'svelte-popperjs';
  import LogoutButton from '$lib/profile/LogoutButton.svelte';
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import type { PageData } from './$types';

  export let data: PageData;

  const authStore = getAuthContext();
  $: user = $authStore;

  let loginModalOpen = false;
  const handleLoginClick = () => {
    loginModalOpen = true;
  };

  let avatarMenuOpen = false;
  let avatarMenuTimeout: number | null = null;
  const [avatarMenuRef, avatarMenuContent] = createPopperActions({});

  const handleOpenAvatarMenu = () => {
    if (avatarMenuTimeout) {
      clearTimeout(avatarMenuTimeout);
      avatarMenuTimeout = null;
    }

    avatarMenuOpen = true;
  };

  const handleCloseAvatarMenu = () => {
    if (avatarMenuTimeout) {
      clearTimeout(avatarMenuTimeout);
      avatarMenuTimeout = null;
    }

    avatarMenuTimeout = setTimeout(() => (avatarMenuOpen = false), 100);
  };
</script>

<header class="border-b border-gray-500 sticky top-0 z-40">
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <a href="/" class="flex items-center">
        <img src="/logo.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Svelte Catchup</span>
      </a>
      <div class="flex items-center lg:order-2">
        {#if user}
          <a
            href="/profile#profile"
            use:avatarMenuRef
            on:mouseenter={handleOpenAvatarMenu}
            on:mouseleave={handleCloseAvatarMenu}
          >
            <Avatar id={user.id} name={user.name} image={user.image} />
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
    <LoginForm data={data.loginForm} on:login={() => (loginModalOpen = false)} />
  </div>
</Dialog>

{#if avatarMenuOpen && user}
  <div
    use:avatarMenuContent
    class="tooltip z-50 bg-white flex flex-col p-4 rounded-sm items-center border border-gray-500"
    on:mouseenter={handleOpenAvatarMenu}
    on:mouseleave={handleCloseAvatarMenu}
    transition:fade={{ duration: 200, easing: cubicOut }}
  >
    <div data-popper-arrow class="arrow" />

    <a href="/profile#profile" class="link-button">Profile</a>
    <a href="/profile#settings" class="link-button">Settings</a>

    <div class="w-full border-b my-2 border-gray-500" />

    <LogoutButton />
  </div>
{/if}

<style lang="postcss">
  .link-button {
    @apply text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4
    focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2
    lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800;
  }

  .arrow {
    top: -5.6px;
  }

  .arrow,
  .arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;

    @apply border-l border-t border-gray-500;
  }

  .arrow {
    visibility: hidden;
  }

  .arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
</style>
