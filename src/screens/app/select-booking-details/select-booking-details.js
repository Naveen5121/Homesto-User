import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import styles from './style';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import moment from 'moment';
import AlertMsg from '../../../components/alert-msg';

export default function SelectBookingDetails(props) {
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [hourlyBooking, setHourlyBooking] = useState(false);
  const [hours, setHours] = useState(3);

  const { hotelDetails, bookingAmt, bookingAmtHrs, offerId, min_guest, max_guest } = props.route.params;
  const MIN_GUESTS = parseInt(min_guest) || 1;
  const MAX_GUESTS = parseInt(max_guest) || 4;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [checkInDate, setCheckInDate] = useState(moment().format('DD-MM-YYYY'));

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let date_format = moment(currentDate).format('DD-MM-YYYY');
    setDate(currentDate);
    if (event.type === 'set') {
      setCheckInDate(date_format);
      setCheckOutDate(moment(currentDate).add(1, 'days').format('DD-MM-YYYY'));
    }
    //else setCheckInDate(null);
  };

  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(
    moment().add(1, 'days').format('DD-MM-YYYY'),
  );

  const onChangeCheckout = (event, selectedDate) => {
    let currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    let date_format = moment(currentDate).format('DD-MM-YYYY');
    setDate2(currentDate);

    if (event.type === 'set') {
      setCheckOutDate(date_format);
    }
    //else setCheckInDate(null);
  };

  var start = moment(checkInDate, 'DD-MM-YYYY');
  var end = moment(checkOutDate, 'DD-MM-YYYY');

  const bookingDays = moment.duration(end.diff(start)).asDays();

  return (
    <>
      <StatusBar translucent={true} barStyle={'light-content'} />

      <ScrollView style={styles.container}>
        {show && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}

        {show2 && (
          <DateTimePicker
            value={date2}
            mode={'date'}
            display="default"
            minimumDate={moment(checkInDate, 'DD-MM-YYYY')
              .add(1, 'days')
              .toDate()}
            onChange={onChangeCheckout}
          />
        )}

        <View style={{ flex: 1, margin: 15 }}>
          <View style={styles.datesContainer}>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setShow(true)}>
              <Text style={styles.dateHeading}>ADD CHECK-IN DATE</Text>
              <Text style={styles.date}>{checkInDate}</Text>
            </TouchableOpacity>
            <View style={{ width: 0.5, backgroundColor: '#e6e6e6' }} />
            <TouchableOpacity
              style={styles.dateContainer}
              disabled={hourlyBooking ? true : false}
              onPress={() => setShow2(true)}>
              <Text style={styles.dateHeading}>ADD CHECK-OUT DATE</Text>
              <Text style={styles.date}>
                {hourlyBooking ? checkInDate : checkOutDate}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.datesCard}>
            <View style={styles.roomsContainer}>
              <TouchableOpacity style={styles.dateContainer}>
                <Text style={styles.guestTitle}>Adults</Text>
                <Text style={styles.guestAge}>Age 13y and above</Text>
              </TouchableOpacity>

              <View style={styles.toggleBtnContainer}>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => {
                    if (adult > 1) {
                      if (adult + children - 1 >= MIN_GUESTS) {
                        setAdult(adult - 1);
                      } else {
                        ToastAndroid.show(`Minimum ${MIN_GUESTS} guest(s) required`, ToastAndroid.SHORT);
                      }
                    }
                  }}>
                  <Ionicons
                    color={COLORS.BLACK}
                    name="remove-outline"
                    size={16}
                  />
                </TouchableOpacity>
                <Text style={styles.qty}>{adult}</Text>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => {
                    if (adult + children + 1 <= MAX_GUESTS) {
                      setAdult(adult + 1);
                    } else {
                      ToastAndroid.show(`Maximum ${MAX_GUESTS} guests allowed`, ToastAndroid.SHORT);
                    }
                  }}>
                  <Ionicons color={COLORS.BLACK} name="add-outline" size={16} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingVertical: 2.5 }} />
            <View style={styles.roomsContainer}>
              <TouchableOpacity style={styles.dateContainer}>
                <Text style={styles.guestTitle}>Children</Text>
                <Text style={styles.guestAge}>Ages 12y and below</Text>
              </TouchableOpacity>

              <View style={styles.toggleBtnContainer}>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => {
                    if (children > 0) {
                      if (adult + children - 1 >= MIN_GUESTS) {
                        setChildren(children - 1);
                      } else {
                        ToastAndroid.show(`Minimum ${MIN_GUESTS} guest(s) required`, ToastAndroid.SHORT);
                      }
                    }
                  }}>
                  <Ionicons
                    color={COLORS.BLACK}
                    name="remove-outline"
                    size={16}
                  />
                </TouchableOpacity>
                <Text style={styles.qty}>{children}</Text>
                <TouchableOpacity
                  style={styles.toggleBtn}
                  onPress={() => {
                    if (adult + children + 1 <= MAX_GUESTS) {
                      setChildren(children + 1);
                    } else {
                      ToastAndroid.show(`Maximum ${MAX_GUESTS} guests allowed`, ToastAndroid.SHORT);
                    }
                  }}>
                  <Ionicons color={COLORS.BLACK} name="add-outline" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {parseInt(hotelDetails.booking_amt_hr) > 0 && (
            <View style={styles.datesCard}>
              <View style={styles.roomsContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setHourlyBooking(!hourlyBooking)}>
                  {hourlyBooking && (
                    <Ionicons color={COLORS.WHITE} name="checkmark" size={16} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.guestTitle}>Per hour booking</Text>
                  {hourlyBooking && (
                    <Text style={styles.guestAge}>Select no of hours</Text>
                  )}
                </TouchableOpacity>

                {hourlyBooking && (
                  <View style={styles.toggleBtnContainer}>
                    <TouchableOpacity
                      style={styles.toggleBtn}
                      onPress={() => hours > 3 && setHours(hours - 1)}>
                      <Ionicons
                        color={COLORS.BLACK}
                        name="remove-outline"
                        size={16}
                      />
                    </TouchableOpacity>
                    <Text style={styles.qty}>{hours}</Text>
                    <TouchableOpacity
                      style={styles.toggleBtn}
                      onPress={() => setHours(hours + 1)}>
                      <Ionicons
                        color={COLORS.BLACK}
                        name="add-outline"
                        size={16}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bookBtn}
          // onPress={() => props.navigation.navigate('Booking')}
          onPress={() =>
            props.navigation.navigate('ReviewBooking', {
              checkInDate,
              checkOutDate: hourlyBooking ? checkInDate : checkOutDate,
              adult,
              children,
              hotelDetails,
              bookingAmt,
              bookingAmtHrs,
              offerId,
              hourlyBooking,
              hours,
              bookingDays,
            })
          }>
          <Text style={styles.bookBtnTxt}>Book now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
