import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import UpcomingBookings from '../screens/app/bookings/upcoming-bookings/upcoming-bookings';
import BookingHistory from '../screens/app/bookings/booking-history/booking-history';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        // tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.primaryMedium,
        },

        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GREY,
      }}>
      <Tab.Screen
        name="Upcoming"
        component={UpcomingBookings}
        options={{tabBarLabel: 'Upcoming'}}
      />
      <Tab.Screen
        name="History"
        component={BookingHistory}
        options={{tabBarLabel: 'History'}}
      />
    </Tab.Navigator>
  );
}
