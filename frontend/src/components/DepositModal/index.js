import React from 'react';
import {View} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
export const DepositModal = props => {
  return (
    <Overlay overlayStyle={styles.container} isVisible={props.visible} animationType="fade">
      <View style={styles.iconview}>
        <Icon
          name="times"
          color={'#df6447'}
          style={styles.closeIcon}
          size={30}
          onPress={()=>{
            props.setVisible(!props.visible)
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Deposit COmplete</Text>
        </View>
        <View style={styles.checkView}>
          <Icon name="check-circle" color={'#df6447'} size={80} />
        </View>
        <View style={styles.countView}>
          <Text style={styles.countText}>HDT 45</Text>
        </View>
        <View style={styles.idView}>
          <Text style={styles.commonText}>
            Tokens will be deposited after network confirmation
          </Text>
        </View>
      </View>
    </Overlay>
  );
};
