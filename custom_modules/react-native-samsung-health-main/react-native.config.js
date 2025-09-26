module.exports = {
	dependency: {
		platforms: {
			android: {
				packageImportPath:
					"import com.reactnative.samsunghealth.SamsungHealthPackage;",
				packageInstance:
					"new SamsungHealthPackage(BuildConfig.APPLICATION_ID)",
				buildTypes: ["debug", "release"],
				libraryName: "react-native-samsung-health",
				componentDescriptors: [],
				cmakeListsPath: null,
			},
		},
	},
};
