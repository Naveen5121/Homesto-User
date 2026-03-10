import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './style';
import PopularHotelCard from '../../../../components/popular-hotel-card';
import Feather from 'react-native-vector-icons/Feather';
import HotelCard from '../../../../components/hotel-card';
import { COLORS } from '../../../../constants/colors';
import CalendarPicker from 'react-native-calendar-picker';
import { Divider } from 'react-native-paper';
import moment from 'moment';
import { FONT_FAMILY } from '../../../../constants/font-family';
import { useIsFocused } from '@react-navigation/native';

import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';
import GetLocation from 'react-native-get-location';
import { ICONS } from '../../../../constants/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../../../auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../../../action/api';
import SearchTextbox from '../../../../components/search-textbox';
import BannerCarousel from '../../../../components/banner-carousel';
const { width } = Dimensions.get('window');

const bannerData = [
  {
    image: 'https://munnar.com/uploads/hotel_photos/1757765796_68c560a4e2d63.webp',
    description: 'Special summer discount on all deluxe rooms'
  },
  {
    image: 'https://www.munnar.com/Great_Escapes_Resort_Munnar/images/Great%20Escapes%20Resorts-Munnar-KErala-India-Banner.jpg',
    description: 'Experience luxury in the heart of nature'
  },
  {
    image: 'https://munnar.com/uploads/hotel_photos/1757765796_68c560a4e2d63.webp',
    description: 'Book now and get free breakfast for two'
  },
];

