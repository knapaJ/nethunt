import { c as create_ssr_component, e as escape, d as each, f as add_attribute } from './ssr-DHpF3kMw.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="flex flex-col space-y-4 p-2"><h1 class="block text-center text-2xl">${escape(data.props.node.name)}</h1> <p>${escape(data.props.node.description)}</p> ${!data.props.solved ? `<p data-svelte-h="svelte-bv0ee7">One of these ports is not like the other. One of them will lead you forward, the others will bring doom.</p> <div class="grid grid-cols-3 content-center">${each(data.props.options, (option) => {
    return `<div class="flex flex-row space-x-4"><form method="post" action="?/submit_option"><input type="hidden" name="option"${add_attribute("value", option, 0)}> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" type="submit">${escape(option)}</button></form> </div>`;
  })}</div>` : `<p>${escape(data.props.node.answer_description)}</p> <div class="flex flex-col">${each(data.props.neighbors, (neighbor) => {
    return `<a href="${"/play/" + escape(neighbor, true)}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Go to ${escape(neighbor)}</a>`;
  })}</div>`}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CsRRuD5H.js.map
