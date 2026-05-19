import React, { useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Modal,
} from 'react-native';
import { COLORS } from '../constants/colors';
import ImageLoader from './image-loader';
import ImageViewer from 'react-native-image-zoom-viewer';

const { width, height } = Dimensions.get('window');

const AnimatedDot = ({ isActive }) => {
  const widthAnim = useRef(new Animated.Value(isActive ? 20 : 6)).current;

  React.useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isActive ? 20 : 6,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: widthAnim,
          backgroundColor: isActive ? COLORS.PRIMARY : COLORS.WHITE,
          opacity: isActive ? 1 : 0.7,
        },
      ]}
    />
  );
};

export default function HotelImagesCarousel({ banner }) {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = banner.map((option, i) => ({
    id: option.id,
    url: option.image,
  }));

  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item} key={item.id}>
        <TouchableHighlight
          onPressIn={() => setCurrentIndex(index)}
          onPress={() => setIsImageVisible(true)}>
          <ImageLoader image={item.image} style={styles.image} />
        </TouchableHighlight>
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
        width={width}
        height={250}
        data={banner}
        renderItem={renderItem}
        autoPlay={true}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        onSnapToItem={index => setCurrentIndex(index)}
      />
      <View style={styles.dotContainer}>
        {banner.map((_, i) => (
          <AnimatedDot key={i} isActive={i === currentIndex} />
        ))}
      </View>
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
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2.5,
    elevation: 2,
  },
});
