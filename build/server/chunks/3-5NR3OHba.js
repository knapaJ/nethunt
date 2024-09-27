import { g as getLoggedInUser } from './user-DHoF0IZE.js';
import { r as redirect, e as error } from './index-Ddp2AB5f.js';
import { n as nodeByGameId } from './node-map-DHryaG8P.js';
import 'mongodb';

const load = async ({ cookies, params }) => {
  const user = await getLoggedInUser(cookies);
  if (!user) throw redirect(303, "/login");
  if (!params.node_id) redirect(303, "/play/1");
  const node = await nodeByGameId(params.node_id);
  if (!node) error(404, "Connection reset");
  if (!user.found_nodes.includes(params.node_id)) {
    return {};
  }
  switch (node?.type) {
    case "firewall":
      redirect(303, `/play/${params.node_id}/firewall`);
      break;
    case "host":
      redirect(303, `/play/${params.node_id}/host`);
      break;
    default:
      throw new Error("Invalid node type");
  }
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BGcyBzhh.js')).default;
const server_id = "src/routes/play/[[node_id]]/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.5_PN3_Zv.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.4GcxwhY7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-5NR3OHba.js.map
