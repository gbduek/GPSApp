import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../../../Context/DataContext';
import Header from '../../../Components/Header';

const PermissionScreen = () => {
    const [permissions, setPermissions] = useState([]);
    const { token } = useContext(DataContext); // Get the token from your context
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response1 = await axios.get('https://api3.gps.med.br/API/permission/user-permissions/1', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const response2 = await axios.get('https://api3.gps.med.br/API/permission/user-permissions/2', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const allPermissions = [...response1.data.returned, ...response2.data.returned];
                setPermissions(allPermissions);
            } catch (error) {
                console.error('Failed to fetch permissions:', error);
            }
        };

        fetchPermissions();
    }, [token]);

    const handleEnterProfile = (idPessoa) => {
        navigation.navigate('PermissionProfile', { idPessoa });
    };

    return (
        <View>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                {permissions.length === 0 ? (
                    <Text style={{color:'orange', fontWeight:'bold', fontSize:'20'}}>Não há requisicões de permissão no momento</Text>
                ) : (
                    permissions.map((permission) => (
                        <View key={permission.id} style={styles.card}>
                            <Image source={{ uri: permission.foto }} style={styles.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.name}>{permission.nome}</Text>
                                <TouchableOpacity
                                    style={styles.enterButton}
                                    onPress={() => handleEnterProfile(permission.idPessoa)}
                                >
                                    <Text style={styles.enterButtonText}>Entrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    enterButton: {
        backgroundColor: 'orange',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    enterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PermissionScreen;
