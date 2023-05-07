<script lang="ts">
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Comment from '$lib/Comment.svelte';
  import CommentForm from '$lib/CommentForm.svelte';
  import { onMount } from 'svelte';
  import type { PageData, Snapshot } from './$types';
  import type { Comment as IComment } from './comments/types';

  export let data: PageData;
  $: ({ form, post, streamed } = data);

  // Start with a link to comments.
  // Then when client side JS kicks in
  // automatically show a loading indicator.
  let loadingComments = false;
  onMount(() => {
    loadingComments = true;
  });

  const getSource = (articleId: string, url: string) => {
    return `${PUBLIC_BACKEND_URL}/api/files/3j0nl4c9ume5i14/${articleId}/${url}`;
  };

  // Remember old comments
  let oldComments: IComment[] = [];
  const rememberComments = async (...args: any[]) => {
    oldComments = await streamed.comments;
  };

  $: rememberComments(streamed.comments);

  let optimisticComments: IComment[] = [];
  const handleComment = (ev: CustomEvent<{ comment: IComment }>) => {
    optimisticComments = [ev.detail.comment, ...optimisticComments];
  };

  const invalidateOptimisticComments = (...args: any[]) => {
    optimisticComments = [];
  };

  // Invalidate optimistic comments (when old comments get updated!)
  $: invalidateOptimisticComments(oldComments);

  let commentSnapshot: Snapshot | undefined;
  export const snapshot = {
    capture() {
      return commentSnapshot?.capture();
    },
    restore(snapshot) {
      return commentSnapshot?.restore(snapshot);
    },
  };
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<article class="article-container max-w-2xl m-auto py-3 px-6">
  <h1>{post.title}</h1>
  <img alt={post.title} src={getSource(post.id, post.image)} />

  {@html post.content}

  <CommentForm data={form} postId={post.id} on:comment={handleComment} bind:snapshot={commentSnapshot} />

  <section>
    <h1>Comments</h1>
    <!-- Comments -->
    {#await streamed.comments}
      {#if oldComments.length > 0}
        {#each oldComments as comment (comment.id)}
          <Comment
            id={comment.id}
            authorId={comment.author.id}
            name={comment.author.username}
            image={comment.author.avatar}
            content={comment.content}
            created={comment.created}
          />
        {/each}
      {:else if !loadingComments}
        <a class="comment-loading" href={`/article/${post.id}/comments`}>Load comments</a>
      {:else}
        <div class="comment-loading cursor-progress">Loading comments ...</div>
      {/if}
    {:then comments}
      {#each comments as comment (comment.id)}
        <Comment
          id={comment.id}
          authorId={comment.author.id}
          name={comment.author.username}
          image={comment.author.avatar}
          content={comment.content}
          created={comment.created}
        />
      {/each}
    {/await}

    {#each optimisticComments as comment (comment.id)}
      <Comment
        id={comment.id}
        authorId={comment.author.id}
        name={comment.author.username}
        image={comment.author.avatar}
        content={comment.content}
        created={comment.created}
      />
    {/each}
  </section>
</article>

<style lang="postcss">
  .article-container :global(h1) {
    @apply font-bold text-3xl my-3;
  }

  .article-container :global(h2) {
    @apply font-semibold text-xl my-2;
  }

  .comment-loading {
    @apply flex bg-red-500 text-white font-bold text-xl w-full h-24 justify-center items-center;
  }
</style>
