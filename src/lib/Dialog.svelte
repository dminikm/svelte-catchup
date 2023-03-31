<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import clickOutside from './actions/clickOutside';

  export let open: boolean = false;
  let canClose: boolean = true;

  let dialog: HTMLDialogElement;

  const dispatcher = createEventDispatcher();

  const handleOpen = () => {
    dialog?.showModal();

    // Our click outside element is closing down our dialog.
    // So we prevent the modal for closing for 100 ms.
    canClose = false;
    setTimeout(() => (canClose = true), 100);
  };

  const handleClose = () => {
    dialog?.close();
  };

  const handleClickOutside = (ev: MouseEvent) => {
    if (canClose && ev.target === dialog) {
      dispatcher('close');
    }
  };

  $: if (open) handleOpen();
  $: if (!open) handleClose();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:click={handleClickOutside}>
  <slot />
</dialog>

<style lang="postcss">
  dialog {
    @apply p-0;
  }

  dialog::backdrop {
    @apply bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0;
  }
</style>
