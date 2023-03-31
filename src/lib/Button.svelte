<script lang="ts" context="module">
  export type Variant = 'outlined' | 'contained' | 'text';
  export type Color = 'primary' | 'success' | 'error' | 'info' | 'warning';

  export type Width = number | 'full' | `${number}%` | undefined;

  function getWidth(width: Width): string {
    if (width === undefined) return '';
    if (width === 'full') return '100%';
    if (typeof width === 'string') return width;

    return width <= 1 && width !== 0 ? `${width * 100}%` : `${width}px`;
  }
</script>

<script lang="ts">
  export let variant: Variant = 'contained';
  export let color: Color = 'primary';
  export let submit = false;

  export let width: Width = undefined;
</script>

<button
  type={submit ? 'submit' : 'button'}
  class="font-bold py-2 px-4 rounded {variant} {color} transition-colors"
  style:width={getWidth(width)}
  on:click
>
  <slot />
</button>

<style lang="postcss">
  .contained {
    &.primary,
    &.info {
      @apply bg-blue-500 hover:bg-blue-700 text-white;
    }

    &.success {
      @apply bg-green-700 hover:bg-green-800 text-white;
    }

    &.error {
      @apply bg-red-500 hover:bg-red-700 text-white;
    }

    &.warning {
      @apply bg-yellow-600 hover:bg-yellow-700 text-white;
    }
  }

  .outlined {
    @apply bg-transparent border;

    &.primary,
    &.info {
      @apply border-blue-500 hover:bg-blue-700 hover:bg-yellow-700/10 hover:border-blue-700 text-blue-500;
    }

    &.success {
      @apply border-green-700 hover:bg-green-800 hover:bg-yellow-700/10 hover:border-green-800 text-green-700;
    }

    &.error {
      @apply border-red-500 hover:bg-red-700 hover:bg-yellow-700/10 hover:border-red-700 text-red-500;
    }

    &.warning {
      @apply border-yellow-600 hover:bg-yellow-700/10 hover:border-yellow-700 text-yellow-600;
    }
  }

  .text {
    @apply bg-transparent;

    &.primary,
    &.info {
      @apply text-blue-500 hover:text-blue-700;
    }

    &.success {
      @apply text-green-700 hover:text-green-800;
    }

    &.error {
      @apply text-red-500 hover:text-red-700;
    }

    &.warning {
      @apply text-yellow-600 hover:text-yellow-700;
    }
  }
</style>
