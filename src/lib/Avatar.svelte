<script lang="ts" context="module">
  export type Size = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
  import { PUBLIC_BACKEND_URL } from '$env/static/public';

  export let name: string;
  export let image: string | undefined | null = undefined;
  export let size: Size = 'sm';

  $: initials = name[0].toUpperCase();
</script>

<div
  class="relative inline-flex items-center justify-center {size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
>
  <span class="font-medium text-gray-600 dark:text-gray-300">{initials}</span>
  {#if image}
    <img
      class="absolute left-0 top-0 {size}"
      src="{PUBLIC_BACKEND_URL}/api/files/_pb_users_auth_/1qnnmtfj19yzp83/{image}"
      alt={name}
    />
  {/if}
</div>

<style>
  .sm {
    @apply w-10 h-10;
  }

  .md {
    @apply w-20 h-20;
  }

  .lg {
    @apply w-40 h-40;
  }
</style>
