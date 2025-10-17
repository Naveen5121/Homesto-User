import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from './style';
import {AirbnbRating} from 'react-native-elements';
import {COLORS} from '../../../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-paper';
import Bullets from '../../../../components/bullets';
import ConvertIntoRupees from '../../../../components/convert-in-rupees';

export default function BookingDetails(props) {
  const rules = [
    {
      title:
        'Optional: Fee for buffet breakfast: approximately INR 444 per person Early check-in fee: INR 1000 (subject to availability) | Late check-out fee: INR 1000 (subject to availability) | Rollaway bed fee: INR 1000 per night',
    },
    {title: 'Unmarried Couples allowed'},
    {
      title: 'Guests below 18 years of age are not allowed at the property.',
    },
    {
      title: 'Passport, Aadhar and Driving License are accepted as ID proof(s)',
    },
    {title: 'Food from outside is allowed'},
    {title: 'Food delivery from Zomato and other apps is allowed'},
  ];
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.hotelInfo}>
            <View style={styles.imgContainer}>
              <Image
                source={{
                  uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1',
                }}
                style={styles.img}
              />
            </View>
            <View style={{flex: 1}}>
              <View style={styles.ratingContainer}>
                <AirbnbRating
                  size={12}
                  showRating={false}
                  count={5}
                  defaultRating={4}
                  //onFinishRating={ratingCompleted}
                  // starContainerStyle={{paddingHorizontal: 10}}
                />
              </View>
              <Text style={styles.hotelName}>
                Golden Tulip Vasundra Hotel & Suites
              </Text>
              <View style={styles.flexRow}>
                <Feather
                  name="map-pin"
                  size={12}
                  color={COLORS.LIGHT_GREY}
                  width={15}
                />
                <Text style={styles.address}>Mall Road, Shimla</Text>
              </View>

              <Text style={styles.rate}>3.8/5</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.heading}>Booking Details</Text>
          <View style={{flexDirection: 'row', padding: 15}}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeading}>Check in</Text>
              <Text style={styles.dateTime}>{`Thu, Sept 21\n12:00 PM`}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.subHeading}>Check out</Text>
              <Text style={styles.dateTime}>{`Fri, Sept 22\n11:00 AM`}</Text>
            </View>
          </View>
          <Divider />
          <View style={{padding: 15}}>
            <Text style={styles.subHeading}>1 x Delux Room with balcony</Text>
            <Text style={styles.value}>{`2 Guest`}</Text>
          </View>
          <Divider />
          <View style={{padding: 15}}>
            <Text style={styles.subHeading}>Primary Guest</Text>
            <Text style={styles.value}>{`Raman Kumar Verma + 1 Adult`}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.heading}>Important Information for Check-in</Text>
          <View style={{padding: 15}}>
            {rules.map((data, k) => (
              <Bullets key={k} item={data} />
            ))}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.heading}>Payment</Text>
          <View style={{padding: 15}}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceHeading}>Hotel reservation charges</Text>
              <Text style={styles.price}>{ConvertIntoRupees(2507.5)}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceHeading}>Taxes & Service Fee</Text>
              <Text style={styles.price}>{ConvertIntoRupees(134.33)}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={{...styles.priceHeading, color: 'green'}}>
                Discount Coupon
              </Text>
              <Text style={{...styles.price, color: 'green'}}>
                - {ConvertIntoRupees(223)}
              </Text>
            </View>
            <Divider style={{marginVertical: 7.5}} />
            <View style={styles.priceContainer}>
              <Text style={styles.priceHeading}>Total Price</Text>
              <Text style={styles.price}>{ConvertIntoRupees(2418.83)}</Text>
            </View>
            <Divider style={{marginVertical: 7.5}} />
            <View style={styles.priceContainer}>
              <Text style={styles.priceHeading}>AMOUNT PAID</Text>
              <Text style={styles.price}>{ConvertIntoRupees(2419)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={{padding: 15}}>
            <Text style={styles.info}>
              All communication for your booking will be sent to :
            </Text>
            <View style={styles.flexRow}>
              <Feather name="mail" size={14} color={COLORS.BLACK} />
              <Text style={styles.contact}>raman.kumar@gmail.com</Text>
            </View>
            <View style={styles.flexRow}>
              <Feather name="smartphone" size={14} color={COLORS.BLACK} />
              <Text style={styles.contact}>+91 9876543210</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
