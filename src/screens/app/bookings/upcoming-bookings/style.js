import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // padding: 15,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.75,
    padding: 15,
    borderColor: COLORS.EXTRA_LIGHT,
  },

  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },

  image: {height: 90, width: 100},

  cardInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  name: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    fontSize: 16,
  },
  addr: {
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    fontSize: 11,
    marginVertical: 2,
    marginBottom: 3.5,
  },
  date: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 13,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  statusText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  roomDetail: {
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    fontSize: 11,
    marginTop: 2,
  },
  total: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
    fontSize: 14,
    marginTop: 4,
  },
});
