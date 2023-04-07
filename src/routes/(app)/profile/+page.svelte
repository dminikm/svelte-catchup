<script lang="ts">
  import scrollTo from '$lib/actions/scrollTo';
  import { getAuthContext } from '$lib/authContext';
  import Avatar from '$lib/Avatar.svelte';
  import LogoutButton from '$lib/profile/LogoutButton.svelte';

  const authStore = getAuthContext();
  $: user = $authStore;
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="flex flex-row mt-4">
  <div class="nav-container">
    <a href="#profile" class="nav-link" use:scrollTo>Profile</a>
    <a href="#settings" class="nav-link" use:scrollTo>Settings</a>
    <a href="#other-settings" class="nav-link" use:scrollTo>Other Settings</a>
  </div>
  <div class="grow flex flex-col gap-12 justify-evenly max-w-screen-md">
    <section id="profile" class="scroll-mt-24">
      <h2 class="section-heading">Profile</h2>

      <div class="flex gap-3 mt-3">
        <Avatar id={user?.id ?? ''} size="md" name={user?.name ?? ''} image={user?.image} />
        <div class="flex flex-col">
          <span class="text-lg font-semibold flex-grow">
            {user?.name}
          </span>
          <LogoutButton />
        </div>
      </div>
    </section>
    <section id="settings" class="scroll-mt-24 h-[10000px]">
      <h2 class="section-heading">Settings</h2>
    </section>
    <section id="other-settings" class="scroll-mt-24 h-64">
      <h2 class="section-heading">Other settings</h2>
    </section>
  </div>
</div>

<style lang="postcss">
  .nav-container {
    @apply hidden md:flex w-40 lg:w-96 flex-col items-center gap-2 transition-colors text-gray-500 sticky self-start top-24 mt-24;
  }

  .nav-link {
    @apply hover:text-gray-800;
  }

  .section-heading {
    @apply text-2xl font-semibold;
  }
</style>
