const {
	withProjectBuildGradle,
	withAppBuildGradle,
	withAndroidManifest,
} = require("@expo/config-plugins");

const withSamsungHealth = (config) => {
	// Add Maven repository
	config = withProjectBuildGradle(config, (cfg) => {
		if (cfg.modResults.contents.includes("samsung-health")) {
			return cfg;
		}

		cfg.modResults.contents = cfg.modResults.contents.replace(
			/allprojects\s*{\s*repositories\s*{/,
			`allprojects {
        repositories {
          maven {
            url 'https://developer.samsung.com/health/android/repository'
          }
          `
		);
		return cfg;
	});

	// Add dependency to app build.gradle
	config = withAppBuildGradle(config, (cfg) => {
		if (cfg.modResults.contents.includes("react-native-samsung-health")) {
			return cfg;
		}

		cfg.modResults.contents = cfg.modResults.contents.replace(
			/dependencies\s*{/,
			`dependencies {
        implementation project(':react-native-samsung-health')
        `
		);
		return cfg;
	});

	// Add permissions to AndroidManifest
	config = withAndroidManifest(config, (cfg) => {
		const mainApplication = cfg.modResults.manifest.application[0];

		// Add permissions
		const permissions = [
			"android.permission.HEALTH_DATA",
			"com.samsung.android.health.permission.READ_HEALTH_DATA",
			"com.samsung.android.health.permission.WRITE_HEALTH_DATA",
		];

		permissions.forEach((permission) => {
			if (
				!cfg.modResults.manifest["uses-permission"]?.some(
					(p) => p.$["android:name"] === permission
				)
			) {
				cfg.modResults.manifest["uses-permission"].push({
					$: { "android:name": permission },
				});
			}
		});

		return cfg;
	});

	return config;
};

module.exports = withSamsungHealth;
