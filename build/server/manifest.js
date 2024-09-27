const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","NetHunt.png","NetHunt_wide.png","under-construction.avif","wiener.gif"]),
	mimeTypes: {".png":"image/png",".avif":"image/avif",".gif":"image/gif"},
	_: {
		client: {"start":"_app/immutable/entry/start.DQw3JRu4.js","app":"_app/immutable/entry/app.WRB75-Ik.js","imports":["_app/immutable/entry/start.DQw3JRu4.js","_app/immutable/chunks/entry.9G8Zeza6.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/entry/app.WRB75-Ik.js","_app/immutable/chunks/scheduler.Cewbzyqj.js","_app/immutable/chunks/index.4GcxwhY7.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D4EoFsqv.js')),
			__memo(() => import('./chunks/1-DTkTXeJ8.js')),
			__memo(() => import('./chunks/2-CDew7erP.js')),
			__memo(() => import('./chunks/3-5NR3OHba.js')),
			__memo(() => import('./chunks/4-B3ua9wNZ.js')),
			__memo(() => import('./chunks/5-CGXQiR08.js')),
			__memo(() => import('./chunks/6-C2yf6mTM.js')),
			__memo(() => import('./chunks/7-D4qEQsSy.js')),
			__memo(() => import('./chunks/8-C-gqMk8q.js')),
			__memo(() => import('./chunks/9-bEv3kzIY.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/play/[node_id]/firewall",
				pattern: /^\/play\/([^/]+?)\/firewall\/?$/,
				params: [{"name":"node_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/play/[node_id]/host",
				pattern: /^\/play\/([^/]+?)\/host\/?$/,
				params: [{"name":"node_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/play/[node_id]/qrcode",
				pattern: /^\/play\/([^/]+?)\/qrcode\/?$/,
				params: [{"name":"node_id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/play/[[node_id]]",
				pattern: /^\/play(?:\/([^/]+))?\/?$/,
				params: [{"name":"node_id","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,,3,], errors: [1,2,,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
