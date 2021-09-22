import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {swaptohdt} from '../../actions/swapAction';
import Header from '../../components/Header';
import {ActivityIndicator} from 'react-native-paper';
import {Input} from 'react-native-elements';
import {CustomModal} from '../../components/CustomModal';
import {message} from '../../constant/message';

import styles from './styles';
const SwapToHdt = ({navigation}) => {
  const dispatch = useDispatch();
  const [countETH, setCountETH] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [modalData, setModalData] = useState('');
  const [visible, setVisible] = useState(false);
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.errors);

  const swap = async () => {
    await setLoading(true);
    await axios
      .get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
      .then(res => {
        const price = res.data.weightedAvgPrice;
        if (price > 0) {
          if (isNaN(countETH)) {
            setError({countETH: 'only input number'});
          } else {
            if (checked) {
              dispatch(
                swaptohdt(
                  store.user.id,
                  Number(profile.profiledata.countETH),
                  price,
                  store.user.address,
                  onShowModal,
                  setLoading,
                ),
              );
            } else {
              dispatch(
                swaptohdt(
                  store.user.id,
                  Number(countETH),
                  price,
                  store.user.address,
                  onShowModal,
                  setLoading,
                ),
              );
            }
          }
        }
      });
  };
  const onShowModal = async flag => {
    const data = {
      message: message[1].message,
      flag: flag,
    };
    await setLoading(false);
    await setError({});
    await setCountETH(0);
    await setModalData(data);
    await setVisible(!visible);
  };
  useEffect(() => {
    setError(errors);
  }, [errors]);
  return (
    <>
      <Header text="SWAP TO HDT" navigation={navigation} />
      <ScrollView>
        <CustomModal
          item={modalData}
          visible={visible}
          setVisible={setVisible}
        />
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>SWAP TO HDT</Text>
          </View>
          <View style={styles.userDiv}>
            <Text style={styles.labelText}>Current ETH Balance</Text>
            <Input
              value={profile.profiledata.countETH.toString() + ' ETH'}
              disabled
            />
            <Text style={styles.labelText}>Current HDT Balance</Text>
            <Input
              value={profile.profiledata.countHDT.toString() + ' HDT'}
              disabled
            />
          </View>
          <View style={styles.userDiv}>
            <Text style={styles.labelText}>ETH</Text>
            <Input
              value={
                checked
                  ? profile.profiledata.countETH.toString()
                  : countETH.toString()
              }
              placeholder="Please input ETH "
              onChangeText={message => {
                setCountETH(message);
              }}
              errorStyle={{color: 'red'}}
              keyboardType="numeric"
              errorMessage={error.countETH}
              disabled={checked ? true : false}
            />
          </View>
          <CheckBox
            center
            title="Max"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              swap();
            }}>
            <Text style={styles.TextStyle}>SWAP</Text>
            {loading ? (
              <ActivityIndicator animating={true} size={13} color={'white'} />
            ) : (
              <></>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default SwapToHdt;
