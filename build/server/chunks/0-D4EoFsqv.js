import { g as getLoggedInUser } from './user-DHoF0IZE.js';
import './node-map-DHryaG8P.js';
import 'mongodb';

const load = async ({ cookies }) => {
  const user = await getLoggedInUser(cookies);
  return {
    user: user?.username ?? null
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BX2T5b5-.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.BLNX0CBn.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.4GcxwhY7.js","_app/immutable/chunks/stores.CzSD5AWg.js","_app/immutable/chunks/entry.9G8Zeza6.js"];
const stylesheets = ["_app/immutable/assets/0.i0ptEvjy.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-D4EoFsqv.js.map
