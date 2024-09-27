import { n as nodeByGameId } from './node-map-DHryaG8P.js';
import { e as error } from './index-Ddp2AB5f.js';
import 'mongodb';

const load = async ({ params }) => {
  const node = await nodeByGameId(params.node_id ?? "1");
  if (!node) error(404, "Connection reset");
  return { props: { go_find: node.location_hint } };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CnyNdnaD.js')).default;
const server_id = "src/routes/play/[[node_id]]/+page.server.ts";
const imports = ["_app/immutable/nodes/9.BqRkA0zV.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.4GcxwhY7.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-bEv3kzIY.js.map
