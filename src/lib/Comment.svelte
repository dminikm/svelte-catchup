<script lang="ts">
  import Avatar from './Avatar.svelte';

  export let id: string;
  export let authorId: string;
  export let name: string;
  export let image: string | undefined | null = undefined;
  export let content: string;
  export let created: Date;
</script>

<article class="w-full">
  <!-- svelte-ignore a11y-missing-attribute -->
  <div>
    <a rel="author">
      <Avatar id={authorId} {name} {image} />
      <span class="ml-4">{name}</span>
    </a>
    <time class="float-right">{created.toLocaleString()}</time>
  </div>

  <p>{content}</p>
</article>

<style lang="postcss">
  article {
    @apply flex flex-col gap-5 p-5;
  }
</style>
