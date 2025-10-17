import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchTextbox(props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={16} style={styles.searchIcon} />
      <TextInput
        placeholderTextColor={COLORS.GREY}
        placeholder={props.title}
        style={styles.input}
      />
      <FontAwesome name="sliders" size={16} style={styles.filterIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    left: 20,
    color: COLORS.GREY,
  },
  filterIcon: {
    position: 'absolute',
    right: 20,
    color: COLORS.GREY,
  },
  container: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.WHITE,
    shadowRadius: 20,
    elevation: 2,
    // marginTop: 20,
    //borderRadius: 10,
    //   marginHorizontal: 15,
    // marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 45,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },

  input: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    marginLeft: 30,
    color: COLORS.LIGHT_GREY,
    marginBottom: 2,
  },
});
