import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  infoContainer: {
    borderBottomWidth: 10,
    // paddingBottom: 15,
    borderColor: COLORS.EXTRALIGHT_GREY,
    padding: 15,
  },
  headerImg: {
    height: 350,
    width: '100%',
    // borderRadius: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backContainer: {
    top: 40,
    left: 20,
    right: 20,
    position: 'absolute',
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    height: 45,
    width: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midContainer: {
    // padding: 15,
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  days: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    flex: 1,
  },

  aboutList: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 7.5,
    borderRadius: 5,
    borderColor: COLORS.LIGHT_GREY,
    marginVertical: 5,
  },
  aboutIcon: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  about: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    flex: 1,
    marginLeft: 10,
  },

  locationRow: {flexDirection: 'row', alignItems: 'center'},
  locationName: {
    fontSize: 13,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    flex: 1,
    //marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    // textAlign: 'justify',
    // marginBottom: 10,
  },
  hotelTitle: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 10,
  },
  totalRating: {
    color: 'green',
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 36,
    marginRight: 5,
  },
  ratingReviewCount: {
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 11,
    textAlign: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5,
  },
  ratingHeading: {
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 11,
    minWidth: 50,
  },
  ratingValue: {
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 11,
    minWidth: 10,
    textAlign: 'right',
  },

  progressbar: {
    borderRadius: 10,
    marginHorizontal: 7.5,
  },
  faciltyCard: {
    // flex: 1,
    /// backgroundColor: 'pink',
    //justifyContent: 'center',
    //  alignItems: 'center',
    //margin: 5,
    paddingVertical: 5,
    //paddingHorizontal: 5,
    // marginVertical: 10,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  facilityTitle: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    // textAlign: 'center',
    marginLeft: 5,
    flex: 1,
  },
  facilityRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  useName: {
    fontSize: 15,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,

    flex: 1,
  },
  time: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 15,
    marginTop: 5,
  },
  star: {
    fontSize: 14,
    color: COLORS.YELLOW,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  comment: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  reviewConatiner: {
    marginVertical: 5,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewBtn: {
    // height: 40,
    //borderRadius: 5,
    //backgroundColor: COLORS.PRIMARY,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  reviewBtn: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
    marginTop: 15,
  },
  popularHotelRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtnContainer: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    elevation: 15,
  },
  price: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 2.5,
  },
  tax: {
    fontSize: 11,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primary,
  },
  bookBtn: {
    // height: 40,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 15,
    // marginRight: 10,
  },
  bookBtnTxt: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  editBtn: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editBtnTxt: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
  },
});
