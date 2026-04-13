import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  ScrollView,
} from 'react-native';
import styles from './style';
import PopularHotelCard from '../../../components/popular-hotel-card';
import HotelCard from '../../../components/hotel-card';
import { IMAGES } from '../../../constants/images';
import { useIsFocused } from '@react-navigation/native';

import ToastAlertMsg from '../../../components/toast-alert-msg';
import ActivityLoader from '../../../components/activity-loader';
import { AuthContext } from '../../../../auth-context';
import API from '../../../action/api';

export default function HomeScreen(props) {
  // const {location} = React.useContext(AuthContext);
  // console.log(location);

  const scrollY = useRef(new Animated.Value(0)).current;
  const isVisible = useIsFocused();
  const [hotelCategory, setHotelCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hotelOffeer, setHotelOffer] = useState([]);
  const category = [
    {
      image:
        'https://www.ihcltata.com/content/dam/luxury/hotels/Taj_Lands_End_Mumbai/images/4x3/R&S_WOGLI_Exterior-Master.jpg',
      title: 'Hotel',
      onPress: () => props.navigation.navigate('Hotels'),
    },
    {
      image:
        'https://traveltradejournal.com/wp-content/uploads/2022/02/Air-India.jpg',
      title: 'Flight',
      onPress: () => props.navigation.navigate('FlightHome'),
    },
    {
      image:
        'https://i.pinimg.com/564x/d8/dd/36/d8dd361e6758f12f8768f48c5f38fb28.jpg',
      title: 'Bus',
      onPress: () => { },
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/e/ef/Wilderness_Adventure_Camps.jpg',
      title: 'More',
      onPress: () => { },
    },
  ];

  const hotelioOffers = [
    {
      image:
        'https://media.cntraveler.com/photos/5a009c8e25be133d871c008e/16:9/w_2560%2Cc_limit/Mountain-Travel_GettyImages-503689316.jpg',
      heading: 'The hills are calling you ',
      info: 'Grab Up to 40% OFF* on Stays in the hills of North India.',
    },
    {
      image:
        'https://sonicchartersstthomas.com/wp-content/uploads/2018/08/67475793_m-1080x675.jpg',
      heading: 'For Unique and Memorable Summer Gateways:',
      info: 'Book Our Homestays & Villas @ Up to 40% OFF*',
    },
  ];

  const offers = [
    {
      image: 'https://gos3.ibcdn.com/offer-1716275933.jpg',
      hotelname: 'Zeyzang Resort Hotel',
      city_name: 'Rohini West',
      state_name: 'New Delhi',
      booking_amt: '200',
    },
    {
      image: 'https://gos3.ibcdn.com/offers-640X268-1715961839.jpg',
      hotelname: 'Zeyzang Resort Hotel',
      city_name: 'Rohini West',
      state_name: 'New Delhi',
      booking_amt: '200',
    },
  ];

  const boxContainerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const boxContainerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  async function fetchData() {
    try {
      const data = await API.getPropertyType();
      const offer = await API.getHomeScreenOffersList();

      if (!offer.error) {
        setHotelOffer(offer.data);
        //console.log(offer.data);
        // ToastAlertMsg('offeer fetched successfully!');
      } else {
        setHotelOffer([]);
        ToastAlertMsg('No offer found!');
      }

      //  console.log(data);
      if (data.error) {
        ToastAlertMsg(data.message);
        console.log(data.error);
        setIsLoading(false);
      } else {
        //updateUserProfile({userProfile: data.data[0]});
        setHotelCategory(data.data);

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}>
        <View style={styles.containerStyle}>
          <View style={styles.arcContainerStyle}>
            <View style={styles.arc} />
          </View>
        </View>
        <Animated.View
          style={[
            styles.catContainer,
            {
              transform: [{ translateY: boxContainerTranslateY }],
              opacity: boxContainerOpacity,
            },
          ]}>
          {category.map((data, i) => (
            <TouchableOpacity style={styles.box} key={i} onPress={data.onPress}>
              <Image style={{ height: 70 }} source={{ uri: data.image }} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{data.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <View style={[styles.subCatContainer]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: 5 }}>
            {hotelCategory.map((data, i) => (
              <View style={styles.subCatCard} key={i}>
                <Image style={styles.subCatImage} source={IMAGES.LOGO} />
                <View style={styles.subCatTitleContainer}>
                  <Text style={styles.subCat}>{data.title}</Text>
                </View>
              </View>
            ))}
            <View style={{ marginHorizontal: 10 }} />
          </ScrollView>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.heading}>HOMESTO's Offer</Text>
          </View>
          <ScrollView
            style={{ paddingLeft: 15 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {hotelOffeer.map((item, i) => (
              <TouchableOpacity style={styles.offerContainer} key={i}>
                <TouchableHighlight>
                  <Image
                    source={{
                      uri:
                        item.image ||
                        'https://media.cntraveler.com/photos/5a009c8e25be133d871c008e/16:9/w_2560%2Cc_limit/Mountain-Travel_GettyImages-503689316.jpg',
                    }}
                    style={styles.packageImage}
                  />
                </TouchableHighlight>

                <View style={styles.offerInfoContainer}>
                  <Text style={styles.desc}>{item.title}</Text>
                  <Text style={styles.offerInfo}>{item.description}</Text>
                  <Text style={styles.tc}>T&C's Apply</Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ marginHorizontal: 10 }} />
          </ScrollView>
        </View>
        <View style={styles.infoContainer}>
          <Image
            source={{
              uri: 'https://www.munnar.com/Great_Escapes_Resort_Munnar/images/Great%20Escapes%20Resorts-Munnar-KErala-India-Banner.jpg',
            }}
            style={styles.banner}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>Hotelio Stays</Text>
              <Text style={styles.subHeading}>
                Top Rated affordable properties
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeall}>Know More</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 17 }}>
            <Text style={styles.facility}>✅ 100 % Money Back Gurantee*</Text>
            <Text style={styles.facility}>✅ Hassle-Free Check-In</Text>

            <Text style={styles.remark}>
              *If yo do not get clean rooms with TV, AC & Free Wifi
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.heading}>Today's Offer</Text>
          </View>
          <ScrollView
            style={{ paddingLeft: 15 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {offers.map((item, i) => (
              <TouchableOpacity style={styles.offerContainer} key={i}>
                <TouchableHighlight>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.packageImage}
                  />
                </TouchableHighlight>

                <View style={styles.offerInfoContainer}>
                  <Text style={styles.desc}>
                    Get up to 45% OFF on selected hotels & homestays
                  </Text>
                  <Text style={styles.validity}>
                    Offer validity : 28 June, 2024
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={{ marginHorizontal: 10 }} />
          </ScrollView>
        </View>
      </Animated.ScrollView>
    </>
  );
}
