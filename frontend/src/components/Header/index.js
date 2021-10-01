import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GET_ERRORS} from '../../actions/type';
const Header = ({text, navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.menuDiv}>
        <View style={styles.subDiv}>
          <Icon
            style={{paddingLeft: 10}}
            name="bars"
            size={30}
            color={'#fff'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <Icon
            name="arrow-left"
            size={25}
            color={'#fff'}
            onPress={() => {
              navigation.goBack();
              dispatch({type: GET_ERRORS, payload: []});
            }}
          />
          <Text style={styles.headertxt}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
