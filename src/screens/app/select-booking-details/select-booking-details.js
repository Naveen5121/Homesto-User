import React, { useState, useEffect } from 'react';
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
import API from '../../../action/api';
import ImageLoader from '../../../components/image-loader';
import ActivityLoader from '../../../components/activity-loader';

export default function SelectBookingDetails(props) {
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [hourlyBooking, setHourlyBooking] = useState(false);
  const [hours, setHours] = useState(3);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  const { hotelDetails, bookingAmt, bookingAmtHrs, offerId, min_guest, max_guest } = props.route.params;

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const res = await API.getRoomTypes();
      if (res && res.success === 'true') {
        setRoomTypes(res.extraData.roomtype);
      }
    } catch (error) {
      console.log('Error fetching room types:', error);
    }
  };
  const fetchRoomsByType = async (typeId) => {
    try {
      const res = await API.getRoomsByTypeAndHotelId(hotelDetails.id, typeId);
      if (res && res.success === 'true') {
        setRooms(res.extraData.roomtype);
        setSelectedRoom(null); // Don't select by default
      } else {
        setRooms([]);
        setSelectedRoom(null);
      }
    } catch (error) {
      console.log('Error fetching rooms:', error);
    }
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    const minG = parseInt(room.min_no_guest) || 1;
    const maxG = parseInt(room.max_no_guest) || 4;

    // Adjust adult and children counts to fit within new limits if necessary
    if (adult + children < minG) {
      setAdult(minG);
      setChildren(0);
    } else if (adult + children > maxG) {
      if (adult > maxG) {
        setAdult(maxG);
        setChildren(0);
      } else {
        setChildren(maxG - adult);
      }
    }
  };

  const bookNow = async () => {
    if (!selectedRoomType && roomTypes.length > 0) {
      ToastAndroid.show('Please select a room type', ToastAndroid.SHORT);
      return;
    }
    if (!selectedRoom && rooms.length > 0) {
      ToastAndroid.show('Please select a room', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    const totalAmount = hourlyBooking
      ? parseInt(selectedRoom.price_hour || 0) * hours
      : parseInt(selectedRoom.price || 0) * (bookingDays === 0 ? 1 : bookingDays);

    const payload = {
      hotel_id: hotelDetails.id,
      check_in: checkInDate,
      check_out: hourlyBooking ? checkInDate : checkOutDate,
      'no_of_adults[]': [adult],
      no_of_childs: children,
      offer_id: offerId || 0,
      booking_type: hourlyBooking ? 2 : 1,
      hrs: hourlyBooking ? hours : 0,
      payment_id: 0,
      'room_id[]': [selectedRoom.id],
      total_amt: totalAmount,
      'room_qty[]': [1],
    };

    try {
      const res = await API.bookHotel(payload);
      if (res && res.success === 'true') {
        ToastAndroid.show('Booking successful!', ToastAndroid.SHORT);
        props.navigation.navigate('ConfirmBooking', {
          checkInDate,
          checkOutDate: hourlyBooking ? checkInDate : checkOutDate,
          adult,
          children,
          hotelDetails,
          bookingAmt: selectedRoom ? selectedRoom.price : bookingAmt,
          bookingAmtHrs,
          offerId,
          hourlyBooking,
          hours,
          bookingDays: bookingDays === 0 ? 1 : bookingDays,
          selectedRoomType,
          selectedRoom,
          totalAmount,
        });
      } else {
        const errorMsg = res && res.extraData ? Object.values(res.extraData).join(', ') : 'Booking failed';
        ToastAndroid.show(errorMsg, ToastAndroid.LONG);
      }
    } catch (error) {
      console.log('Error booking hotel:', error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const MIN_GUESTS = selectedRoom ? parseInt(selectedRoom.min_no_guest) || 1 : parseInt(min_guest) || 1;
  const MAX_GUESTS = selectedRoom ? parseInt(selectedRoom.max_no_guest) || 4 : parseInt(max_guest) || 4;

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
          {roomTypes.length > 0 && (
            <View style={styles.roomTypeContainer}>
              <Text style={styles.roomTypeTitle}>Select Room Type</Text>
              <View style={styles.roomTypeItemContainer}>

                {roomTypes.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.roomTypeItem,
                      selectedRoomType?.id === item.id && styles.roomTypeItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedRoomType(item);
                      fetchRoomsByType(item.id);
                    }}>
                    <Text style={styles.roomTypeText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {rooms.length > 0 && (
                <View style={styles.roomListContainer}>
                  <Text style={styles.roomTypeTitle}>Select a Room</Text>
                  {rooms.map((room, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.roomItem,
                        selectedRoom?.id === room.id && styles.roomItemSelected,
                      ]}
                      onPress={() => handleRoomSelection(room)}>
                      <ImageLoader image={room.room_images} style={styles.roomImage} />
                      <View style={styles.roomInfo}>
                        <Text style={styles.roomName}>{room.room_name}</Text>
                        <Text style={styles.roomPrice}>₹{room.price}</Text>
                        <Text style={styles.roomDetails}>
                          Guests: {room.min_no_guest} - {room.max_no_guest}
                        </Text>
                        <View style={styles.roomBadgeContainer}>
                          {room.ro === '1' && (
                            <View style={styles.roomBadge}>
                              <Text style={styles.roomBadgeText}>Room Only</Text>
                            </View>
                          )}
                          {room.bb === '1' && (
                            <View style={styles.roomBadge}>
                              <Text style={styles.roomBadgeText}>Breakfast</Text>
                            </View>
                          )}
                          {room.hb === '1' && (
                            <View style={styles.roomBadge}>
                              <Text style={styles.roomBadgeText}>Half Board</Text>
                            </View>
                          )}
                          {room.fb === '1' && (
                            <View style={styles.roomBadge}>
                              <Text style={styles.roomBadgeText}>Full Board</Text>
                            </View>
                          )}
                          {room.ai === '1' && (
                            <View style={styles.roomBadge}>
                              <Text style={styles.roomBadgeText}>All Inclusive</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}


          {selectedRoom && (
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
          )}


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
          disabled={!selectedRoom || loading}
          style={[styles.bookBtn, { opacity: selectedRoom && !loading ? 1 : 0.5 }]}
          onPress={bookNow}>
          <Text style={styles.bookBtnTxt}>Book now</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityLoader isLoading={loading} />}
    </>
  );
}
