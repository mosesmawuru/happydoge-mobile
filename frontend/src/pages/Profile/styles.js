import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  headText: {
    color: 'rgb(102,59,8)',
    marginTop: 30,
    fontSize: 30,
  },
  imgDiv: {
    borderRadius: 100,
    padding: 15,
    borderWidth: 15,
    borderColor: 'rgb(102,59,8)',
  },

  img: {
    width: 70,
    height: 70,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: width,
    maxWidth: width,
  },
  txtDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  txt: {
    fontSize: 20,
    marginLeft: 10,
  },
  wrapper: {
    textAlign: 'center',
    width: width - 20,

    marginTop: 20,
  },
  submitButtonStyle: {
    marginTop: 25,
    marginBottom: 25,
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
});
export default styles;
