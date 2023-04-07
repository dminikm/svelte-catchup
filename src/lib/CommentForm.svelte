<script lang="ts">
  import { applyAction, type SubmitFunction } from '$app/forms';
  import { createEventDispatcher } from 'svelte';
  import { commentActionValidator, type Comment } from '../routes/(app)/article/[id]/comments/types';
  import { getAuthContext } from './authContext';
  import Button from './Button.svelte';
  import Form from './Form.svelte';

  export let postId: string;

  const dispatcher = createEventDispatcher<{ comment: { comment: Comment } }>();

  const commentEnhancer: SubmitFunction = () => {
    return async ({ result }) => {
      if (result.type === 'success' || result.type === 'failure') {
        await applyAction(result);
      }

      if (result.type === 'success' && result.data) {
        // If we have a success, dispatch the comment up
        dispatcher('comment', { comment: result.data!.comment as Comment });
      }
    };
  };

  let authStore = getAuthContext();
  $: user = $authStore;
</script>

<section>
  <h1>Leave a Comment</h1>
  {#if user}
    <Form
      id="comment"
      action="/article/{postId}/comments"
      schema={commentActionValidator}
      enhance={commentEnhancer}
      let:values
      let:errors
      let:onInput
    >
      <textarea
        name="content"
        on:input={onInput}
        value={values.content ?? ''}
        class="w-full h-48 border border-gray-500 p-3"
      />
      <br />
      {#if errors.content}
        <span class="text-red-500">{errors.content}</span> <br />
      {/if}
      <Button submit class="mt-2">Add Comment!</Button>
    </Form>
  {:else}
    You must be signed in to leave a comment!
  {/if}
</section>
