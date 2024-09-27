import { c as create_ssr_component, e as escape, d as each, f as add_attribute } from './ssr-DHpF3kMw.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  return `<div class="flex flex-col space-y-4 p-2"><h1 class="block text-center text-2xl">${escape(data.props.name)}</h1> <p>${escape(data.props.description)}</p> ${!data.props.solved ? `<p>${escape(data.props.cipher_text !== void 0 ? data.props.cipher_text : "There is nothing to hack, just reload the page")}</p> ${form ? `<p class="text-red-500">${escape(form.form_message)}</p>` : ``} <form action="?/submit" method="post">${each(data.props.options, (option) => {
    return `<input type="text"${add_attribute("name", option, 0)}${add_attribute("placeholder", `Answer ${option + 1}`, 0)} class="border border-gray-400 p-2 m-2 text-gray-900">`;
  })} <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" data-svelte-h="svelte-tvt08u">Submit</button></form>` : `<p>${escape(data.props.answer_description !== void 0 ? data.props.answer_description : "")}</p> <div class="flex flex-col">${each(data.props.neighbors, (neighbor) => {
    return `<a href="${"/play/" + escape(neighbor, true)}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Go to ${escape(neighbor)}</a>`;
  })}</div> ${data.props.goal ? `<p data-svelte-h="svelte-197wq81">Now for the hard part. Some exercise! Run, find me as fast as you can, before someone claims your prize! Show me this pic:</p> <img src="/wiener.gif" alt="Well, hot dog, we have a wiener!">` : ``}`}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CEi6qUNi.js.map
