import React, { useCallback, useEffect, useState, useRef } from 'react';
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
  ActivityIndicator,
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false);
  const [hotelList, setHotelList] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [trendingHotels, setTrendingHotels] = useState([]);
  const [banners, setBanners] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  const isSelectionMade = useRef(false);
  const [noDataMsg, setNoDataMsg] = useState('');

  // Removed immediate filtering useEffect as it's now combined with the debounced suggestions effect.

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
        setFeaturedHotels(hotel_list.extraData.featured);
        setTrendingHotels(hotel_list.extraData.trending);
        setHotelList(hotels);
        setFilteredHotels(hotels);
        setIsLoading(false);
      } else {
        ToastAlertMsg('No Records Found');
        setHotelList([]);
        setFilteredHotels([]);
        setIsLoading(false);
      }

      const banner_res = await API.getBanners();
      if (banner_res && banner_res.success === 'true') {
        setBanners(banner_res.extraData.banner);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

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

  useEffect(() => {
    if (isSelectionMade.current) {
      // If we just selected from suggestions, don't run the debounced auto-search
      // because we already have the specific results from the filter API.
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      // 1. Suggestions (API)
      if (searchValue && searchValue.trim().length >= 2) {
        fetchSuggestions(searchValue);
      } else {
        setSuggestionsList([]);
      }

      // 2. Local filtering (Auto Search)
      if (searchValue.trim() === '') {
        setFilteredHotels(hotelList);
      } else {
        const filtered = hotelList.filter(
          item =>
            item.hotelname?.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.city_name?.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setFilteredHotels(filtered);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, hotelList]);

  const fetchSuggestions = async keyword => {
    setLoading(true);
    setNoDataMsg('');
    try {
      const response = await API.getLocationList(keyword);
      console.log('response', response);
      if (
        response &&
        response.success === 'true' &&
        response.extraData &&
        response.extraData.sub_category
      ) {
        setSuggestionsList(response.extraData.sub_category);
      } else {
        setSuggestionsList([]);
        if (response && response.success === 'false' && response.extraData) {
          setNoDataMsg(response.extraData);
        }
      }
    } catch (error) {
      console.log('Error fetching suggestions:', error);
      setSuggestionsList([]);
    } finally {
      setLoading(false);
    }
  };

  const selectLoaction = async item => {
    isSelectionMade.current = true;
    setSearchValue(item.name);
    setSuggestionsList([]);
    setIsModalVisible(false);
    setIsLoading(true);

    try {
      // type: 0 => city, type: 1 => state
      const city_id = item.type == 0 ? item.id : 0;
      const state_id = item.type == 1 ? item.id : 0;

      const response = await API.getHotelsByFilter(city_id, state_id);

      if (response && response.success === 'true' && response.extraData) {
        setHotelList(response.extraData);
        setFilteredHotels(response.extraData);
      } else {
        setHotelList([]);
        setFilteredHotels([]);
        ToastAlertMsg('No Hotels Found for this location');
      }
    } catch (error) {
      console.log('Error filtering hotels by suggestion:', error);
      ToastAlertMsg('Error fetching hotels');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <SearchTextbox
        title="Search Hotels, Cities..."
        value={searchValue}
        onChangeText={text => {
          isSelectionMade.current = false;
          setNoDataMsg('');
          setSearchValue(text);
        }}
        onPress={() => setIsModalVisible(true)}
        showFilter={false}
      />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.infoContainer}>
          <View style={styles.topOfferBanner}>
            <Text style={styles.bannerTitle}>
              {`TOP\n`}
              <Text style={{ fontSize: 12, color: COLORS.BLACK }}>{`HOTELS`}</Text>
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerInfo}>HOMESTO</Text>
              <Text style={styles.bannerSubInfo}>
                Online Room Booking
              </Text>
            </View>
          </View>
        </View>



        {/* <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>HOMESTO Stays</Text>
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
        </View> */}







        {featuredHotels?.length > 0 && (
          <View style={styles.infoContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.heading}>Featured Hotels</Text>
            </View>
            <View style={{ paddingHorizontal: 12.5 }}>
              <FlatList
                data={featuredHotels}
                renderItem={({ item }) => <HotelCard showDetails={true} data={item}
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

        <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.heading}>Exclusive Offers</Text>
          </View>
          <BannerCarousel data={banners.length > 0 ? banners : bannerData} showPagination={false} interval={3500} />
        </View>

        {trendingHotels?.length > 0 && (
          <View style={styles.infoContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.heading}>Trendings Hotels</Text>
            </View>
            <View style={{ paddingHorizontal: 12.5 }}>
              {trendingHotels.map((data, i) => (
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
        {filteredHotels?.length > 0 && (
          <View style={styles.infoContainer}>
            <View style={styles.flexRow}>
              <Text style={styles.heading}>Other Hotels</Text>
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

        {/* <View style={styles.infoContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.heading}>Exclusive Offers</Text>
          </View>
          <BannerCarousel data={banners.length > 0 ? banners : bannerData} showPagination={false} interval={3500} />
        </View> */}


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
                  value={searchValue}
                  onChangeText={text => {
                    isSelectionMade.current = false;
                    setNoDataMsg('');
                    setSearchValue(text);
                  }}
                  autoFocus={true}
                  placeholderTextColor={COLORS.GREY}
                />

                {searchValue.toString().trim().length > 0 &&
                  (loading ? (
                    <View style={styles.cancel}>
                      <ActivityIndicator size="small" color={COLORS.PRIMARY} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      // style={styles.cancel}
                      onPress={() => {
                        isSelectionMade.current = false;
                        setNoDataMsg('');
                        setSearchValue('');
                        setSuggestionsList([]);
                      }}>
                      <Feather name="x" size={19} color={COLORS.PRIMARY} />
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>

          {loading && suggestionsList.length === 0 ? (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            </View>
          ) : noDataMsg ? (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={{ color: COLORS.GREY, fontFamily: FONT_FAMILY.primary }}>{noDataMsg}</Text>
            </View>
          ) : (
            suggestionsList.map((data, i) => (
              <TouchableOpacity
                style={styles.list}
                key={i}
                onPress={() => selectLoaction(data)}>
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
            ))
          )}
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
