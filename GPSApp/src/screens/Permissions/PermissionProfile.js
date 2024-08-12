import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import axios from 'axios';
import DataContext from '../../../Context/DataContext';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you use Expo, you can replace it with your icon library

const PermissionProfile = ({ route }) => {
    const { idPessoa } = route.params;
    const { token } = useContext(DataContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`https://api3.gps.med.br/API/permission/${idPessoa}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                Alert.alert('Error', 'Failed to fetch profile information.');
            }
        };

        fetchProfile();
    }, [idPessoa, token]);

    if (!profile) {
        return <Text>Loading...</Text>;
    }

    const data = [
        { title: 'Nome', type: 'text', value: profile.nome, placeholder: 'Nome' },
        { title: 'Profissão', type: 'text', value: profile.profissao, placeholder: 'Profissão' },
        { title: 'Conselho de Classe', type: 'text', value: profile.conselho, placeholder: 'Conselho de Classe' },
        { title: 'Número do Registro', type: 'text', value: profile.numeroConselho, placeholder: 'Número do Registro' },
        { title: 'País', type: 'text', value: profile.pais, placeholder: 'País' },
        { title: 'UF do Conselho', type: 'text', value: profile.uf, placeholder: 'UF do Conselho' },
        { title: 'Instituição', type: 'text', value: profile.contratante, placeholder: 'Instituição' },
        { title: 'E-mail', type: 'text', value: profile.email, placeholder: 'E-mail' },
    ];

    const renderItem = (item) => (
        <View style={styles.inputContainer} key={item.title}>
            <Text style={styles.inputTitle}>{item.title}</Text>
            <TextInput
                style={styles.input}
                placeholder={item.placeholder}
                placeholderTextColor="#999"
                value={item.value}
                editable={false} // If you don't want the input to be editable
            />
        </View>
    );

    // Render each permission item
    const renderPermissionItem = (permission) => (
        <View key={permission.id} style={styles.permissionItem}>
            <Text style={styles.permissionTitle}>{permission.nome}</Text>
            <Text style={styles.permissionDescription}>{permission.descricao}</Text>
        </View>
    );

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: `https://api3.gps.med.br/API/upload/image?vinculo=${idPessoa}&tipo=pessoa` }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    {data.map(renderItem)}
                </View>

                {/* New "Permissão Pendente" Section */}
                <View style={styles.permissionsContainer}>
                    <View style={styles.permissionHeader}>
                        <MaterialIcons name="check-circle-outline" size={24} color="#FFA500" />
                        <Text style={styles.permissionHeaderTitle}>Permissão Pendente</Text>
                    </View>
                    {profile.permissions.map(renderPermissionItem)}
                </View>

                <View style={{ height: 150 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#FFA500',
    },
    infoContainer: {
        marginBottom: 25,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFA500',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#F5F5F5',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    button: {
        width: '48%',
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#FFA500',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    permissionsContainer: {
        marginTop: 30,
    },
    permissionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    permissionHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFA500',
        marginLeft: 10,
    },
    permissionItem: {
        backgroundColor: '#FFF3E0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    permissionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    permissionDescription: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
});

export default PermissionProfile;
