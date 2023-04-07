<script lang="ts" context="module">
  import { enhance as enhanceAction, type SubmitFunction } from '$app/forms';
  import { z, type AnyZodObject, type ZodAny } from 'zod';
  import formStore from './formStore';

  type FieldState = {
    field: string;
    value: unknown;
    validator: ZodAny;
    dirty: boolean;
    error: string | null;
  };

  type FormMethod = 'POST' | 'GET';
  type KeyType = string | number | symbol;
  type FormState<Keys extends KeyType> = Record<Keys, FieldState>;
  type ErrorState<Keys extends KeyType> = Record<Keys, string | null | undefined>;

  function getFormState<T extends AnyZodObject>(schema: T, formData: any): FormState<keyof T['shape']> {
    return Object.fromEntries(
      Object.keys(schema.shape).map((key) => {
        const formError = formData?.errors?.[key];
        const formValue = formData?.values?.[key];

        return [
          key,
          {
            field: key,
            value: formValue,
            validator: schema.shape[key],
            dirty: formValue === null || formValue === undefined,
            error: formError ?? null,
          },
        ];
      })
    ) as any;
  }

  function getFormStateErrors<K extends KeyType>(state: FormState<K>): ErrorState<K> {
    return Object.fromEntries(
      Object.entries(state)
        .map(([key, obj]) => [key, (obj as FieldState).error])
        .filter(([_, error]) => !!error)
    );
  }

  function getFormValues<K extends KeyType>(state: FormState<K>): ErrorState<K> {
    return Object.fromEntries(
      Object.entries(state)
        .map(([key, obj]) => [key, (obj as FieldState).value])
        .filter(([_, error]) => !!error)
    );
  }
</script>

<script lang="ts">
  type SchemaType = $$Generic<AnyZodObject>;

  export let method: FormMethod = 'POST';
  export let id: string;
  export let action: string;
  // @ts-ignore
  export let schema: SchemaType = z.object({});
  export let enhance: SubmitFunction | true | undefined = undefined;

  let formData = formStore(id);

  // Get initial state, also allow updates when submitting
  let formState = getFormState(schema, $formData);
  $: updateFormState($formData);

  let initialState = getFormValues(formState);
  $: formErrors = getFormStateErrors(formState);

  const onTextInput = (_: InputEvent, target: HTMLInputElement | HTMLTextAreaElement) => {
    const inputName = target.name;

    if (inputName in formState) {
      const validator = formState[inputName].validator;
      const result = validator.safeParse(target.value);

      formState[inputName].dirty = true;
      formState[inputName].value = target.value;

      if (!result.success) {
        formState[inputName].error = result.error.issues[0].message;
      } else {
        formState[inputName].error = null;
      }

      formState = formState;
    }
  };

  const onInput = (ev: Event) => {
    if (ev.type !== 'input') {
      throw new TypeError(`Expected an input event, got ${ev.type} instead!`);
    }

    if (
      (ev.target instanceof HTMLInputElement && ev.target.type === 'text') ||
      (ev.target instanceof HTMLTextAreaElement && ev.target.type === 'textarea')
    ) {
      return onTextInput(ev as InputEvent, ev.target);
    }

    console.warn(`Unhandled event type ${ev.type}`);
  };

  const updateFormState = (formData: any) => {
    formState = getFormState(schema, formData);
  };
</script>

<!-- This is kinda unfortunate -->
{#if enhance}
  <form {method} {action} class={$$props.class} use:enhanceAction={enhance === true ? () => {} : enhance}>
    <input type="hidden" name="formId" value={id} />
    <slot errors={formErrors} {onInput} values={initialState} />
  </form>
{:else}
  <form {method} {action} class={$$props.class}>
    <input type="hidden" name="formId" value={id} />
    <slot errors={formErrors} {onInput} values={initialState} />
  </form>
{/if}
