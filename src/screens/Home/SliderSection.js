import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import SliderGeo from '../../../Components/SliderGeo';
import styles from './styles';

const SliderSection = ({ percentages, navigation, menuData }) => {

  const handleNavigation = (screen) => () => {
    navigation.navigate(screen);
  };

  // Mapping the fetched data to render SliderGeo components dynamically
  return (
    <View style={styles.container}>
      {menuData.map((item) => {
        // Determine the correct icon and percentage based on the item data
        let iconName = '';
        let percentage = 0;

        // Map each item to the correct icon and percentage
        switch (item.sigla) {
          case 'Mente':
            iconName = 'head-lightbulb-outline';
            percentage = percentages.mente || 0;
            break;
          case 'Estilo de vida':
            iconName = 'running';
            percentage = percentages.lifestyle || 0;
            break;
          case 'Corpo':
            iconName = 'body';
            percentage = percentages.corpo || 0;
            break;
          case 'Avaliação inicial':
            iconName = 'help-circle-outline';
            percentage = percentages.initeval || 0;
            break;
          default:
            iconName = 'help-circle-outline'; // default icon if not matched
            percentage = 0; // default percentage if not matched
        }

        return (
          <TouchableOpacity key={item.id} onPress={handleNavigation(item.sigla)}>
            <SliderGeo
              iconName={iconName}
              percentage={percentage}
              title={item.sigla}
              id={item.id}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SliderSection;
