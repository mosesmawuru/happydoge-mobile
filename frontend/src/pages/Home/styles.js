import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: height - 45,
  },
  imgDiv: {
    borderRadius: 100,
    padding: 15,
    borderWidth: 15,
    borderColor: 'rgb(102,59,8)',
  },
  img: {
    width: 50,
    height: 50,
    borderWidth: 1,
  },
  curDiv: {
    marginTop: 20,
  },
  curMoney: {
    marginLeft: 5,
    fontSize: 23,
    color: 'rgb(119,118,120)',
  },
  tokenCount: {
    fontSize: 23,
    marginLeft: 5,
    color: 'rgb(223,100,71)',
  },
  submitButtonStyle: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgb(223,100,71)',
    borderRadius: 10,
    borderWidth: 1,
    width: 130,
    borderColor: '#fff',
  },
  TextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  rowDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDiv: {
    width: width,
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuDiv: {
    width: width,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnGroup: {
    width: width,
    paddingRight: 50,
    paddingLeft: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  transText: {
    marginTop: 20,
    color: 'rgb(1,154,213)',
  },
  circle: {
    backgroundColor: 'rgb(223,100,71)',
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 100,
  },
  moreText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'right',
    color: 'rgb(1,154,213)',
  },
  imgUnit: {
    width: 20,
    height: 20,
  },
  footTxt: {
    width: width,
    justifyContent: 'flex-end',
    paddingRight: 40,
  },
  iconDiv: {
    flexDirection: 'row',
  },
  headText: {
    color: 'rgb(102,59,8)',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
  },
});
export default styles;
