import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: width,
    minHeight: height,
  },
  headText: {
    color: 'rgb(102,59,8)',
    marginTop: 30,
    fontSize: 30,
  },
  imgDiv: {
    marginTop: 40,
  },
  imgText: {
    color: 'rgb(223,100,71)',
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 3,
  },

  errorDiv: {
    marginTop: 10,
    color: 'red',
  },
  userDiv: {
    width: width * 0.7,
  },
  footertext: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  submitButtonStyle: {
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
  signDiv: {
    marginLeft: 15,
    color: 'rgb(53,206,248)',
    textDecorationLine: 'underline',
  },
});
export default styles;
