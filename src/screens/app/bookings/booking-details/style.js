import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.WHITE,
  },

  infoContainer: {
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginBottom: 10,
  },

  infoList: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  bottomContainer: {
    backgroundColor: COLORS.WHITE,
    elevation: 20,
    padding: 10,
  },

  heading: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    // marginBottom: 15,
  },

  hotelName: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
  },

  hotelAmount: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    marginBottom: 10,
    marginTop: 2.5,
  },
  subheading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },
  map: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.LIGHT_GREY,
    marginTop: 2.5,
    textDecorationLine: 'underline',
  },

  infoHeading: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    flex: 1,
  },

  status: {
    fontSize: 16,
    color: 'green',
    fontFamily: FONT_FAMILY.primaryBold,
    flex: 1,
    marginTop: 20,
  },

  cancelStatus: {
    fontSize: 16,
    color: COLORS.RED,
    fontFamily: FONT_FAMILY.primaryBold,
    flex: 1,
    marginTop: 20,
  },
  bookingDate: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryMedium,
    marginTop: 20,
  },

  info: {
    fontSize: 14,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
    flex: 1,
  },

  cancelBtn: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 5,
  },

  cancelBtnTxt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
  },

  btn: {
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
    elevation: 5,
  },

  btnTxt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
  },
});
