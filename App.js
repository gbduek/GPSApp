import React, { useState } from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { DataProvider } from "./Context/DataContext.js";
import LoginScreen from "./src/screens/LoginScreen.js";
import DrawerRoutes from "./src/routes/drawer.routes.js";
import { navigationRef } from "./src/routes/NavReferencer/navigationRef.js";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLoginSuccess = () => {
		setIsAuthenticated(true);
	};

	return (
		<DataProvider>
			<StatusBar hidden={true} />
			<NavigationContainer ref={navigationRef}>
				{isAuthenticated ? (
					<DrawerRoutes setIsAuthenticated={setIsAuthenticated} />
				) : (
					<LoginScreen onLoginSuccess={handleLoginSuccess} />
				)}
			</NavigationContainer>
		</DataProvider>
	);
};

export default App;
