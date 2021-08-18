import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: width,
  },
  headText: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#df6447',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  userDiv: {marginTop: 20, width: width - 30},

  labelText: {
    fontSize: 20,
    marginLeft: 10,
  },
  submitButtonStyle: {
    marginTop: 25,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 45,
    paddingRight: 45,
    backgroundColor: 'rgb(223,100,71)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  TextStyle: {
    color: 'white',
  },
  circleView: {
    marginTop: 40,
    flexDirection: 'row',
  },
  clickWeek: {
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 100,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgb(102,59,8)',
  },
});
export default styles;
