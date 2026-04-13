import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 15,
    textAlign: 'center',
  },

  headingContainer: {
    padding: 15,
  },
  contentContainer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentHeading: {
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    marginBottom: 10,
  },
  content: {
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
    fontSize: 14,
  },
});
