import React, { useState } from 'react';
import { View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Banner = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.bannerContainer}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.bannerImage} resizeMode="stretch" />
        )}
        onScrollToIndexFailed={() => {}}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: screenWidth - 30, // Adjusted for padding/margin if needed
          offset: (screenWidth - 30) * index,
          index,
        })}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: index === currentIndex ? 'orange' : '#ccc' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: 50,
    height: 400,
    marginBottom: 15,
    alignItems: 'center', // Center the container
  },
  bannerImage: {
    width: screenWidth - 30, // Adjust width based on screen size
    height: 400,
    borderRadius: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Banner;
