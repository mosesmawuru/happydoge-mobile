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

          <Text style={styles.headertxt}>{text}</Text>
        </View>
        <Icon style={{paddingRight: 10}} name="cog" size={30} color={'#fff'} />
      </View>
    </View>
  );
};

export default Header;