export default function Hotels(props) {
  const isVisible = useIsFocused();
  const { updateUserProfile, signOut } =
    React.useContext(AuthContext).authContext;
  const [isLoading, setIsLoading] = useState(false);
  const [hotelList, setHotelList] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredHotels(hotelList);
    } else {
      const filtered = hotelList.filter(item =>
        item.hotelname?.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.city_name?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  }, [searchValue, hotelList]);

  async function fetchData() {
    try {
      setIsLoading(true);

      const profile = await API.getUserProfile();
      const hotel_list = await API.getHotelList();

      if (profile.success === 'true') {
        updateUserProfile({ userProfile: profile.extraData.profile });
      } else {
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('accessToken');
        signOut({});
      }

      if (hotel_list.success === 'true') {
        // setHotelList(hotel_list.extraData.hot);
        const hotels = hotel_list.extraData.all_hotels.filter(
          item => item.category_name === 'Hotel',
        );
        setHotelList(hotels);
        setFilteredHotels(hotels);
        setIsLoading(false);
      } else {
        ToastAlertMsg('No Records Found');
        setHotelList([]);
        setFilteredHotels([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdultChange = newAdultCount => {
    const calculatedRooms = Math.ceil(newAdultCount / 3);
    room;
    setAdult(newAdultCount);
    setRoom(calculatedRooms);
  };

  const handleRoomChange = newRoomCount => {
    const maxAdults = newRoomCount * 3;
    if (adult > maxAdults) {
      setAdult(maxAdults);
    }
    setRoom(newRoomCount);
  };




  const [selectedStartDate, setSelectedStartDate] = useState(moment().format());
  const [selectedEndDate, setSelectedEndDate] = useState(
    moment().add(1, 'days').format(),
  );
  const [modalVisible, setModalVisible] = useState(false);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };



  const [loading, setLoading] = useState(false);

  const [suggestionsList, setSuggestionsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const minDate = new Date(); // Today

  const startDate = selectedStartDate
    ? moment(selectedStartDate).format('ll')
    : '';

  const endDate = selectedEndDate ? moment(selectedEndDate).format('ll') : '';



  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <SearchTextbox
        title="Search Hotels, Cities..."
        value={searchValue}
        onChangeText={setSearchValue}
        onPress={() => setIsModalVisible(true)}
        showFilter={false}
      />
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.topOfferBanner}>
            <Text style={styles.bannerTitle}>
              {`HOURLY\n`}
              <Text style={{ fontSize: 12, color: COLORS.BLACK }}>{`STAYS`}</Text>
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerInfo}>BOOK FOR 3,6 OR 9 HOURS</Text>
              <Text style={styles.bannerSubInfo}>
                Flexible slots, great savings
              </Text>
            </View>
            {/*   <Feather name="chevron-right" size={16} color={COLORS.BLACK} /> */}
          </View>
        </View>



        <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>HOMESTO Stays</Text>
              <Text style={styles.subHeading}>
                Top Rated affordable properties
              </Text>
            </View>
            {/*  <TouchableOpacity>
              <Text style={styles.seeall}>Know More</Text>
            </TouchableOpacity> */}
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
            <Text style={styles.heading}>Exclusive Offers</Text>
          </View>
          <BannerCarousel data={bannerData} showPagination={false} interval={3500} />

        </View>



        {filteredHotels.length > 0 && (
          <View style={styles.infoContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.heading}>Best Deals</Text>
            </View>
            <View style={{ paddingHorizontal: 12.5 }}>
              <FlatList
                data={filteredHotels}
                renderItem={({ item }) => <HotelCard showDetails={false} data={item}
                  imageStyle={{
                    height: '100%',
                    width: width - 30
                  }}
                  imageContainer={{
                    height: 150,
                  }}
                  cardStyle={{

                    width: width - 150
                  }}
                  checkInDate={selectedStartDate}
                  checkOutDate={selectedEndDate}
                  noOfAdults={adult}
                  noOfRooms={room}
                  noOfChildren={children}
                />}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
              {/* {filteredHotels.map((data, i) => (
                <HotelCard data={data} key={i} />
              ))} */}
            </View>
          </View>
        )}

        {filteredHotels.length > 0 && (
          <View style={styles.infoContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.heading}>Trendings Hotels</Text>
            </View>
            <View style={{ paddingHorizontal: 12.5 }}>
              {filteredHotels.map((data, i) => (
                <HotelCard
                  data={data}
                  key={i}
                  checkInDate={selectedStartDate}
                  checkOutDate={selectedEndDate}
                  noOfAdults={adult}
                  noOfRooms={room}
                  noOfChildren={children}
                />
              ))}
            </View>
          </View>
        )}


      </ScrollView>

      <Modal
        statusBarTranslucent={true}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
        animationType="fade"
        visible={isModalVisible}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Feather name="chevron-left" color={COLORS.WHITE} size={22} />
              </TouchableOpacity>
              <View style={styles.searchContainer}>
                <Feather name="search" size={16} color={COLORS.DARK_GREY} />

                <TextInput
                  style={styles.input}
                  placeholder="Search by city name or pincode"
                  defaultValue={searchValue}
                  autoFocus={true}
                  placeholderTextColor={COLORS.GREY}
                />

                {searchValue.toString().trim().length > 0 &&
                  (loading ? (
                    <View style={styles.cancel}>
                      <Image
                        source={ICONS.LOADER}
                        style={{ height: 25, width: 25 }}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      // style={styles.cancel}
                      onPress={() => [
                        setSearchValue(''),
                        setSuggestionsList([]),
                      ]}>
                      <Feather name="x" size={19} color={COLORS.PRIMARY} />
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>

          <View>
            {suggestionsList.map((data, i) => (
              <TouchableOpacity
                style={styles.list}
                key={i}
              //  onPress={() => selectLoaction(data)}
              >
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.name} numberOfLines={1}>
                    {data.name}
                  </Text>
                  <Text style={styles.location} numberOfLines={1}>
                    {data.formatted_address}
                  </Text>
                </View>
                <Feather name="arrow-up-left" size={16} color={COLORS.BLACK} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              todayBackgroundColor={COLORS.PRIMARY}
              selectedDayColor={COLORS.PRIMARY_LIGHT}
              selectedDayTextColor={COLORS.BLACK}
              onDateChange={onDateChange}
              textStyle={{
                fontFamily: FONT_FAMILY.primaryBold,
                fontSize: 14,
              }}
              nextTitleStyle={{ color: COLORS.DARK_GREY, fontSize: 13 }}
              previousTitleStyle={{ color: COLORS.DARK_GREY, fontSize: 13 }}
              scrollable={true}
              monthTitleStyle={{
                color: COLORS.PRIMARY,
                fontFamily: FONT_FAMILY.primaryBlack,
              }}
              yearTitleStyle={{
                color: COLORS.PRIMARY,
                fontFamily: FONT_FAMILY.primaryBlack,
              }}
              todayTextStyle={{
                color: COLORS.WHITE,
                fontFamily: FONT_FAMILY.primaryBlack,
              }}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
            />

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setSelectedEndDate(null);
                  setSelectedStartDate(null);
                }}
                style={styles.calendarBtn}>
                <Text style={styles.calendarBtnTxt}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.calendarBtn}>
                <Text style={styles.calendarBtnTxt}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* room model   */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isRoomModalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => setIsRoomModalVisible(false)}>
        <View style={styles.RoomModalContainer}>
          <View style={styles.RoomModalContent}>
            <View style={styles.datesCard}>
              <View style={styles.roomsContainer}>
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.guestTitle}>Guests</Text>
                  <Text style={styles.guestAge}>Number of Guests</Text>
                </TouchableOpacity>

                <View style={styles.toggleBtnContainer}>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => adult > 1 && handleAdultChange(adult - 1)}>
                    <Ionicons
                      color={COLORS.BLACK}
                      name="remove-outline"
                      size={16}
                    />
                  </TouchableOpacity>
                  <Text style={styles.qty}>{adult}</Text>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => handleAdultChange(adult + 1)}>
                    <Ionicons
                      color={COLORS.BLACK}
                      name="add-outline"
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.roomsContainer}>
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.guestTitle}>Children</Text>
                  <Text style={styles.guestAge}>Number of Children</Text>
                </TouchableOpacity>

                <View style={styles.toggleBtnContainer}>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => children > 0 && setChildren(children - 1)}>
                    <Ionicons
                      color={COLORS.BLACK}
                      name="remove-outline"
                      size={16}
                    />
                  </TouchableOpacity>
                  <Text style={styles.qty}>{children}</Text>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => setChildren(children + 1)}>
                    <Ionicons
                      color={COLORS.BLACK}
                      name="add-outline"
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.roomsContainer}>
                <TouchableOpacity style={styles.dateContainer}>
                  <Text style={styles.guestTitle}>Rooms</Text>
                  <Text style={styles.guestAge}>Number of Rooms</Text>
                </TouchableOpacity>

                <View style={styles.toggleBtnContainer}>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => room > 1 && handleRoomChange(room - 1)}>
                    <Ionicons
                      color={COLORS.BLACK}
                      name="remove-outline"
                      size={16}
                    />
                  </TouchableOpacity>
                  <Text style={styles.qty}>{room}</Text>
                  <TouchableOpacity
                    style={styles.toggleBtn}
                    onPress={() => handleRoomChange(room + 1)}>
                    <Ionicons
                      color={COLORS.BLACK}
                      name="add-outline"
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ paddingVertical: 2.5 }} />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => setIsRoomModalVisible(false)}
                style={styles.calendarBtn}>
                <Text style={styles.calendarBtnTxt}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ >
  );
}
