import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './custom-drawer-content';
import BottomTabNavigator from './bottom-tab-navigator';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

import {GoBack} from '../components/header-components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Hotels from '../screens/app/hotel/hotels/hotels';
import EditProfile from '../screens/app/account/edit-profile/edit-profile';
import ViewProfile from '../screens/app/account/view-profile/view-profile';
import HotelDetails from '../screens/app/hotel/hotel-details/hotel-details';

import BookingDetails from '../screens/app/bookings/booking-details/booking-detail';

import HotelsList from '../screens/app/hotel/hotels-list/hotels-list';

import TopTabNavigator from './top-tab-navigator';
import TermsConditions from '../screens/app/terms-conditions/terms-conditions';

import Support from '../screens/app/support/support';

import Offers from '../screens/app/offers/offers';
import BookingSuccessfull from '../screens/app/bookings/booking-successfull/booking-successfull';
import SelectBookingDetails from '../screens/app/select-booking-details/select-booking-details';
import ConfirmBooking from '../screens/app/confirm-booking/confirm-booking';
import BookingsDetails from '../screens/app/bookings/booking-details/booking-detail';
import CancelBooking from '../screens/app/bookings/cancel-booking/cancel-booking';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator({userProfile}) {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
    

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => <GoBack />,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTitleStyle: styles.headerTitle,
        }}>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
       
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Hotels"
          component={Hotels}
          options={{
            title: 'Hotels & Homestays',
          }}
        />

        <Stack.Screen
          name="HotelsList"
          component={HotelsList}
          options={{
            title: 'Hotels',
          }}
        />

        <Stack.Screen
          name="HotelDetails"
          component={HotelDetails}
          options={({route}) => ({
            title: route.params?.hotelName,
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Edit Profile',
          }}
        />

       
        <Stack.Screen
          name="MyProfile"
          component={ViewProfile}
          options={{
            title: 'My Profile',
            headerShadowVisible: false,
          }}
        />


      

      

        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{
            title: null,
          }}
        />

      

        <Stack.Screen
          name="TopTabNavigator"
          component={TopTabNavigator}
          options={{
            title: 'Bookings',
          }}
        />

        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{
            title: 'Terms & Conditions',
          }}
        />

       

        <Stack.Screen
          name="Support"
          component={Support}
          options={{
            title: 'Customer Support',
          }}
        />

      
        <Stack.Screen
          name="Offers"
          component={Offers}
          options={{
            title: 'Coupons',
          }}
        />

        <Stack.Screen
          name="BookingSuccessfull"
          component={BookingSuccessfull}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SelectBookingDetails"
          component={SelectBookingDetails}
          options={({route}) => ({
            title: route.params.hotelDetails.hotelname,
            headerLeft: () => GoBack(),
          })}
        />

        <Stack.Screen
          name="ConfirmBooking"
          component={ConfirmBooking}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BookingsDetails"
          component={BookingsDetails}
          options={() => ({
            title: 'Bookings Details',
            headerLeft: () => GoBack(),
          })}
        />

        <Stack.Screen
          name="CancelBooking"
          component={CancelBooking}
          options={() => ({
            title: 'Cancel Booking',
            headerLeft: () => GoBack(),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function AppStackNavigator() {
//   return (

//   );
// }

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    color: COLORS.WHITE,
    //  textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.primaryBold,
  },

  logo: {
    height: 45,
    width: 150,
    resizeMode: 'stretch',
    marginTop: 5,
  },

  iconStyleRight: {marginRight: 15},
  name: {
    fontSize: 15,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  phone: {
    fontSize: 11,
    color: COLORS.EXTRALIGHT_GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
});
