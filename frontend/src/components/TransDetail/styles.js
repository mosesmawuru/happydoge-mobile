import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: height * 0.55,
    backgroundColor: 'rgb(248,227,224)',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    color: '#df6447',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  countText: {
    color: '#343991',
    fontSize: 20,
  },
  smallText: {
    color: '#df6447',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  commonText: {
    height: 'auto',
  },
  iconview: {
    alignSelf: 'flex-end',
    paddingRight: 8,
  },
  headerView: {flex: 0.5},
  countView: {flex: 1.2},
  idView: {flex: 0.5, flexDirection: 'row'},
  submitButtonStyle: {
    marginTop: 25,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 25,
    backgroundColor: 'rgb(223,100,71)',
    borderColor: 'rgb(248,227,224)',
    borderRadius: 10,
    borderWidth: 1,

    flexDirection: 'row',
  },
  TextStyle: {
    color: 'white',
  },
});
export default styles;
