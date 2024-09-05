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
        renderItem={({ item, index }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.bannerImage} resizeMode="stretch" />
          </View>
        )}
        onScrollToIndexFailed={() => {}}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: screenWidth - 30,
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
    alignItems: 'center',
  },
  imageContainer: {
    width: screenWidth - 30,
    height: 400,
    borderRadius: 30,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    top: '66%',
    left: '45%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(255, 165, 0, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
