import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
export const TransDetail = props => {
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
          <Text style={styles.headerText}>Transaction</Text>
        </View>
        <View style={styles.countView}>
          <View>
            <Text style={styles.countText}>Username</Text>
            <Text style={styles.commonText}>
              {props.item.user ? props.item.user.name : ''}
            </Text>
            <Text style={styles.countText}>Withdrawal address entered</Text>
            <Text style={styles.commonText}>{props.item.address}</Text>
            <Text style={styles.countText}>Date</Text>
            <Text style={styles.commonText}>{props.item.date}</Text>
            <Text style={styles.countText}>Balance</Text>
            <Text style={styles.commonText}>
              {props.item.amount}{' '}
              {props.item.method === 'eth'
                ? 'ETH'
                : props.item.method === 'hdt'
                ? 'HDT'
                : props.item.method === 'usdt'
                ? 'USDT'
                : ''}
            </Text>
          </View>
        </View>
        <View style={styles.idView}>
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              props.onApprove(props.item);
            }}>
            <Text style={styles.TextStyle}>Approve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};
