import {StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components/native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: width,
    minHeight: height - 45,
  },
  headText: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#df6447',
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#df6447',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 10,
  },
  userDiv: {marginTop: 20, width: width - 30},
  headerView: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: width - 40,
  },
  earnTextView: {
    marginTop: 40,
    width: '50%',
  },
  earnHdtText: {
    color: 'rgb(102,59,8)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  earnHdt: {color: 'rgb(102,59,8)', fontSize: 20},
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
  SubTextStyle: {
    fontSize: 12,
    color: 'rgb(103,62,50)',
  },
  TextStyle: {
    fontSize: 15,
    color: 'rgb(103,62,50)',
  },
  btnText: {color: 'white', letterSpacing: 3, fontSize: 15, fontWeight: 'bold'},
  circleView: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickWeek: {
    width: '90%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 100,
    padding: 15,
    borderWidth: 2,
    borderColor: 'rgb(224,180,82)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickEarn: {
    width: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 100,
    padding: 15,
    borderWidth: 3,
    borderColor: 'rgb(224,180,82)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // progressLayer: {
  //   width: '100%',
  //   aspectRatio: 1,
  //   position: 'absolute',
  //   borderWidth: 15,
  //   borderLeftColor: 'rgb(224,180,82)',
  //   borderBottomColor: 'transparent',
  //   borderRightColor: 'rgb(224,180,82)',
  //   borderTopColor: 'rgb(224,180,82)',
  //   borderRadius: 100,
  //   transform: [{rotateZ: '-45deg'}],
  // },
  rowLayout: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  tokenTxt: {
    fontSize: 15,
    color: 'rgb(103,62,50)',
  },
  detailCircle: {
    width: (width - 40) / 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  stackTitle: {
    color: '#df6447',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default styles;
export const SelectCircle = styled.TouchableOpacity`
  display: flex;
  width: 90%;
  height: ${((width - 40) / 3 / 100) * 90}px;
  padding: 12px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${props => (props.click === true ? 'red' : 'rgb(224,180,82)')};
  justify-content: center;
  align-items: center;
  shadow-opacity: 0.75;
  shadow-radius: 15px;
  shadow-color: red;
  shadow-offset: 10px 10px;
`;
