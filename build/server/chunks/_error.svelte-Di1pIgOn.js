import { c as create_ssr_component, b as subscribe, e as escape } from './ssr-DHpF3kMw.js';
import { p as page } from './stores-sX7Zd5i7.js';
import './exports-BGi7-Rnc.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="flex flex-col p-2 space-y-4"><h1 class="block text-center text-2xl">${escape($page.error?.message)}</h1></div>`;
});

export { Error as default };
//# sourceMappingURL=_error.svelte-Di1pIgOn.js.map
