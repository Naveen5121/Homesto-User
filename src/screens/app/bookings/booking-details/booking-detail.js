import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import styles from './style';

import ActivityLoader from '../../../../components/activity-loader';
import API from '../../../../action/api';
import AlertMsg from '../../../../components/alert-msg';
import { useIsFocused } from '@react-navigation/native';

import { Divider } from 'react-native-paper';
import moment from 'moment';
import HotelImagesCarousel from '../../../../components/hotel-images-carousel';

export default function BookingsDetails(props) {
  const { orderId, isShowCancel } = props.route.params;

  const [showCancel, setShowCancel] = useState(isShowCancel);

  const isVisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const [bookingDetails, setbookingDetails] = useState(null);

  async function fetchData() {
    try {
      const data = await API.getBookingDetailById(orderId);

      // console.log(data);

      if (data.success === 'true') {
        setbookingDetails(data.extraData.order);

        setShowCancel(
          data.extraData.order.order_status === 'Cancel' ? false : true,
        );
        setIsLoading(false);
      } else {
        AlertMsg('Something went wrong..');

        setIsLoading(false);
        props.navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  }

  const changeDateFormat = date => {
    let momentDate = moment(date, 'DD-MM-YYYY');
    let formatedDate = moment(momentDate).format('ll');
    return formatedDate;
  };

  const calculateBookingDays = (checkInDate, checkOutDate) => {
    var start = moment(checkInDate, 'DD-MM-YYYY');
    var end = moment(checkOutDate, 'DD-MM-YYYY');

    const bookingDays = moment.duration(end.diff(start)).asDays();

    return bookingDays;
  };

  const calculateTotalAmount = () => {
    const amount =
      bookingDetails.booking_type === '1'
        ? bookingDetails.booking_amt_hr
        : bookingDetails.booking_price;

    const bookingDays =
      bookingDetails.booking_type === '1'
        ? bookingDetails.hrs
        : calculateBookingDays(
          bookingDetails.check_in_date,
          bookingDetails.check_out_date,
        );

    const totalAmount = parseInt(amount) * parseInt(bookingDays);

    return totalAmount;
  };

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      <StatusBar translucent={true} barStyle={'light-content'} />
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <ScrollView style={styles.container}>
        {!isLoading && (
          <>
            <HotelImagesCarousel
              banner={bookingDetails.image.map((option, i) => ({
                id: i,
                image: option,
              }))}
            />

            <View style={{ marginTop: 10 }}>
              <View style={styles.infoContainer}>
                <Text style={styles.hotelName}>
                  {bookingDetails.hotel_name}
                </Text>
                <Divider style={{ marginVertical: 10 }} />
                <Text style={styles.hotelAmount}>
                  ₹{' '}
                  {bookingDetails.booking_type === '1'
                    ? `${bookingDetails.booking_amt_hr} per hour`
                    : `${bookingDetails.booking_price} per night`}
                </Text>
                <Text style={styles.subheading}>
                  {bookingDetails.address}, {bookingDetails.city},{' '}
                  {bookingDetails.state}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(bookingDetails.g_map_link).catch(err =>
                      console.error("Couldn't load page", err),
                    );
                  }}
                >
                  <Text style={styles.map}>Show in map</Text>
                </TouchableOpacity>

                <View style={styles.infoList}>
                  {bookingDetails.order_status === 'Cancel' ? (
                    <Text style={styles.cancelStatus}>Cancelled</Text>
                  ) : (
                    <Text style={styles.status}>Confirmed</Text>
                  )}

                  <Text style={styles.bookingDate}>
                    {changeDateFormat(bookingDetails.booking_date)}
                  </Text>
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.heading}>Booking Details</Text>
                <Divider style={{ marginVertical: 10 }} />

                <View style={styles.infoList}>
                  <Text style={styles.infoHeading}>Booking ID</Text>
                  <Text style={styles.info}>#{bookingDetails.order_id}</Text>
                </View>

                <View style={styles.infoList}>
                  <Text style={styles.infoHeading}>Check-In Date</Text>
                  <Text style={styles.info}>
                    {changeDateFormat(bookingDetails.check_in_date)}
                  </Text>
                </View>
                {bookingDetails.booking_type === '1' ? (
                  <View style={styles.infoList}>
                    <Text style={styles.infoHeading}>Booking Hours</Text>
                    <Text style={styles.info}>{bookingDetails.hrs} hrs</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.infoList}>
                      <Text style={styles.infoHeading}>Check-Out Date</Text>
                      <Text style={styles.info}>
                        {changeDateFormat(bookingDetails.check_out_date)}
                      </Text>
                    </View>
                    <View style={styles.infoList}>
                      <Text style={styles.infoHeading}>No. of Days</Text>
                      <Text style={styles.info}>
                        {calculateBookingDays(
                          bookingDetails.check_in_date,
                          bookingDetails.check_out_date,
                        )}
                      </Text>
                    </View>
                  </>
                )}
                <View style={styles.infoList}>
                  <Text style={styles.infoHeading}>Adults</Text>
                  <Text style={styles.info}>{bookingDetails.no_of_adults}</Text>
                </View>
                <View style={styles.infoList}>
                  <Text style={styles.infoHeading}>Children</Text>
                  <Text style={styles.info}>{bookingDetails.no_of_childs}</Text>
                </View>

                <View style={styles.infoList}>
                  <Text style={styles.infoHeading}>Total Amount</Text>
                  <Text style={styles.info}>₹ {calculateTotalAmount()}/-</Text>
                </View>

                <View style={styles.infoList}>
                  <Text style={styles.infoHeading}>Payment ID</Text>
                  <Text style={styles.info}>
                    {bookingDetails.payment_id || '----'}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {showCancel && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => props.navigation.navigate('CancelBooking', orderId)}>
            <Text style={styles.cancelBtnTxt}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
