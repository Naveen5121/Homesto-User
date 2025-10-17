import React, {useEffect} from 'react';
import {Image, StatusBar, TouchableOpacity} from 'react-native';
import {View, Text} from 'react-native';
import styles from './style';
import {BackHandler} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../constants/colors';
import {IMAGES} from '../../../constants/images';
import ImageLoader from '../../../components/image-loader';

export default function ConfirmBooking(props) {
  const {
    hotelDetails,
    bookingAmt,
    bookingAmtHrs,
    hourlyBooking,
    hours,
    bookingDays,
  } = props.route.params;

  console.log(
    hotelDetails,
    bookingAmt,
    bookingAmtHrs,
    hourlyBooking,
    hours,
    bookingDays,
  );

  function handleBackButtonClick() {
    props.navigation.navigate('Home');
    return true;
  }

  function bookingPrice() {
    const discountedPrice = hourlyBooking
      ? parseInt(bookingAmtHrs) * hours + ` (for ${hours} hrs)`
      : parseInt(bookingAmt) * bookingDays +
        ` (for ${bookingDays}${bookingDays === 1 ? ' Day' : ' Days'})`;

    const hotelPrice = hourlyBooking
      ? parseInt(hotelDetails.booking_amt_hr) * hours + ` (for ${hours} hrs)`
      : parseInt(hotelDetails.booking_amt) * bookingDays +
        ` (for ${bookingDays}${bookingDays === 1 ? ' Day' : ' Days'})`;

    const price = bookingAmt && bookingAmtHrs ? discountedPrice : hotelPrice;

    return price;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function handleGoToBookings() {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
    props.navigation.navigate('Bookings_');

    return true;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={{position: 'absolute', top: 45, left: 20}}
          onPress={() => handleBackButtonClick()}>
          <Feather name="chevron-left" color={COLORS.WHITE} size={30} />
        </TouchableOpacity>
        <Feather name="check-circle" color={COLORS.WHITE} size={80} />
        <Text style={styles.heading}>Your booking Confirmed</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.hotelcard}>
          <ImageLoader image={hotelDetails.gallery[0]} style={styles.image} />

          <View style={{padding: 5}}>
            <Text style={styles.name}>{hotelDetails.hotelname}</Text>
            <Text style={styles.hotelInfo} numberOfLines={5}>
              {hotelDetails.description}
            </Text>

            <View style={styles.hotelInfoContainer}>
              <Text style={styles.price}>₹{bookingPrice()}</Text>
              {/*   <Text style={styles.details}>View Details ➨</Text> */}
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => handleGoToBookings()}>
        <Text style={styles.btnTxt}>Go To Bookings</Text>
      </TouchableOpacity>
    </View>
  );
}
