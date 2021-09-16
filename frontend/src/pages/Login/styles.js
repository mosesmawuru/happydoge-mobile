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
  imgDiv: {
    marginTop: 20,
  },
  imgText: {
    color: 'rgb(223,100,71)',
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  userDiv: {
    marginTop: 40,
    width: width * 0.6,
  },
  errorDiv: {
    marginTop: 10,
    color: 'red',
  },

  footertext: {
    marginTop: 60,
    flexDirection: 'row',
    marginBottom: 30,
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
  signDiv: {
    marginLeft: 15,
    color: 'rgb(53,206,248)',
    textDecorationLine: 'underline',
  },
});
export default styles;
