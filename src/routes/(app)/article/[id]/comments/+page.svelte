<script lang="ts">
  import Comment from '$lib/Comment.svelte';
  import CommentForm from '$lib/CommentForm.svelte';
  import type { PageData } from './$types';
  import type { Comment as IComment } from './types';

  export let data: PageData;
  $: ({ post, comments } = data);

  let optimisticComments: IComment[] = [];
  const handleComment = (ev: CustomEvent<{ comment: IComment }>) => {
    optimisticComments = [ev.detail.comment, ...optimisticComments];
  };

  const invalidateOptimisticComments = (...args: any[]) => {
    optimisticComments = [];
  };

  // Invalidate optimistic comments
  $: invalidateOptimisticComments(comments);
</script>

<svelte:head>
  <title>{post.title} - Comments</title>
</svelte:head>

<article class="article-container max-w-2xl m-auto py-3 px-6">
  <h1 class="font-bold text-3xl my-3">Comments for {post.title}</h1>

  <CommentForm data={data.form} postId={post.id} on:comment={handleComment} />

  <section>
    <!-- Comments -->
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

    <!-- Optimistic Comments -->
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
