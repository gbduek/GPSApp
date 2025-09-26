import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Linking,
	Image,
} from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../Components/Header";
import SamsungH from "../../../assets/Icons/SamsungH";
import { Ionicons } from "@expo/vector-icons";

const Integrations = () => {
	const [connectedServices, setConnectedServices] = useState([]);

	// Sample integration data - this could come from an API in a real app
	const integrations = [
		{
			id: "samsung-health",
			name: "Samsung Health",
			icon: <SamsungH />,
			description:
				"Sincronize informações de passos, calorias, batimentos cardíacos e exercícios.",
			connected: connectedServices.includes("samsung-health"),
			connectHandler: () => handleConnect("samsung-health"),
			learnMoreUrl: "https://www.samsung.com/health",
		},
	];

	const handleConnect = (serviceId) => {
		// In a real app, this would connect to the actual service API
		if (connectedServices.includes(serviceId)) {
			setConnectedServices(
				connectedServices.filter((id) => id !== serviceId)
			);
		} else {
			setConnectedServices([...connectedServices, serviceId]);
		}
	};

	const handleLearnMore = (url) => {
		Linking.openURL(url).catch((err) =>
			console.error("Couldn't load page", err)
		);
	};

	return (
		<SafeAreaView edges={[]} style={{ flex: 1 }}>
			<Header />
			<ScrollView style={styles.container}>
				<View style={styles.headerContainer}>
					<View
						style={{
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<Ionicons
							name="extension-puzzle"
							size={36}
							color={"orange"}
						/>
						<Text style={styles.pageTitle}>Integrações</Text>
					</View>
					<Text style={styles.pageSubtitle}>
						Conecte seus aplicativos de saúde favoritos para
						unificar seus dados em um só lugar
					</Text>
				</View>

				{integrations.map((integration) => (
					<View key={integration.id} style={styles.integrationCard}>
						<View style={styles.cardHeader}>
							<View style={styles.serviceInfo}>
								{integration.icon}
								<Text style={styles.titleText}>
									{integration.name}
								</Text>
							</View>
							<View
								style={[
									styles.statusBadge,
									integration.connected
										? styles.connectedBadge
										: styles.disconnectedBadge,
								]}
							>
								<Text style={styles.statusText}>
									{integration.connected
										? "Conectado"
										: "Desconectado"}
								</Text>
							</View>
						</View>

						<View style={styles.descriptionContainer}>
							<Text style={styles.descriptionText}>
								{integration.description}
							</Text>
						</View>

						<View style={styles.benefitsContainer}>
							<Text style={styles.benefitsTitle}>
								Benefícios:
							</Text>
							<View style={styles.benefitItem}>
								<Text style={styles.bulletPoint}>•</Text>
								<Text style={styles.benefitText}>
									Sincronização automática de dados
								</Text>
							</View>
							<View style={styles.benefitItem}>
								<Text style={styles.bulletPoint}>•</Text>
								<Text style={styles.benefitText}>
									Relatórios mais completos
								</Text>
							</View>
							<View style={styles.benefitItem}>
								<Text style={styles.bulletPoint}>•</Text>
								<Text style={styles.benefitText}>
									Acompanhamento personalizado
								</Text>
							</View>
						</View>

						<View style={styles.actionsContainer}>
							<TouchableOpacity
								style={[
									styles.button,
									integration.connected
										? styles.disconnectButton
										: styles.connectButton,
								]}
								onPress={integration.connectHandler}
							>
								<Text style={styles.buttonText}>
									{integration.connected
										? "Desconectar"
										: "Conectar"}
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.learnMoreButton}
								onPress={() =>
									handleLearnMore(integration.learnMoreUrl)
								}
							>
								<Text style={styles.learnMoreText}>
									Saiba mais
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				))}

				<View style={styles.footer}>
					<Text style={styles.footerText}>
						Problemas com integração? Entre em contato com nosso
						suporte.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Integrations;
