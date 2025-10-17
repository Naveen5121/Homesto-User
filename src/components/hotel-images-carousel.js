import React, {useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {COLORS} from '../constants/colors';
import ImageLoader from './image-loader';
const {width, height} = Dimensions.get('window');
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function HotelImagesCarousel({banner}) {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = banner.map((option, i) => ({
    id: option.id,
    url: option.image,
  }));

  const carouselRef = useRef(null);

  const renderItem = ({item}) => {
    return (
      <View style={styles.item} key={item.id}>
        <TouchableHighlight
          onPressIn={() => setCurrentIndex(item.id)}
          onPress={() => [setIsImageVisible(true)]}>
          <ImageLoader image={item.image} style={styles.image} />
        </TouchableHighlight>

        <View style={styles.dotContainer}>
          {banner.map((data, i) => (
            <View
              key={i}
              style={item.id === data.id ? styles.activeDot : styles.dot}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}>
        <ImageViewer
          backgroundColor={COLORS.BLACK}
          index={currentIndex}
          imageUrls={images}
        />
      </Modal>
      <Carousel
        ref={carouselRef}
        sliderWidth={width}
        sliderHeight={width}
        itemWidth={width}
        data={banner}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  item: {
    width: width,
    height: 250,
    elevation: 3,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
  },
  image: {
    //resizeMode: 'stretch',
    width: width,
    height: 250,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  activeDot: {
    height: 7,
    width: 7,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 7,
    marginHorizontal: 2.5,
    elevation: 2,
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    marginHorizontal: 2.5,
    elevation: 2,
  },
});
