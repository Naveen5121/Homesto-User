import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  logo: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },

  logoBg: {
    alignSelf: 'center',
    height: 350,
    width: width,
    resizeMode: 'contain',

    position: 'absolute',
    bottom: -190,
    opacity: 0.25,
    left: 10,
  },
  socialBtn: {
    height: 56,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  socialBtnicon: {
    height: 30,
    width: 30,
    marginRight: 7.5,
  },
  socialBtntxt: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 2.5,
  },
  topheading: {
    fontSize: 26,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryExtraBold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.BROWN,
    fontFamily: FONT_FAMILY.primaryMedium,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 10,
    marginBottom: 60,
  },
  accountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  accountTxt: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  signIn: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  hotelInfo: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 10,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },

  hotelImage: {height: 105, width: 95, marginRight: 15, borderRadius: 5},

  hotelTitle: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginTop: 5,
    // marginBottom: 7.5,
  },
  locationName: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 7.5,
    marginBottom: 5,
  },
  infoContainer: {
    padding: 7.5,
    // marginHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    // borderBottomWidth: 10,
    // borderColor: COLORS.BG,
    // marginBottom: 10,
  },

  heading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
});
