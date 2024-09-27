import { g as getLoggedInUser, s as solvedNode } from './user-DHoF0IZE.js';
import { r as redirect, e as error } from './index-Ddp2AB5f.js';
import { n as nodeByGameId, g as gameIdByNaturalId } from './node-map-DHryaG8P.js';
import 'mongodb';

const load = async ({ cookies, params }) => {
  const user = await getLoggedInUser(cookies);
  if (!user) throw redirect(303, "/login");
  const node = await nodeByGameId(params.node_id);
  if (!node) error(404, "Connection reset");
  if (node?.type !== "host") redirect(303, `/play/${params.node_id}`);
  if (!node.answer_text && !user.solved_nodes.includes(node.natural_id)) {
    await solvedNode(node, user.username, false);
  }
  const options = [];
  for (let i = 0; i < (node.answer_text?.length ?? 0); i++) {
    options.push(i);
  }
  console.log(node.answer_text);
  const neighbor_game_ids = await Promise.all(node.neighbours.map(async (neighbor_natural_id) => {
    return await gameIdByNaturalId(neighbor_natural_id);
  }));
  return { props: {
    name: node.name,
    solved: user.solved_nodes.includes(node.natural_id),
    description: node.description,
    cipher_text: node.cipher_text,
    options,
    answer_description: node.answer_description,
    neighbors: neighbor_game_ids,
    goal: node.goal
  } };
};
const actions = {
  submit: async ({ cookies, params, request }) => {
    const data = await request.formData();
    const user = await getLoggedInUser(cookies);
    const node = await nodeByGameId(params.node_id);
    if (!user) return error(401, "Unauthorized");
    if (!node) return error(404, "Connection reset");
    for (let i = 0; i < (node.answer_text?.length ?? 0); i++) {
      const answer = data.get(`${i}`);
      if (node.answer_text[i] !== answer) {
        return { form_message: "Wrong answer" };
      }
    }
    await solvedNode(node, user.username, false);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CEi6qUNi.js')).default;
const server_id = "src/routes/play/[node_id]/host/+page.server.ts";
const imports = ["_app/immutable/nodes/7.DpQXgyw8.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.4GcxwhY7.js","_app/immutable/chunks/each.D6YF6ztN.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-D4qEQsSy.js.map
