import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
import Header from '../../components/Header';
import {stack} from '../../actions/stackAction';
import styles from './styles';
const Stacking = ({navigation}) => {
  return (
    <>
      <Header text="STACKING" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.headText}>Stacking Details</Text>
          </View>
          <View>
            <Text style={styles.description}>
              You Have No Staking Contract. Click On Stake More To Add A New
              Contract.
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('AddStake');
              }}>
              <Text style={styles.btnText}>Stake More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Stacking;
