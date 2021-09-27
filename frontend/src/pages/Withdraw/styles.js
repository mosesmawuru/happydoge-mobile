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
    color: 'rgb(102,59,8)',
    marginTop: 30,
    fontSize: 30,
  },
  subText: {
    color: 'rgb(102,59,8)',
    marginTop: 30,
    fontSize: 15,
  },
  userDiv: {marginTop: 20, width: width - 20},
  crypto: {width: width - 20},
  input: {
    borderColor: 'rgb(108,116,128)',
    color: 'rgb(108,116,128)',
    borderRadius: 8,
    width: 300,
    borderWidth: 1,
    fontSize: 15,
  },
  labelText: {
    fontSize: 20,
  },
  imgUnit: {
    width: 20,
    height: 20,
  },
  submitButtonStyle: {
    marginVertical: 25,
    paddingVertical: 8,
    paddingHorizontal: 45,
    backgroundColor: 'rgb(223,100,71)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  TextStyle: {
    color: 'white',
  },
  txt: {
    fontSize: 20,
    marginLeft: 10,
  },
});
export default styles;
