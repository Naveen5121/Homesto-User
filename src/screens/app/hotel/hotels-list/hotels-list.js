import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';
import HotelCard from '../../../../components/hotel-card';
import BorderSearchInput from '../../../../components/border-search-input';
import {useIsFocused} from '@react-navigation/native';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import API from '../../../../action/api';

export default function HotelsList(props) {
  const isVisible = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [hotelList, setHotelList] = useState([]);

  async function fetchData() {
    try {
      setIsLoading(true);

      const hotel_list = await API.getHotelList();
      console.log(hotel_list);

      if (hotel_list.success === 'true') {
        // setHotelList(hotel_list.extraData.hot);
        const hotels = hotel_list.extraData.hot.filter(
          item => item.category_name === 'Hotel',
        );
        setHotelList(hotels);
        setIsLoading(false);
      } else {
        ToastAlertMsg('No Records Found');
        setHotelList([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <FlatList
        data={hotelList}
        renderItem={({item}) => <HotelCard data={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
