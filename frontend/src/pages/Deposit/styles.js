import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: width,
    height: height,
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
    flexDirection: 'row',
  },
  TextStyle: {
    color: 'white',
    marginRight: 10,
  },

  txt: {
    fontSize: 20,
    marginLeft: 10,
  },
});
export default styles;
