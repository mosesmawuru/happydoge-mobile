import React from 'react';
import {View} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
export const CustomModal = props => {
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
          <Text style={styles.headerText}>{props.item.message}</Text>
        </View>
        <View style={styles.checkView}>
          <Icon name="check-circle" color={'#df6447'} size={80} />
        </View>
        {props.item.flag === 'eth' ? (
          <>
            <View style={styles.countView}>
              <Text style={styles.countText}>HDT</Text>
            </View>
            <View style={styles.commonview}>
              <Text style={styles.smallText}>Swapped To</Text>
            </View>
            <View style={styles.countView}>
              <Text style={styles.countText}>ETH</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.countView}>
              <Text style={styles.countText}>ETH</Text>
            </View>
            <View style={styles.commonview}>
              <Text style={styles.smallText}>Swapped To</Text>
            </View>
            <View style={styles.countView}>
              <Text style={styles.countText}>HDT</Text>
            </View>
          </>
        )}
      </View>
    </Overlay>
  );
};
