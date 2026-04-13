import {View, Text} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../../../../constants/font-family';
import {COLORS} from '../../../../constants/colors';

export default function CheckoutBookings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
      }}>
      <Text
        style={{
          fontFamily: FONT_FAMILY.primary,
          color: COLORS.BLACK,
          fontSize: 16,
        }}>
        No Data Found..
      </Text>
    </View>
  );
}
