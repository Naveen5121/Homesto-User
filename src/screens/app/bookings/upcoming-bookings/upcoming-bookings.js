import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import { useIsFocused } from '@react-navigation/native';
import API from '../../../../action/api';
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
        setBookings(data?.extraData?.upcoming_bookings || []);
      } else {
        setBookings([]);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  const fmt = date => moment(date, 'DD-MM-YYYY').format('DD MMM YYYY');

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <>
      {isLoading && <ActivityLoader isLoading={isLoading} />}

      {!isLoading && bookings?.length === 0 ? (
        <NoRecords title={'No Upcoming Bookings'} />
      ) : (
        <ScrollView style={styles.container}>
          {!isLoading &&
            bookings?.map((item, i) => {
              const isHourly = parseInt(item.hrs) > 0;
              const statusColor =
                item.order_status === 'Pending' ? '#f57c00' : 'green';

              return (
                <TouchableOpacity
                  key={i}
                  style={styles.card}
                  onPress={() =>
                    props.navigation.navigate('BookingsDetails', {
                      orderId: item.order_id,
                      isShowCancel: true,
                    })
                  }>
                  {/* Image */}
                  <View style={styles.imageContainer}>
                    <ImageLoader
                      image={item.image?.[0]}
                      style={styles.image}
                    />
                  </View>

                  {/* Info */}
                  <View style={styles.cardInfo}>
                    {/* Hotel name + status */}
                    <View style={styles.row}>
                      <Text style={styles.name} numberOfLines={1}>
                        {item.hotel_name?.trim()}
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: statusColor + '1a', borderColor: statusColor },
                        ]}>
                        <Text style={[styles.statusText, { color: statusColor }]}>
                          {item.order_status}
                        </Text>
                      </View>
                    </View>

                    {/* Location */}
                    <Text style={styles.addr} numberOfLines={1}>
                      {item.city}, {item.state}
                    </Text>

                    {/* Dates */}
                    <Text style={styles.date}>
                      {isHourly
                        ? `${fmt(item.check_in_date)}  ·  ${item.hrs} hrs`
                        : `${fmt(item.check_in_date)}  →  ${fmt(item.check_out_date)}`}
                    </Text>

                    {/* Room details */}
                    {item.room_detail?.map((room, ri) => (
                      <Text key={ri} style={styles.roomDetail}>
                        {room.room_type_name}  ×{room.room_qty}  ·  {room.no_of_adults} Adults
                      </Text>
                    ))}

                    {/* Total */}
                    <Text style={styles.total}>₹{item.total_amt}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      )}
    </>
  );
}
