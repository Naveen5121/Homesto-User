import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  topContainer: {
    backgroundColor: COLORS.PRIMARY,
    height: width / 1.4,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  btn: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 40,
    paddingVertical: 20,
    //  borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },

  btnTxt: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 14,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
  },

  heading: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 18,
    color: COLORS.WHITE,
    marginBottom: 5,
    marginTop: 20,
  },

  price: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 14,
    color: COLORS.BLACK,
    textAlign: 'center',
  },

  details: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },

  image: {
    height: 200,
    width: width - 40,
    resizeMode: 'stretch',
    borderRadius: 5,
    marginBottom: 15,
  },

  hotelcard: {
    padding: 10,
    backgroundColor: COLORS.WHITE,
    //  flexDirection: 'row',
    margin: 10,
    elevation: 5,
    borderRadius: 5,
  },

  hotelInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
  },
  hotelInfo: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    marginVertical: 10,
  },
});
