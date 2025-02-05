const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.l48m54Qn.js",app:"_app/immutable/entry/app.BkyhVOhw.js",imports:["_app/immutable/entry/start.l48m54Qn.js","_app/immutable/chunks/DItvxFZT.js","_app/immutable/chunks/B1IYIhu3.js","_app/immutable/chunks/D9AeQzJx.js","_app/immutable/entry/app.BkyhVOhw.js","_app/immutable/chunks/B1IYIhu3.js","_app/immutable/chunks/D8EypBm-.js","_app/immutable/chunks/wJVPQK1Q.js","_app/immutable/chunks/CspWNixw.js","_app/immutable/chunks/D9AeQzJx.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CmiWPVrh.js')),
			__memo(() => import('./chunks/1-CRlR7PU1.js')),
			__memo(() => import('./chunks/2-DXqMbcWR.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
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
