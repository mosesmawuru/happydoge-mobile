import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: 'rgb(223,100,71)',
    height: 45,
    width: width,
    paddingTop: 8,
  },
  headertxt: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  menuDiv: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subDiv: {
    width: width * 0.63,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default styles;
