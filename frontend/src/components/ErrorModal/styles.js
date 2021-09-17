import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: height * 0.5,
    backgroundColor: 'rgb(248,227,224)',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    maxWidth: 170,
  },

  countText: {
    color: '#df6447',
    fontSize: 18,
    textAlign: 'center',
  },

  commonText: {
    textAlign: 'center',
    height: 'auto',
  },
  iconview: {
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  checkView: {flex: 0.4},
  countView: {flex: 0.55},
});
export default styles;
