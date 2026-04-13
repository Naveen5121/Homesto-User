import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';

import ActivityLoader from '../../../../components/activity-loader';
import API from '../../../../action/api';

import ToastAlertMsg from '../../../../components/toast-alert-msg';
import Textarea from '../../../../components/textarea';
import styles from './style';

export default function CancelBooking(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState(null);

  async function cancelBooking() {
    try {
      if (reason && reason.toString().trim().length > 0) {
        setIsLoading(true);
        const data = await API.setCancelBooking(props.route.params, reason);
        //  console.log(data);

        if (data.success === 'true') {
          ToastAlertMsg('Order cancel successfully..');
          props.navigation.goBack();
          setIsLoading(false);
        } else {
          ToastAlertMsg('Something went wrong..');

          setIsLoading(false);
          props.navigation.goBack();
        }
      } else {
        ToastAlertMsg('Please Enter Reason');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <StatusBar translucent={true} barStyle={'light-content'} />
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <View style={styles.container}>
        <Textarea
          placeholder="Enter Cancel Reason"
          defaultValue={reason}
          onChangeText={text => setReason(text)}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => cancelBooking()}>
          <Text style={styles.cancelBtnTxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
