import React, { useState, useContext } from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	Linking,
	Platform,
} from "react-native";
import axios from "axios";
import DataContext from "../../Context/DataContext";
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = ({ onLoginSuccess, test, test2 }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailFocused, setEmailFocused] = useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const { handleLogin } = useContext(DataContext);
	const [nonExistEmail, setNonExistEmail] = useState(false);

	const onLoginPress = async () => {
		setIsLoading(true);
		try {
			await handleLogin(email, password);
			onLoginSuccess(); // Call this to update the authenticated state in App.js
		} catch (error) {
			Alert.alert("O Login falhou", "Senha ou usuário inválido(s)");
		} finally {
			setIsLoading(false);
		}
	};

	const handleForgotPassword = async () => {
		if (email !== "") {
			try {
				const url = `https://api3.gps.med.br/API/Acesso/EsqueciSenha`;
				const postData = {
					Usuario: email,
				};

				const response = await axios.post(url, postData);
				const { message, status } = response.data;

				if (status === 200) {
					Alert.alert(
						"Sucesso",
						"Um email foi enviado para resetar sua senha."
					);
				} else {
					Alert.alert(
						"Erro",
						message || "Ocorreu um erro ao tentar resetar a senha."
					);
				}
			} catch (error) {
				console.error("API Error:", error);
				Alert.alert(
					"Erro",
					"Ocorreu um erro ao tentar resetar a senha."
				);
			}
		} else {
			if (Platform.OS === "android") {
				setNonExistEmail(true);
			}
			Alert.alert("Erro", "Por favor, insira um email válido.");
		}
	};

	const handleInterativaPress = () => {
		Linking.openURL("https://interativasaude.com.br/");
	};

	return (
		<View style={styles.container}>
			<View style={{ height: 20 }} />
			<Image
				source={require("../../assets/gps_logo.png")}
				style={{
					width: 315,
					height: 125,
					resizeMode: "stretch",
					marginBottom: 40,
				}}
			/>
			<TextInput
				style={[styles.input, emailFocused && styles.inputFocused]}
				placeholder="Email"
				onChangeText={setEmail}
				value={email}
				autoCapitalize="none"
				onFocus={() => setEmailFocused(true)}
				onBlur={() => setEmailFocused(false)}
			/>
			<View style={styles.passwordContainer}>
				<TextInput
					style={[
						styles.input,
						passwordFocused && styles.inputFocused,
						{ flex: 1 },
					]}
					placeholder="Senha"
					onChangeText={setPassword}
					value={password}
					secureTextEntry={!showPassword} // Toggle password visibility
					onFocus={() => setPasswordFocused(true)}
					onBlur={() => setPasswordFocused(false)}
				/>
				<TouchableOpacity
					style={styles.eyeIcon}
					onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
				>
					<FontAwesome
						name={showPassword ? "eye" : "eye-slash"}
						size={20}
						color={passwordFocused ? "gray" : "white"} // Change color based on focus
					/>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={onLoginPress}
				style={styles.touchableOpacity}
				disabled={isLoading}
			>
				<Text style={styles.text}>Entrar</Text>
				{isLoading && (
					<ActivityIndicator
						size="small"
						color="#ffa500"
						style={{ marginLeft: 10 }}
					/>
				)}
			</TouchableOpacity>
			<TouchableOpacity onPress={handleForgotPassword}>
				<Text
					style={{
						fontSize: 18,
						lineHeight: 21,
						fontWeight: "bold",
						letterSpacing: 0.25,
						paddingTop: 20,
						color: "white",
					}}
				>
					Esqueci minha senha
				</Text>
			</TouchableOpacity>
			{nonExistEmail && (
				<View>
					<Text style={{ color: "red" }}>
						Por favor, insira um email válido.
					</Text>
				</View>
			)}
			<View style={{ top: 100, alignItems: "center" }}>
				<TouchableOpacity onPress={handleInterativaPress}>
					<Text style={{ color: "white" }}>by Interativa Saúde</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingBottom: 100,
		backgroundColor: "#ffa500",
	},
	input: {
		height: 50,
		width: "100%",
		borderColor: "white",
		borderRadius: 25,
		borderWidth: 3,
		marginBottom: 25,
		paddingHorizontal: 15,
		backgroundColor: "#ffa500",
	},
	inputFocused: {
		backgroundColor: "white",
	},
	touchableOpacity: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingVertical: 15,
		paddingHorizontal: 32,
		borderRadius: 25,
		elevation: 3,
		backgroundColor: "white",
		width: "90%",
		marginTop: 5,
	},
	text: {
		fontSize: 18,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#ffa500",
	},
	passwordContainer: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	eyeIcon: {
		position: "absolute",
		right: 15,
		top: 16,
	},
});

export default LoginScreen;
