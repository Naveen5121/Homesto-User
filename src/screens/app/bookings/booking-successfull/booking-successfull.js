import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../../../constants/images';
import CustomBtn from '../../../../components/custom-btn';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../../constants/colors';

export default function BookingSuccessfull(props) {
  const {hotelDetails} = props.route.params;
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          style={styles.gradientContainer}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            '#FCF7F6',
            '#FCF7F6',
            '#FCF7F6',
            '#FCF7F6',
            'rgba(254, 0, 0,0.65)',
          ]}>
          <Image source={IMAGES.LOGO} style={styles.logo} />
          <View style={styles.hotelInfo}>
            <Image
              style={styles.hotelImage}
              source={{uri: hotelDetails.hotelCoverImg}}
            />
            <View style={{flex: 1}}>
              <Text style={styles.hotelTitle}>{hotelDetails.hotelName}</Text>
              <Text style={styles.locationName}>
                <Feather
                  name="map-pin"
                  color={COLORS.GREY}
                  size={12}
                  width={20}
                />
                {` ${hotelDetails.address}`}
              </Text>
            </View>
          </View>
          {/*    <View style={styles.infoContainer}>
            <Text style={styles.heading}>
              Booking ID:- {hotelDetails.bookingId || 'None'}
            </Text>
          </View> */}
          <Text style={styles.topheading}>Booking Successfully</Text>
          <Text style={styles.subtitle}>
            Great news! Your payment went through successfully. Congratulations!
          </Text>

          <CustomBtn
            title="Back to Hompage"
            onPress={() => {
              props.navigation.navigate('Home_');
            }}
          />
        </LinearGradient>
      </View>
    </>
  );
}
