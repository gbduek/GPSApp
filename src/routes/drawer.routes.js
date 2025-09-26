import { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import DataContext from "../../Context/DataContext";
import TabRoutes from "./tab.routes";
import {
	MenteStack,
	CorpoStack,
	LifeStyleStack,
	InitEvalStack,
} from "./stack.routes";
import Diary from "../screens/Diary/Diary";
import CustomDrawerContent from "./CustomDrawerContent/CustomDrawerContent";
import PdS_Main from "../screens/PdS/PdS_Main";
import Recom from "../screens/Recom";
import Integrations from "../screens/Integrations/Integrations";
import TestScreen from "../screens/TestScreen";

const Drawer = createDrawerNavigator();

const getStackForDimension = (sigla) => {
	// Return the correct stack or component for each dimension
	switch (sigla) {
		case "Mente":
			return MenteStack;
		case "Estilo de vida":
			return LifeStyleStack;
		case "Corpo":
			return CorpoStack;
		case "Avaliação inicial":
			return InitEvalStack;
		default:
			return PdS; // Default to a generic component or stack
	}
};

const DrawerRoutes = ({ setIsAuthenticated }) => {
	const { menuData } = useContext(DataContext);

	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerStyle: { backgroundColor: "orange" },
				drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.3)",
				drawerActiveTintColor: "white",
				drawerLabelStyle: {
					fontSize: 20,
					fontWeight: "bold",
				},
				drawerItemStyle: { marginVertical: 4 },
			}}
			drawerContent={(props) => (
				<CustomDrawerContent
					{...props}
					setIsAuthenticated={setIsAuthenticated}
				/>
			)}
		>
			<Drawer.Screen
				name="Home"
				component={TabRoutes}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="home" size={size} color={color} />
					),
					drawerItemStyle: { display: "none" },
				}}
			/>

			<Drawer.Screen
				name="Test"
				component={TestScreen}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="book" size={size} color={color} />
					),
				}}
			/>

			{menuData.map((item) => (
				<Drawer.Screen
					key={item.id}
					name={item.sigla}
					component={getStackForDimension(item.sigla)} // Dynamically choose the component
					options={{
						drawerItemStyle: { display: "none" },
					}}
				/>
			))}

			<Drawer.Screen
				name="Diários"
				component={Diary}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="book" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Perfil de Saúde"
				component={PdS_Main}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="bar-chart" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Recomendações"
				component={Recom}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="bulb" size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name="Integrações"
				component={Integrations}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons
							name="extension-puzzle"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerRoutes;
