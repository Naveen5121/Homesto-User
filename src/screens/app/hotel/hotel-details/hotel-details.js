import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../../constants/colors';
import { ProgressBar } from 'react-native-paper';
import { AirbnbRating } from '@rneui/themed';
import ConvertIntoRupees from '../../../../components/convert-in-rupees';
import HotelImageCarousel from '../../../../components/hotel-image-carousel';
import Bullets from '../../../../components/bullets';

import PopularHotelCard from '../../../../components/popular-hotel-card';
import ActivityLoader from '../../../../components/activity-loader';
import { useIsFocused } from '@react-navigation/native';
import ImageLoader from '../../../../components/image-loader';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import PopularHotelCard2 from '../../../../components/popular-hotel-card2';
import moment from 'moment';
import CalculateGst from '../../../../components/calculate-gst';
import API from '../../../../action/api';

export default function HotelDetails(props) {
  const { hotelId, bookingAmt, bookingAmtHrs, offerId } = props.route.params;

  console.log(hotelId, bookingAmt, bookingAmtHrs, offerId);

  const isVisible = useIsFocused();
  const { checkInDate, checkOutDate, noOfAdults, noOfRooms, noOfChildren } = props.route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [hotelDetails, setHotelDetails] = useState(null);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await API.getHotelDetailById(hotelId);
      console.log('Details ', data);

      if (data.success === 'true') {
        setHotelDetails(data.extraData);
        setIsLoading(false);
      } else {
        ToastAlertMsg('No Records Found');

        setIsLoading(false);
        props.navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  const checkIn = checkInDate ? moment(checkInDate) : moment().add(1, 'days');
  const checkOut = checkOutDate
    ? moment(checkOutDate)
    : moment().add(2, 'days');

  const adults = noOfAdults || 2;
  const children = noOfChildren || 0;

  const rooms = noOfRooms || 1;

  const ProgressBarRating = ({ color, rating, heading }) => {
    return (
      <View style={styles.rowCenter}>
        <Text style={styles.ratingHeading}>{heading}</Text>
        <View style={{ flex: 1 }}>
          <ProgressBar
            style={styles.progressbar}
            progress={5 / 10 || 0}
            color={color}
          />
        </View>
        <Text style={styles.ratingValue}>{rating}</Text>
      </View>
    );
  };

  const review = [
    {
      name: 'Prafull Roy',
      comment:
        'Amazing staff, service levels were par excellence in our 4 day stay.',
    },
    {
      name: 'Miller',
      comment:
        'esort had everything needed, short walk to beach, great dining and drink options. We loved the friendly cats. Kind and helpful staff. Great stay all around!',
    },
    {
      name: 'Jack',
      comment:
        'The Staff was Really goog and really helpful. the location was close to mall Road',
    },
  ];

  const banner = [{}, {}, {}];

  return (
    <>
      <ScrollView>
        <View style={styles.conatiner}>
          {isLoading && <ActivityLoader isLoading={isLoading} />}
          <HotelImageCarousel
            banner={(hotelDetails?.gallery || []).map((option, i) => ({
              id: i,
              image: option,
            }))}
          />
        </View>
        {/*  <View style={{height: 10}} /> */}
        <View style={styles.midContainer}>
          <View style={styles.infoContainer}>
            <AirbnbRating
              size={14}
              showRating={false}
              count={5}
              defaultRating={4}
              starContainerStyle={{ alignSelf: 'flex-start' }}
            />
            <Text style={styles.hotelTitle}>{hotelDetails?.hotelname}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationName}>
                <Feather
                  name="map-pin"
                  color={COLORS.GREY}
                  size={14}
                  width={20}
                />
                {hotelDetails?.address}, {hotelDetails?.city_name} ,{' '}
                {hotelDetails?.state_name}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.days}>
                {`${checkIn.format('DD MMM, ddd')} - ${checkOut.format(
                  'DD MMM, ddd',
                )} | ${adults} Adult${children > 0 ? `, ${children} Child` : ''} | ${rooms} Room | ${hotelDetails?.room_type_room?.[0]?.room?.[0]?.min_no_guest || 1}-${hotelDetails?.room_type_room?.[0]?.room?.[0]?.max_no_guest || 4} Guests`}
              </Text>
              {/* <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editBtnTxt}>Edit</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.heading}>About the Hotel</Text>
            <Text style={styles.description}>{hotelDetails?.description}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.heading}>Amenities</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {hotelDetails?.amenities?.map((line, j) => (
                <View style={styles.facilityRowContainer} key={j}>
                  <View style={styles.faciltyCard}>
                    {/* <ImageLoader
                      image={line.img}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                    /> */}
                    <Text style={styles.facilityTitle}>✔ {line.title}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ marginVertical: 10 }} />
            <Text style={styles.heading}>Property Details</Text>

            <View style={styles.facilityRowContainer}>
              {[
                { label: 'Guests', value: hotelDetails?.no_of_guest },
                { label: 'Bedrooms', value: hotelDetails?.no_of_bedroom },
                { label: 'Bathrooms', value: hotelDetails?.no_of_bathroom },
                { label: 'Beds', value: hotelDetails?.no_of_bed },
              ].map((data, j) => (
                <View style={styles.faciltyCard} key={j}>
                  <Text style={{ color: 'green', fontWeight: 'bold' }}>{data.value}</Text>
                  <Text style={styles.facilityTitle}>{data.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* <View style={styles.infoContainer}>
            <Text style={styles.heading}>Cancellation policy</Text>
            {policy.map((data, k) => (
              <Bullets key={k} item={data} />
            ))}
          </View> */}

          <View style={styles.infoContainer}>
            <Text style={styles.heading}>Hotel Rules</Text>
            <View>
              <Text style={styles.time}>
                Check-In : <Text style={{ color: 'grey' }}>08-07-2025 </Text> |
                {'  '}
                Check-Out : <Text style={{ color: 'grey' }}>11-07-2025 </Text>
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.heading}>Rules & Regulations</Text>
            <View>
              <Text style={styles.time}>
                {hotelDetails?.rules_and_regulation}
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.heading}>cancellation_policy</Text>
            <View>
              <Text style={styles.time}>
                {hotelDetails?.cancellation_policy}
              </Text>
            </View>
          </View>
          {/* <View style={styles.infoContainer}>
            <Text style={styles.heading}>Ratings & reviews</Text>
            <View style={[styles.rowCenter, { marginBottom: 10 }]}>
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.totalRating}>
                    {parseFloat(4 || 0).toFixed(1)}
                  </Text>
                  <Text style={[styles.totalRating, { fontSize: 20 }]}>★</Text>
                </View>
                <Text style={styles.ratingReviewCount}>{100} ratings</Text>
                <Text style={styles.ratingReviewCount}>{50} reviews</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <ProgressBarRating
                  color={'green'}
                  heading="Excellent"
                  rating={'5'}
                />
                <ProgressBarRating
                  color={'#33cc00'}
                  heading="Very Good"
                  rating={'4'}
                />

                <ProgressBarRating
                  color={'orange'}
                  heading="Average"
                  rating={'2'}
                />
                <ProgressBarRating color={'red'} heading="Poor" rating={'1'} />
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
              {review.map((item, i) => (
                <View style={styles.reviewConatiner} key={i}>
                  <View style={styles.reviewRow}>
                    <Text style={styles.useName}>{item.name}</Text>
                    <Text style={styles.star}>★ ★ ★ ★</Text>
                  </View>
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
              ))}
              <TouchableOpacity>
                <Text style={styles.reviewBtn}>View all 736 reviews</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </ScrollView>
      <View style={styles.bottomBtnContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.price}>
            {hotelDetails?.booking_amt}
            <Text style={{ fontSize: 13, color: 'grey' }}>/night</Text>
          </Text>
          {/*  <Text style={styles.tax}>+ 5500 + taxes & fees</Text> */}
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() =>
            props.navigation.navigate('SelectBookingDetails', {
              hotelDetails,
              bookingAmt,
              bookingAmtHrs,
              offerId,
              min_guest: hotelDetails?.room_type_room?.[0]?.room?.[0]?.min_no_guest || 1,
              max_guest: hotelDetails?.room_type_room?.[0]?.room?.[0]?.max_no_guest || 4,
            })
          }>
          <Text style={styles.bookBtnTxt}>Select Room</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
