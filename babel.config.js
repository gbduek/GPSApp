module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./"],
					extensions: [
						".ios.js",
						".android.js",
						".js",
						".jsx",
						".ts",
						".tsx",
						".json",
					],
					alias: {
						"^react-native$": require.resolve("react-native"),
					},
				},
			],
			// ⚠️ Tem que ser o ÚLTIMO plugin
			"react-native-worklets/plugin",
		],
	};
};
