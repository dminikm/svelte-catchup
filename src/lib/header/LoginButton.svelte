<script>
  import { page } from '$app/stores';
</script>

<a href="/login?redirectTo={$page.url.pathname}" on:click|preventDefault>Log in</a>

<style>
  a {
    @apply text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4
    focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2
    lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800;
  }
</style>
