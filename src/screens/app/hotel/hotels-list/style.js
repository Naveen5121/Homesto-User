import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 12.5,
    //  padding: 15,
  },

  infoContainer: {},
});
