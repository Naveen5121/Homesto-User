import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';
var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  logo: {
    height: 75,
    width: 150,
    resizeMode: 'contain',
    //backgroundColor: 'pink',
    marginLeft: 5,
    alignSelf: 'center',
    marginVertical: 40,
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  subsection: {
    marginBottom: 15,
  },
  clause: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.primaryLight,
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  content: {
    fontSize: 12.5,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'justify',
    marginBottom: 10,
  },
  list: {
    //marginLeft: 10,
  },
  listItem: {
    fontSize: 12.5,
    marginBottom: 10,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'justify',
  },
});
