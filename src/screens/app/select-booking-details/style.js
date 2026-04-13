import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { FONT_FAMILY } from '../../../constants/font-family';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

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
    paddingBottom: 30,
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

  hourRate: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    // marginBottom: 20,
    marginTop: 5,
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
    fontFamily: FONT_FAMILY.primaryMedium,
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
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
  },

  guestAge: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
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
    fontFamily: FONT_FAMILY.primaryMedium,
    marginHorizontal: 20,
    fontSize: 18,
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

  roomTypeContainer: {
    marginTop: 20,
  },

  roomTypeTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  roomTypeItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    // justifyContent: 'space-between',
  },

  roomTypeItem: {
    padding: 15,
    width: '48%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    marginBottom: 10,
    backgroundColor: '#f8f7fc',
  },

  roomTypeItemSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: '#f0eeff',
    borderWidth: 1.5,
  },

  roomTypeText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
  },

  roomListContainer: {
    marginTop: 10,
  },
  roomItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
  },
  roomItemSelected: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  roomImage: {
    width: 100,
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  roomInfo: {
    flex: 1,
    padding: 10,
  },
  roomName: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
  roomPrice: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    marginTop: 5,
  },
  roomDetails: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    marginTop: 2,
  },
  roomBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    gap: 5,
  },
  roomBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roomBadgeText: {
    fontSize: 10,
    color: '#2e7d32',
    fontFamily: FONT_FAMILY.primaryMedium,
    textTransform: 'uppercase',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
  roomAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    margin: 8,
    gap: 4,
  },
  roomAddBtnText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.WHITE,
  },
  selectedRoomsSection: {
    marginTop: 20,
  },
  selectedRoomCard: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: COLORS.PRIMARY,
    backgroundColor: '#f0eeff',
    marginBottom: 12,
    overflow: 'hidden',
  },
  selectedRoomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 2,
  },
  selectedRoomName: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    flex: 1,
    marginRight: 8,
  },
  selectedRoomPrice: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.PRIMARY,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
});
