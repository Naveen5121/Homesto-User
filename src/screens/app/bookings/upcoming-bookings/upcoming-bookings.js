import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import API from '../../../../action/api';
import AlertMsg from '../../../../components/alert-msg';
import ActivityLoader from '../../../../components/activity-loader';
import moment from 'moment';
import ImageLoader from '../../../../components/image-loader';
import NoRecords from '../../../../components/no-records';

export default function UpcomingBookings(props) {
  const isVisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  async function fetchData() {
    try {
      const data = await API.getAllBookings();

      if (data.success === 'true') {
        setBookings(data.extraData.ongoing_bookings);
        setIsLoading(false);
      } else {
        //AlertMsg('Something went wrong');
        setBookings([]);
        setIsLoading(false);
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

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}

      {bookings.length <= 0 ? (
        <NoRecords title={'No Records Found..!'} />
      ) : (
        <ScrollView style={styles.container}>
          {!isLoading &&
            bookings.map((data, i) => (
              <TouchableOpacity
                key={i}
                style={styles.card}
                onPress={() =>
                  props.navigation.navigate('BookingsDetails', {
                    orderId: data.order_id,
                    isShowCancel: true,
                  })
                }>
                <View style={styles.imageContainer}>
                  <ImageLoader image={data.image[0]} style={styles.image} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.name} numberOfLines={1}>
                    {data.hotel_name}
                  </Text>
                  <Text style={styles.addr} numberOfLines={1}>
                    {data.address}
                  </Text>

                  {data.booking_type === '1' ? (
                    <Text style={styles.date}>
                      {changeDateFormat(data.check_in_date) +
                        ' for ' +
                        data.hrs +
                        ' hrs'}
                    </Text>
                  ) : (
                    <Text style={styles.date}>
                      {changeDateFormat(data.check_in_date) +
                        ' - ' +
                        changeDateFormat(data.check_out_date)}
                    </Text>
                  )}

                  {/*   <Text style={styles.status}>{data.order_status}</Text> */}

                  <Text style={styles.status}>Confirmed</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
    </>
  );
}
