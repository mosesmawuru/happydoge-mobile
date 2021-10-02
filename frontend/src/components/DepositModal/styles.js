import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: height * 0.6,
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
  closeIcon: {},
  headerText: {
    color: '#df6447',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  countText: {
    color: '#343991',
    fontSize: 25,
  },
  smallText: {
    color: '#df6447',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  commonText: {
    textAlign: 'center',
    height: 'auto',
  },
  iconview: {
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  headerView: {flex: 0.2},
  checkView: {flex: 0.3},
  countView: {flex: 0.2},

  idView: {flex: 0.2},
});
export default styles;
