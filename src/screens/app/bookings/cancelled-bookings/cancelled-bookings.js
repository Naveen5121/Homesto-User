import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import BookingCard from '../../../../components/booking-card';
import {useIsFocused} from '@react-navigation/native';
//import API from '../../../../actions/api';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';
import {COLORS} from '../../../../constants/colors';
import {AuthContext} from '../../../../../auth-context';

export default function CancelledBookings() {
  const {userProfile} = React.useContext(AuthContext);
  // console.log('profilr' + userProfile?._id);
  const isVisible = useIsFocused();
  const [allBookings, setAllBookings] = useState([{}, {}]);
  const [isLoading, setIsLoading] = useState(true);

  const renderBookingItem = ({item}) => <BookingCard data={item} />;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <FlatList
          data={allBookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <Text style={styles.noDataText}>No bookings found!</Text>
          }
        />
      )}
    </View>
  );
}
