<script lang="ts">
  export let id: string;
  export let name: string | null = null;
  export let placeholder: string | null = null;
  export let required: boolean = false;
  export let label: string | null = null;
  export let error: string | null | undefined = undefined;

  export let value: string | null | undefined = '';
</script>

<div>
  {#if $$slots.label || label}
    <label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <slot name="label">
        {label}
      </slot>
    </label>
  {/if}

  <input
    type="text"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    bind:value
    {id}
    {name}
    {placeholder}
    {required}
    on:input
    on:change
    on:focus
    on:focusin
    on:focusout
    on:blur
  />

  <p class="mt-2 text-sm text-red-600 dark:text-red-500">{error ?? ''} &nbsp;</p>
</div>
