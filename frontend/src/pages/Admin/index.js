import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import styles from './styles';
import {getWithdraw} from '../../actions/adminAction';
const Price = ({navigation}) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.transaction);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getWithdraw());
    }
    return () => {
      isMount = false;
    };
  }, []);
  console.log(store);
  return (
    <>
      <Header text="Transactions" navigation={navigation} />
    </>
  );
};
export default Price;
