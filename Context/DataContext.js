import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [firstName, setFirstName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(""); // Foto de Perfil
    const [percentages, setPercentages] = useState({
        mente: 0,
        lifestyle: 0,
        corpo: 0,
    });
    const [loading, setLoading] = useState(true);
    const [userLogged, setUserLogged] = useState(null); //Id do Usuário
    const [token, setToken] = useState(null); // Token do Usuário
    const [companyPhoto, setCompanyPhoto] = useState(null);
    const [temDiario, setTemDiario] = useState(false);
    const [userCompany, setUserCompany] = useState(null);
    const [menuData, setMenuData] = useState([]);
    const [userMail, setUserMail] = useState(null);
    const [userName, setUserName] = useState(null);

    // Function to handle login
    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "https://api3.gps.med.br/API/Acesso/login",
                {
                    Usuario: email,
                    Senha: password,
                }
            );

            const { token } = response.data;
            setToken(token); // Set token to state
            await AsyncStorage.setItem("token", token);

            const userDataResponse = await axios.get(
                "https://api3.gps.med.br/API/Acesso/obter-dados-usuario",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const {
                userLogged,
                userLoggedName,
                profilePhoto,
                temDiario,
                companyPhoto,
                userCompany,
            } = userDataResponse.data;

            setUserLogged(userLogged); // Set userLogged to state
            await AsyncStorage.setItem("userLogged", userLogged);
            await AsyncStorage.setItem("userLoggedName", userLoggedName);
            setCompanyPhoto(companyPhoto);
            setUserCompany(userCompany);
            setUserMail(email);

            setUserName(userLoggedName);

            const firstName = userLoggedName.split(" ")[0].toUpperCase();
            setFirstName(firstName);

            setProfilePhoto(profilePhoto); // Set profile photo to state
            await AsyncStorage.setItem("profilePhoto", profilePhoto);
            setTemDiario(temDiario);

            const menuDataResponse = await axios.get(
                `https://api3.gps.med.br/API/Menu/menu-cliente/${userLogged}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMenuData(menuDataResponse.data); // Set menu data
        } catch (error) {
            throw error; // Propagate error to handle in LoginScreen
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch percentages
    const fetchPercentages = async () => {
        if (!token || !userLogged) {
            console.log("Token or userLogged not found");
            return; // Exit early if token or userLogged not available
        }

        try {
            const indicatorIds = {
                mente: "40c6eaad-8815-4cbc-9caf-78f081f03674",
                lifestyle: "7ed63315-ff7b-4658-b488-7655487e2845",
                corpo: "20118275-8791-469e-b9f5-3210f990dd01",
                initeval: "e75689fd-a258-a071-a439-9d5c3889b514",
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const responses = await Promise.all(
                Object.values(indicatorIds).map((indicatorId) =>
                    axios.get(
                        `https://api3.gps.med.br/API/DadosIndicadores/tipo-indicadores-porcetagem-preenchimento/${userLogged}/${indicatorId}`,
                        config
                    )
                )
            );

            const preenchidos = responses.map(
                (response) => response.data.preenchidos
            );
            const maxValues = {
                mente: 6,
                lifestyle: 10,
                corpo: 11,
                initeval: 2,
            };
            const calculatedPercentages = {
                mente: Math.min(
                    Math.round((preenchidos[0] / maxValues.mente) * 100),
                    100
                ),
                lifestyle: Math.min(
                    Math.round((preenchidos[1] / maxValues.lifestyle) * 100),
                    100
                ),
                corpo: Math.min(
                    Math.round((preenchidos[2] / maxValues.corpo) * 100),
                    100
                ),
                initeval: Math.min(
                    Math.round((preenchidos[3] / maxValues.initeval) * 100),
                    100
                ),
            };

            setPercentages(calculatedPercentages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DataContext.Provider
            value={{
                userName,
                firstName,
                userMail,
                profilePhoto,
                percentages,
                loading,
                token,
                userLogged,
                temDiario,
                companyPhoto,
                userCompany,
                menuData,
                handleLogin,
                fetchPercentages,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
