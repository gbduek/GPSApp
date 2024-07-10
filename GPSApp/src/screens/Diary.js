import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import EmotionPopup from '../../Components/Popups/EmotionPopup';
import MovementPopup from '../../Components/Popups/MovementPopup';
import DiHist from '../../Components/DiHist';
import Header from '../../Components/Header';
import GraphDiary from '../../Components/GraphDiary';

const Diary = () => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [diaryId, setDiaryId] = useState('a8772285-cc12-47c0-b947-eeac0a790b7a');
    const [selectedOption, setSelectedOption] = useState('de Emoções');
    const [isEmotionPopupOpen, setIsEmotionPopupOpen] = useState(false);
    const [isMovementPopupOpen, setIsMovementPopupOpen] = useState(false);
    const [imageUri, setImageUri] = useState('https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a');
    const [description, setDescription] = useState('Registre aqui suas fontes de estresse e suas emoções, positivas e negativas.');

    const options = ['de Emoções', 'de Movimento', 'de Sintomas'];

    const handleSelectorPress = () => setIsSelectorOpen(!isSelectorOpen);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        setIsSelectorOpen(false);
        closeAllPopups();
        updateImageUriAndDescription(option);
    };

    const toggleEmotionPopup = () => setIsEmotionPopupOpen(!isEmotionPopupOpen);

    const toggleMovementPopup = () => setIsMovementPopupOpen(!isMovementPopupOpen);

    const closeAllPopups = () => {
        setIsEmotionPopupOpen(false);
        setIsMovementPopupOpen(false);
    };

    const updateImageUriAndDescription = (option) => {
        switch (option) {
            case 'de Emoções':
                setDiaryId('a8772285-cc12-47c0-b947-eeac0a790b7a');
                setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a');
                setDescription('Registre aqui suas fontes de estresse e suas emoções, positivas e negativas.');
                break;
            case 'de Movimento':
                setDiaryId('ee8cf8bb-36ff-4838-883b-75179867d095');
                setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=ee8cf8bb-36ff-4838-883b-75179867d095');
                setDescription('Registre aqui suas atividades, sejam de lazer, esporte ou malhação.');
                break;
            case 'de Sintomas':
                setDiaryId('a0a1d9b5-2268-4aed-9040-44fb3d88975e');
                setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=a0a1d9b5-2268-4aed-9040-44fb3d88975e');
                setDescription('Registre aqui seus sintomas, sejam de problemas agudos ou crônicos.');
                break;
            default:
                setDiaryId('a8772285-cc12-47c0-b947-eeac0a790b7a');
                setImageUri('https://api3.gps.med.br/api/upload/image?vinculo=a8772285-cc12-47c0-b947-eeac0a790b7a');
                setDescription('Registre aqui suas fontes de estresse e suas emoções, positivas e negativas.');
                break;
        }
    };

    const renderPopup = () => {
        switch (selectedOption) {
            case 'de Emoções':
                return <EmotionPopup onClose={() => setIsEmotionPopupOpen(false)} />;
            case 'de Movimento':
                return <MovementPopup onClose={() => setIsMovementPopupOpen(false)} />;
            default:
                return null;
        }
    };

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'header':
                return (
                    <View>
                        <View style={styles.headerContainer}>
                            <FontAwesome name={'book'} size={32} color="orange" />
                            <Text style={styles.pageTitle}>Diários</Text>
                        </View>
                        <Image source={{ uri: imageUri }} style={styles.image} />
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                );
            case 'selector':
                return (
                    <View>
                        <TouchableOpacity style={[styles.selector, isSelectorOpen && styles.selectorOpen]} onPress={handleSelectorPress}>
                            <Text style={styles.selectorText}>{selectedOption}</Text>
                            <FontAwesome name={isSelectorOpen ? 'angle-up' : 'angle-down'} size={20} color="orange" />
                        </TouchableOpacity>
                        {isSelectorOpen && (
                            <View style={styles.optionsContainer}>
                                {options.map((option) => (
                                    <TouchableOpacity key={option} style={styles.option} onPress={() => handleOptionPress(option)}>
                                        <Text style={styles.optionText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                );
            case 'geometricShape2':
                return (
                    <View style={styles.geometricShape}>
                        <ScrollView style={{height: 300}}>
                            <DiHist DiaryId={diaryId} />
                        </ScrollView>
                    </View>
                );
            case 'geometricShape1':
                return (
                    <View style={styles.geometricShape}>
                        <ScrollView style={{height: 300}}>
                            <GraphDiary DiaryId={diaryId}/>
                        </ScrollView>
                    </View>
                );
            default:
                return null;
        }
    };

    const data = [
        { id: 'header', type: 'header' },
        { id: 'selector', type: 'selector' },
        { id: 'geometricShape1', type: 'geometricShape1' },
        { id: 'geometricShape2', type: 'geometricShape2' }, // New item for GraphDiary
    ];

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                />

                {isEmotionPopupOpen && renderPopup()}
                {isMovementPopupOpen && renderPopup()}

                <TouchableOpacity style={styles.addButton} onPress={() => selectedOption === 'de Emoções' ? toggleEmotionPopup() : toggleMovementPopup()}>
                    <FontAwesome name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    flatListContent: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    pageTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'orange',
        textAlign: 'center',
        left: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    geometricShape: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20, // spacing between shapes
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 25,
        marginBottom: 20,
    },
    selectorOpen: {
        marginBottom: 10,
    },
    selectorText: {
        fontSize: 16,
        color: 'orange',
    },
    optionsContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 5,
        marginBottom: 10,
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
    },
    optionText: {
        fontSize: 16,
        color: 'orange',
    },
    addButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'orange',
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default Diary;