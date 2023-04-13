<script lang="ts">
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Avatar from '$lib/Avatar.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  const getSource = (articleId: string, url: string) => {
    return `${PUBLIC_BACKEND_URL}/api/files/3j0nl4c9ume5i14/${articleId}/${url}`;
  };
</script>

<svelte:head>
  <title>Svelte Catchup</title>
</svelte:head>

<h1 class="font-bold text-3xl m-6">Latests Posts:</h1>

<main class="flex flex-row flex-wrap gap-6 p-12">
  {#each data.posts as post (post.id)}
    <article class="border border-gray-500 w-72 max-w-sm flex flex-col gap-2">
      <img src={getSource(post.id, post.image)} alt={post.title} class="col-span-2 w-full max-h-64 object-contain" />

      <h2 class="font-semibold text-xl col-span-2 px-2">
        <a href="/article/{post.id}">{post.title}</a>
      </h2>

      <div class="flex flex-row justify-between p-2">
        <span>
          <Avatar id={post.author.id} size="xs" name={post.author.username} image={post.author.avatar} />
          {post.author.username}
        </span>

        <span class="text-gray-400 font-medium">
          {post.created.toDateString()}
        </span>
      </div>
    </article>
  {/each}
</main>

<style lang="postcss">
  article {
    @apply relative;
  }

  a::before {
    content: '';
    @apply absolute left-0 right-0 top-0 bottom-0 z-10;
  }
</style>
