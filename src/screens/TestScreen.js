import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import {
	isSamsungHealthAvailable,
	requestSamsungHealthPermissions,
	readHealthData,
	checkNativeModule,
} from "../utils/samsungHealth";
import * as Constants from "expo-constants";

const TestScreen = () => {
	const [available, setAvailable] = React.useState(false);
	const [steps, setSteps] = React.useState(0);
	const [debugInfo, setDebugInfo] = React.useState("");

	React.useEffect(() => {
		checkAvailability();
		checkNativeModule(); // Check if native module is detected
	}, []);

	const checkAvailability = async () => {
		console.log("Expo Constants:", Constants);
		console.log("Is Expo Go?", Constants.appOwnership === "expo");
		console.log("Checking basic React Native modules...");
		const basicModules = [
			"AsyncLocalStorage",
			"BlobModule",
			"DevSettings",
			"DeviceEventManager",
			"ExceptionsManager",
			"PlatformConstants",
			"RedBox",
			"SourceCode",
			"Timing",
		];

		basicModules.forEach((moduleName) => {
			console.log(`${moduleName}:`, !!NativeModules[moduleName]);
		});
		console.log("Checking availability...");
		const isAvailable = await isSamsungHealthAvailable();
		console.log("Availability result:", isAvailable);
		setAvailable(isAvailable);
	};

	const handleRequestPermissions = async () => {
		console.log("Requesting permissions...");
		const granted = await requestSamsungHealthPermissions(["steps"]);
		console.log("Permissions granted:", granted);

		if (granted) {
			console.log("Permissions granted, fetching steps...");
			fetchSteps();
		} else {
			console.log("Permissions denied");
		}
	};

	const fetchSteps = async () => {
		console.log("Fetching steps...");
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 1);

		const stepsData = await readHealthData("steps", startDate, endDate);
		console.log("Steps data received:", stepsData);

		if (stepsData) {
			setSteps(stepsData.total || stepsData.value || 0);
		}
	};

	const checkModuleConnection = () => {
		const moduleExists = checkNativeModule();
		setDebugInfo(`Native module exists: ${moduleExists}`);
	};

	return (
		<ScrollView style={{ padding: 20 }}>
			<Text style={{ fontSize: 18, fontWeight: "bold" }}>
				Samsung Health Test
			</Text>

			<Text>Native Module Available: {debugInfo}</Text>
			<Text>Samsung Health Available: {available ? "Yes" : "No"}</Text>

			<Button
				title="Check Module Connection"
				onPress={checkModuleConnection}
			/>
			<Button title="Check Availability" onPress={checkAvailability} />
			<Button
				title="Request Permissions"
				onPress={handleRequestPermissions}
			/>
			<Button title="Fetch Steps" onPress={fetchSteps} />

			<Text>Steps: {steps}</Text>

			<Text style={{ marginTop: 20, fontWeight: "bold" }}>
				Debug Info:
			</Text>
			<Text>Check console logs for detailed information</Text>
		</ScrollView>
	);
};

export default TestScreen;
