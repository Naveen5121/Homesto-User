import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 5,
  },
  calenderStrip: {
    height: 100,
    marginBottom: 20,
    marginTop: 10,
  },

  calendarHeaderStyle: {
    width: width - 40,
    textAlign: 'left',
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    marginVertical: 15,
  },
  dateNumberStyle: {color: 'black', fontFamily: FONT_FAMILY.primary},
  dateNameStyle: {color: 'black', fontFamily: FONT_FAMILY.primary},
  highlightDateNumberStyle: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primary,
  },
  highlightDateNameStyle: {
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
    marginTop: 1,
  },

  serviceContainer: {marginVertical: 10},

  infoContainer: {
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginBottom: 10,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    elevation: 20,
    padding: 10,
  },

  heading: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    // marginBottom: 15,
  },

  hotelName: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
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
  mapAddrContainer: {
    //  alignItems: 'center',
    // flexDirection: 'row',
    //  marginTop: 10,
    marginBottom: 15,
  },
  desc: {
    fontSize: 12,
    color: COLORS.BLACK,
    marginTop: 2.5,
  },
  priceContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  review: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    marginVertical: 5,
  },

  day: {
    fontSize: 11,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
  },

  booked: {
    color: COLORS.WHITE,
    fontSize: 11,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  price: {
    height: 22.5,
    width: 27.5,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 2,
  },
  text: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    marginHorizontal: 15,
    marginTop: 15,
  },
  animitiesIconContainer: {
    //backgroundColor: COLORS.RED,
    //height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginVertical: 2.5,
  },

  animitiesIcon: {
    height: 25,
    width: 25,
  },

  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 2.5,
  },
  animities: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },

  bookBtn: {
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 5,
  },

  bookBtnTxt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
  },

  btnTxt: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
  },

  bulletListContainer: {
    flexDirection: 'row',
    marginVertical: 1.5,
    // alignItems: 'center',
  },

  info: {
    fontSize: 12,
    color: COLORS.BLACK,
    // marginTop: 2.5,
    flex: 1,
  },

  bullet: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5.5,
    marginLeft: 2.5,
  },

  datesContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: '#e6e6e6',
    backgroundColor: '#f8f7fc',
    borderWidth: 0.5,
  },

  roomsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 5,
  },

  datesCard: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#e6e6e6',
    marginTop: 20,
    backgroundColor: '#f8f7fc',
  },

  dateContainer: {
    flex: 1,
    padding: 12.5,
  },

  dateHeading: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    marginBottom: 2.5,
  },

  date: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },

  guestAge: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    marginTop: 0.5,
  },

  guestTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
  },

  toggleBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //alignSelf: 'center',
    marginRight: 10,
    backgroundColor: COLORS.WHITE,
    margin: 8,
    elevation: 2,
    borderRadius: 2.5,
    paddingHorizontal: 10,
    height: 38,
    minWidth: 125,
  },
  qty: {
    fontFamily: FONT_FAMILY.primaryBold,
    marginHorizontal: 20,
    fontSize: 16,
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'center',
  },

  toggleBtn: {
    alignItems: 'center',
    height: 25,
    width: 20,
    justifyContent: 'center',
  },

  checkbox: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.PRIMARY,
    marginLeft: 12.5,
    marginVertical: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
