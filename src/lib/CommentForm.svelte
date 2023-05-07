<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { commentActionValidator, type Comment } from '../routes/(app)/article/[id]/comments/types';
  import { getAuthContext } from './authContext';
  import Button from './Button.svelte';
  import type { Validation } from 'sveltekit-superforms';
  import { superForm } from 'sveltekit-superforms/client';

  export let data: Validation<typeof commentActionValidator>;
  export let postId: string;

  const dispatcher = createEventDispatcher<{ comment: { comment: Comment } }>();
  let authStore = getAuthContext();
  $: user = $authStore;

  const { form, constraints, errors, enhance } = superForm(data, {
    id: 'comment',
    validators: commentActionValidator,
    validationMethod: 'oninput',
    defaultValidator: 'keep',
    resetForm: true,
    onSubmit() {
      dispatcher('comment', {
        comment: {
          id: `optimistic-comment-${$form.content}-${Date.now()}`,
          author: {
            id: user?.id!,
            username: user?.name!,
            avatar: user?.image!,
          },
          content: $form.content,
          created: new Date(),
        },
      });
    },
  });
</script>

<section>
  <h1>Leave a Comment</h1>
  {#if user}
    <form action="/article/{postId}/comments" method="POST" use:enhance>
      <textarea
        name="content"
        class="w-full h-48 border border-gray-500 p-3"
        bind:value={$form.content}
        {...$constraints.content}
      />
      <br />
      {#if $errors.content?.[0]}
        <span class="text-red-500">{$errors.content?.[0]}</span> <br />
      {/if}
      <Button submit class="mt-2">Add Comment!</Button>
    </form>
  {:else}
    You must be signed in to leave a comment!
  {/if}
</section>
