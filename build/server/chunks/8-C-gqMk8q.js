import { g as getLoggedInUser } from './user-DHoF0IZE.js';
import { r as redirect, e as error } from './index-Ddp2AB5f.js';
import { a as nodeMap, g as gameIdByNaturalId, d as db } from './node-map-DHryaG8P.js';
import 'mongodb';

const load = async ({ cookies, params }) => {
  const user = await getLoggedInUser(cookies);
  if (!user) throw redirect(303, "/login");
  const node_natural_id = parseInt(params.node_id);
  const node = nodeMap.find((node2) => node2.natural_id === node_natural_id);
  if (!node) error(404, "Node not found, something went wrong!");
  const node_game_id = await gameIdByNaturalId(node_natural_id);
  if (!node_game_id) error(404, "Node not found, something went wrong!");
  if (!user.visible_nodes.includes(node_game_id) && node_natural_id !== 1) error(404, "No path to host. You have to be doing something funky!");
  if (!user.found_nodes.includes(node_game_id)) {
    const userCollection = db.collection("users");
    await userCollection.updateOne({ username: user.username }, { $push: { found_nodes: node_game_id } });
  }
  console.log(node_game_id);
  redirect(303, `/play/${node_game_id}`);
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BeF47-ls.js')).default;
const server_id = "src/routes/play/[node_id]/qrcode/+page.server.ts";
const imports = ["_app/immutable/nodes/8.CLQAA2wo.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.4GcxwhY7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-C-gqMk8q.js.map
