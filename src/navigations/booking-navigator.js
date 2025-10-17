import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {DrawerMenu, NotificationIcon} from '../components/header-components';
import TopTabNavigator from './top-tab-navigator';

const Stack = createNativeStackNavigator();

export default function BookingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 14,
          color: COLORS.WHITE,
          textTransform: 'capitalize',
          fontFamily: FONT_FAMILY.primaryBold,
        },

        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Bookings"
        component={TopTabNavigator}
        options={{
        
          title: 'Bookings',
          headerLeft: () => DrawerMenu(),
         
        }}
      />
    </Stack.Navigator>
  );
}
