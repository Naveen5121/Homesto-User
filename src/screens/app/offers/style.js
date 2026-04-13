import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 15,
  },
  offerimg: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  labelCard: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
    borderWidth: 0.8,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    elevation: 2.5,
    paddingVertical: 10,
    borderColor: COLORS.EXTRALIGHT_GREY,
    padding: 4.5,
  },
  subtitle: {
    fontSize: 11.5,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
  },
  off: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 11,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBoldItalic,
  },
});
