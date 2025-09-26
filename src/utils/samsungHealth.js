import { NativeModules, Platform } from "react-native";

const SamsungHealthNative = NativeModules.RNSamsungHealth;

// Create a proper wrapper that delegates to the native module
const SamsungHealthWrapper = {
	isAvailable: async () => {
		if (Platform.OS !== "android" || !SamsungHealthNative) {
			return false;
		}
		try {
			return await SamsungHealthNative.isAvailable();
		} catch (error) {
			console.warn("isAvailable failed:", error);
			return false;
		}
	},

	requestPermissions: async (permissions = ["steps", "heart_rate"]) => {
		if (Platform.OS !== "android" || !SamsungHealthNative) {
			return false;
		}
		try {
			return await SamsungHealthNative.requestPermissions(permissions);
		} catch (error) {
			console.error("requestPermissions failed:", error);
			return false;
		}
	},

	readData: async (dataType, startDate, endDate) => {
		if (Platform.OS !== "android" || !SamsungHealthNative) {
			return null;
		}
		try {
			return await SamsungHealthNative.readData(
				dataType,
				startDate.getTime(),
				endDate.getTime()
			);
		} catch (error) {
			console.error("readData failed:", error);
			return null;
		}
	},

	writeData: async (dataType, value, date) => {
		if (Platform.OS !== "android" || !SamsungHealthNative) {
			return false;
		}
		try {
			return await SamsungHealthNative.writeData(
				dataType,
				value,
				date.getTime()
			);
		} catch (error) {
			console.error("writeData failed:", error);
			return false;
		}
	},
};

// Debug function to check if native module is available
export const checkNativeModule = () => {
	console.log("NativeModules.SamsungHealth exists:", !!SamsungHealthNative);
	if (SamsungHealthNative) {
		console.log("Available methods:", Object.keys(SamsungHealthNative));
	}
	return !!SamsungHealthNative;
};

export const isSamsungHealthAvailable = SamsungHealthWrapper.isAvailable;
export const requestSamsungHealthPermissions =
	SamsungHealthWrapper.requestPermissions;
export const readHealthData = SamsungHealthWrapper.readData;
export const writeHealthData = SamsungHealthWrapper.writeData;

export default SamsungHealthWrapper;
