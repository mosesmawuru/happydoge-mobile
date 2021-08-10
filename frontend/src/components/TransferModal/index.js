import React from 'react';
import {View} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
export const TransferModal = props => {
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={props.visible}
      animationType="fade">
      <View style={styles.iconview}>
        <Icon
          name="times"
          color={'#df6447'}
          style={styles.closeIcon}
          size={30}
          onPress={() => {
            props.setVisible(!props.visible);
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Transfer Complete</Text>
        </View>
        <View style={styles.checkView}>
          <Icon name="check-circle" color={'#df6447'} size={80} />
        </View>
        <View style={styles.countView}>
          <Text style={styles.countText}>
            {props.item.flag === 'eth' ? 'ETH' : 'HDT'} {props.item.amount}
          </Text>
        </View>
        <View style={styles.commonview}>
          <Text style={styles.smallText}>Sent To</Text>
        </View>
        <View style={styles.idView}>
          <Text style={styles.commonText}>{props.item.address}</Text>
        </View>
      </View>
    </Overlay>
  );
};
