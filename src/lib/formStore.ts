import { page } from '$app/stores';
import { readable } from 'svelte/store';

export default function formStore(formId: string) {
  return readable<any>(undefined, (set) => {
    return page.subscribe((value) => {
      if (value?.form?.formId == formId) {
        set(value.form);
      }
    });
  });
}
