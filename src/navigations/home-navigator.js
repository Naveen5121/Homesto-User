import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {
  DrawerMenu,
  LogoutIcon,

  ProfileIcon,

} from '../components/header-components';

import Hotels from '../screens/app/hotel/hotels/hotels';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: styles.headerTitle,

        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Hotels"
     
        component={Hotels}
        options={{
          headerTitle: <Text>Welcome,Test User</Text>,
          title: null,
          headerLeft: () => <ProfileIcon />,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
            
              <LogoutIcon />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  headerSubTitle: {
    fontSize: 10,
    color: COLORS.WHITE,
    textTransform: 'capitalize',
    marginLeft: 30,
    marginTop: 1,
  },

  iconStyleRight: {marginRight: 15},
});