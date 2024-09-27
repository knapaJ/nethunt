import { c as create_ssr_component, e as escape } from './ssr-DHpF3kMw.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="flex flex-col p-2 space-y-4"><h1 class="block text-center text-2xl" data-svelte-h="svelte-dkv8fw">Find the network node!</h1> <p>${escape(data.props.go_find)}</p></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CnyNdnaD.js.map
