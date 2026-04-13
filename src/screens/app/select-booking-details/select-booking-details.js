import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  ToastAndroid,
  Modal,
} from 'react-native';
import styles from './style';
import CalendarPicker from 'react-native-calendar-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import moment from 'moment';
import AlertMsg from '../../../components/alert-msg';
import API from '../../../action/api';
import ImageLoader from '../../../components/image-loader';
import ActivityLoader from '../../../components/activity-loader';
import { PAYMENT } from '../../../components/razorpay-payment';

export default function SelectBookingDetails(props) {
  const [hourlyBooking, setHourlyBooking] = useState(false);
  const [hours, setHours] = useState(3);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [rooms, setRooms] = useState([]);
  // Each entry is a cloned room instance with its own guest counts
  const [selectedRooms, setSelectedRooms] = useState([]); // [{instanceId, room, adult, children}]
  const [loading, setLoading] = useState(false);


  console.log('selectedRooms', selectedRooms);
  console.log('selectedRoomType', selectedRoomType);
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
        setSelectedRooms([]);
      } else {
        setRooms([]);
        setSelectedRooms([]);
      }
    } catch (error) {
      console.log('Error fetching rooms:', error);
    }
  };

  const addRoom = (room) => {
    const minG = parseInt(room.min_no_guest) || 1;
    setSelectedRooms(prev => [
      ...prev,
      { instanceId: Date.now() + Math.random(), room, adult: minG, children: 0 },
    ]);
  };

  const removeInstance = (instanceId) => {
    setSelectedRooms(prev => prev.filter(r => r.instanceId !== instanceId));
  };

  const updateGuests = (instanceId, field, delta) => {
    setSelectedRooms(prev => prev.map(r => {
      if (r.instanceId !== instanceId) return r;
      const minG = parseInt(r.room.min_no_guest) || 1;
      const maxG = parseInt(r.room.max_no_guest) || 4;
      const newAdult = field === 'adult' ? r.adult + delta : r.adult;
      const newChildren = field === 'children' ? r.children + delta : r.children;
      if (newAdult < 1) return r;
      if (newChildren < 0) return r;
      if (newAdult + newChildren < minG) {
        ToastAndroid.show(`Minimum ${minG} guest(s) required`, ToastAndroid.SHORT);
        return r;
      }
      if (newAdult + newChildren > maxG) {
        ToastAndroid.show(`Maximum ${maxG} guests allowed`, ToastAndroid.SHORT);
        return r;
      }
      return { ...r, adult: newAdult, children: newChildren };
    }));
  };

  const bookNow = async () => {
    if (!selectedRoomType && roomTypes.length > 0) {
      ToastAndroid.show('Please select a room type', ToastAndroid.SHORT);
      return;
    }
    if (selectedRooms.length === 0 && rooms.length > 0) {
      ToastAndroid.show('Please add at least one room', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      // Fetch user profile for Razorpay prefill
      const profileRes = await API.getUserProfile();
      if (!profileRes || profileRes.success !== 'true') {
        ToastAndroid.show('Failed to fetch user profile', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      const profile = profileRes.extraData.profile;

      const days = bookingDays === 0 ? 1 : bookingDays;
      const totalAmount = selectedRooms.reduce((sum, { room }) => {
        const price = hourlyBooking
          ? parseInt(room.price_hour || 0) * hours
          : parseInt(room.price || 0) * days;
        return sum + price;
      }, 0);

      // Open Razorpay Checkout
      const paymentData = await PAYMENT.RazorpayPayment({ ...profile, mobileNo: profile.phone }, totalAmount);

      if (paymentData && paymentData.razorpay_payment_id) {
        // Group instances by room id so the API gets one entry per unique room
        const roomGroups = Object.values(
          selectedRooms.reduce((acc, { room, adult }) => {
            if (acc[room.id]) {
              acc[room.id].qty += 1;
              acc[room.id].adults += adult;
            } else {
              acc[room.id] = { roomId: room.id, qty: 1, adults: adult };
            }
            return acc;
          }, {}),
        );

        const payload = {
          hotel_id: hotelDetails.id,
          check_in: moment(checkInDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
          check_out: hourlyBooking
            ? moment(checkInDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
            : moment(checkOutDate, 'DD-MM-YYYY').format('YYYY-MM-DD'),
          offer_id: offerId || 0,
          booking_type: hourlyBooking ? 'hourly' : 'online',
          hrs: hourlyBooking ? hours : 0,
          payment_id: paymentData.razorpay_payment_id,
          'room_id[]': roomGroups.map(g => g.roomId),
          'no_of_adults[]': roomGroups.map(g => g.adults),
          'room_qty[]': roomGroups.map(g => g.qty),
          no_of_childs: selectedRooms.reduce((sum, r) => sum + r.children, 0),
          total_amt: totalAmount,
        };

        console.log('Payload==========>:', payload);

        const res = await API.bookHotel(payload);
        if (res && res.success === 'true') {
          ToastAndroid.show('Booking successful!', ToastAndroid.SHORT);
          props.navigation.navigate('ConfirmBooking', {
            checkInDate,
            checkOutDate: hourlyBooking ? checkInDate : checkOutDate,
            hotelDetails,
            bookingAmt,
            bookingAmtHrs,
            offerId,
            hourlyBooking,
            hours,
            bookingDays: days,
            selectedRoomType,
            selectedRooms,
            totalAmount,
            payment_id: paymentData.razorpay_payment_id,
          });
        } else {
          const errorMsg = res && res.extraData ? Object.values(res.extraData).join(', ') : 'Booking failed';
          ToastAndroid.show(errorMsg, ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.show('Payment cancelled or failed', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error in booking flow:', error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [checkInDate, setCheckInDate] = useState(moment().format('DD-MM-YYYY'));

  const onDateChange = (selectedDate) => {
    if (!selectedDate) return;
    let currentDate = moment(selectedDate).toDate();
    let date_format = moment(currentDate).format('DD-MM-YYYY');
    setDate(currentDate);
    setCheckInDate(date_format);
    setCheckOutDate(moment(currentDate).add(1, 'days').format('DD-MM-YYYY'));
    setShow(false);
  };

  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(
    moment().add(1, 'days').format('DD-MM-YYYY'),
  );

  const onDateChangeCheckout = (selectedDate) => {
    if (!selectedDate) return;
    let currentDate = moment(selectedDate).toDate();
    let date_format = moment(currentDate).format('DD-MM-YYYY');
    setDate2(currentDate);
    setCheckOutDate(date_format);
    setShow2(false);
  };

  var start = moment(checkInDate, 'DD-MM-YYYY');
  var end = moment(checkOutDate, 'DD-MM-YYYY');

  const bookingDays = moment.duration(end.diff(start)).asDays();

  console.log("rooms", rooms);


  return (
    <>
      <StatusBar translucent={true} barStyle={'light-content'} />

      <ScrollView style={styles.container}>
        <Modal
          visible={show}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShow(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Check-In Date</Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Ionicons name="close" size={24} color={COLORS.BLACK} />
                </TouchableOpacity>
              </View>
              <CalendarPicker
                onDateChange={onDateChange}
                minDate={new Date()}
                selectedDayColor={COLORS.PRIMARY}
                selectedDayTextColor={COLORS.WHITE}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={show2}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShow2(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Check-Out Date</Text>
                <TouchableOpacity onPress={() => setShow2(false)}>
                  <Ionicons name="close" size={24} color={COLORS.BLACK} />
                </TouchableOpacity>
              </View>
              <CalendarPicker
                onDateChange={onDateChangeCheckout}
                minDate={moment(checkInDate, 'DD-MM-YYYY').add(1, 'days').toDate()}
                selectedDayColor={COLORS.PRIMARY}
                selectedDayTextColor={COLORS.WHITE}
              />
            </View>
          </View>
        </Modal>

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
                    <View key={index} style={styles.roomItem}>
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
                      <TouchableOpacity
                        style={styles.roomAddBtn}
                        onPress={() => addRoom(room)}>
                        <Ionicons name="add" size={18} color={COLORS.WHITE} />
                        <Text style={styles.roomAddBtnText}>Add Room</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}


          {selectedRooms.length > 0 && (
            <View style={styles.selectedRoomsSection}>
              <Text style={styles.roomTypeTitle}>Added Rooms</Text>
              {selectedRooms.map((item, idx) => (
                <View key={item.instanceId} style={styles.selectedRoomCard}>
                  {/* Header */}
                  <View style={styles.selectedRoomHeader}>
                    <Text style={styles.selectedRoomName}>
                      Room {idx + 1} — {item.room.room_name}
                    </Text>
                    <TouchableOpacity onPress={() => removeInstance(item.instanceId)}>
                      <Ionicons name="close-circle" size={22} color="#e53935" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.selectedRoomPrice}>₹{item.room.price} / night</Text>

                  {/* Adults */}
                  <View style={styles.roomsContainer}>
                    <View style={styles.dateContainer}>
                      <Text style={styles.guestTitle}>Adults</Text>
                      <Text style={styles.guestAge}>Age 13y and above</Text>
                    </View>
                    <View style={styles.toggleBtnContainer}>
                      <TouchableOpacity
                        style={styles.toggleBtn}
                        onPress={() => updateGuests(item.instanceId, 'adult', -1)}>
                        <Ionicons color={COLORS.BLACK} name="remove-outline" size={16} />
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.adult}</Text>
                      <TouchableOpacity
                        style={styles.toggleBtn}
                        onPress={() => updateGuests(item.instanceId, 'adult', 1)}>
                        <Ionicons color={COLORS.BLACK} name="add-outline" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Children */}
                  <View style={styles.roomsContainer}>
                    <View style={styles.dateContainer}>
                      <Text style={styles.guestTitle}>Children</Text>
                      <Text style={styles.guestAge}>Ages 12y and below</Text>
                    </View>
                    <View style={styles.toggleBtnContainer}>
                      <TouchableOpacity
                        style={styles.toggleBtn}
                        onPress={() => updateGuests(item.instanceId, 'children', -1)}>
                        <Ionicons color={COLORS.BLACK} name="remove-outline" size={16} />
                      </TouchableOpacity>
                      <Text style={styles.qty}>{item.children}</Text>
                      <TouchableOpacity
                        style={styles.toggleBtn}
                        onPress={() => updateGuests(item.instanceId, 'children', 1)}>
                        <Ionicons color={COLORS.BLACK} name="add-outline" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
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
          disabled={selectedRooms.length === 0 || loading}
          style={[styles.bookBtn, { opacity: selectedRooms.length > 0 && !loading ? 1 : 0.5 }]}
          onPress={bookNow}>
          <Text style={styles.bookBtnTxt}>Book now</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityLoader isLoading={loading} />}
    </>
  );
}
