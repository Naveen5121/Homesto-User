import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {ICONS} from '../../../constants/icons';

import {useIsFocused} from '@react-navigation/native';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import ActivityLoader from '../../../components/activity-loader';

export default function Offers() {
  const isVisible = useIsFocused();
  const [couponCode, setCouponCode] = useState([{}, {}, {}]);
  const [isLoading, setIsLoading] = useState(true);

  // async function fetchData() {
  //   try {
  //     const data = await API.getAllOffersList();
  //     console.log(data);

  //     if (data) {
  //       setCouponCode(data.data);
  //       ToastAlertMsg(data.message);
  //     } else {
  //       setCouponCode([]);
  //       ToastAlertMsg('No Coupon Available!');
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //     ToastAlertMsg('Error fetching Coupons!');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (isVisible) {
  //     fetchData();
  //   }
  // }, [isVisible]);

  return (
    <View style={styles.container}>
      {couponCode.map((data, i) => (
        <View key={data._id} style={styles.labelCard}>
          <Image source={ICONS.OFFER} style={styles.offerimg} />
          <View style={{flex: 1}}>
            <Text style={styles.off}>NEWUSER</Text>
            <Text style={styles.subtitle}>
              Use the code NEWUSER between{' '}
              <Text style={styles.date}>08-07-2025</Text> and{' '}
              <Text style={styles.date}>10-07-2025</Text> to save!
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
