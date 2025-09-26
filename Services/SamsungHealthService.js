import SamsungHealth from "react-native-samsung-health";

const permissions = [
	SamsungHealth.Permission.STEP_COUNT,
	SamsungHealth.Permission.HEART_RATE,
	SamsungHealth.Permission.WORKOUT,
	SamsungHealth.Permission.SLEEP,
	SamsungHealth.Permission.WEIGHT,
];

export const initSamsungHealth = () => {
	return new Promise((resolve, reject) => {
		SamsungHealth.isAvailable((err, available) => {
			if (err || !available) {
				console.log("Samsung Health is not available:", err);
				return reject(err);
			}

			SamsungHealth.authorize(permissions, (error, result) => {
				if (error) {
					console.log("Auth failed:", error);
					return reject(error);
				}
				console.log("Samsung Health authorized:", result);
				resolve(result);
			});
		});
	});
};
