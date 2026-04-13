import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { FONT_FAMILY } from '../../../../constants/font-family';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    //  padding: 15,
  },

  headerContainer: {
    backgroundColor: COLORS.PRIMARY,
    // height: 82.5,
    padding: 10,
    justifyContent: 'flex-end',
    paddingTop: StatusBar.currentHeight,
  },

  btn: {
    height: 44,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 5,
    marginBottom: 10,
  },

  btnTxt: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
    // marginTop: 2.5,
    marginLeft: 5,
    fontSize: 14,
  },

  topOfferBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 5,
    overflow: 'hidden',
    height: 60,
    alignItems: 'center',
    paddingRight: 10,
    elevation: 2,
  },
  bannerTitle: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBlackItalic,
    padding: 15,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    height: 90,
    textAlignVertical: 'center',
    marginVertical: -15,
    marginRight: 10,
    letterSpacing: 1,
  },
  bannerInfo: {
    fontSize: 15,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBlack,
    letterSpacing: 0.5,
  },
  bannerSubInfo: {
    fontSize: 12,
    color: '#00008B',
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.primary,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  topContainer: {
    height: '50%',
    backgroundColor: COLORS.PRIMARY,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  heading: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
  },

  subHeading: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  seeall: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
  },

  facility: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    marginBottom: 5,
  },
  remark: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 10,
    marginBottom: 5,
  },
  cityHeading: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
    marginBottom: 7.5,
  },
  placeholder: {
    fontSize: 18,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  selectedLocation: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  infoContainer: {
    borderBottomWidth: 10,
    paddingBottom: 15,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },
  btnTitle: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 2.5,
  },
  date: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 2.5,
  },
  day: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primaryBold,
    marginTop: 2.5,
  },
  searchBtn: {
    backgroundColor: COLORS.PRIMARY,
    alignSelf: 'center',
    height: 45,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  popularHotelRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  offerContainer: {
    width: width / 1.3,
    // flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.LIGHT_GREY,
    elevation: 2,
    borderRadius: 10,
    // marginHorizontal: 10,
    marginTop: 7.5,
    overflow: 'hidden',
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 10,
  },
  packageImage: {
    height: 130,
    width: width / 1.3,
    //resizeMode: 'contain',
  },
  banner: {
    height: 100,
    width: width - 30,
    resizeMode: 'contain',
    //  backgroundColor: 'red',
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
  },
  offerInfo: {
    //  flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },

  desc: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    // marginTop: 2.5,
    marginBottom: 15,
  },

  validity: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.GREY,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    fontSize: 12,
    color: '#FFD700',
    fontFamily: FONT_FAMILY.primaryBold,
  },
  rateflexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //modal

  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
    //paddingBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    flex: 1,
    marginLeft: 10,
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: FONT_FAMILY.primary,
    fontSize: 12,
    marginTop: 4,
    color: COLORS.BLACK,
  },

  list: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.EXTRALIGHT_GREY,
    marginTop: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  location: {
    fontSize: 10,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 2.5,
  },
  name: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginRight: 10,
  },

  calendarBtn: {
    height: 27.5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    elevation: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  calendarBtnTxt: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 2.5,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  roomsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 5,
  },
  RoomModalContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  RoomModalContent: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    // alignItems: 'center',
    //paddingBottom: 10,
  },
});
