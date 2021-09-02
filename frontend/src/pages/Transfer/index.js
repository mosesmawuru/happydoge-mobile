import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import {transfer} from '../../actions/transferAction';
import {TransferModal} from '../../components/TransferModal';
import Header from '../../components/Header';
import styles from './styles';
import {message} from '../../constant/message';
const Transfer = ({navigation}) => {
  const dispath = useDispatch();
  const [selected, setSelected] = useState('eth');
  const [error, setError] = useState({});
  const [amount, setAmount] = useState(0);
  const [modalData, setModalData] = useState('');
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');
  const store = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);
  const send = () => {
    if (amount === 0) {
      setError({amount: 'Please input correct balance'});
    }
    if (isNaN(amount)) {
      setError({amount: 'Please only input number'});
    } else {
      dispath(
        transfer(
          store.user.address,
          address,
          selected,
          Number(amount),
          store.user.id,
          onShowModal,
        ),
      );
    }
  };
  const onShowModal = async (toaddress, flag, amount) => {
    const modalData = {
      message: message[0].message,
      address: toaddress,
      flag: flag,
      amount: amount,
    };
    await setModalData(modalData);
    await setVisible(!visible);
    await setAddress('');
    await setAmount(0);
  };
  useEffect(() => {
    setError(errors);
  }, [errors]);
  return (
    <>
      <TransferModal
        item={modalData}
        visible={visible}
        setVisible={setVisible}
      />
      <Header text="TRANSFER" navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.headText}>TRANSFER</Text>
        </View>
        <View>
          <View style={styles.userDiv}>
            <Text style={styles.labelText}>From</Text>
            <Input
              placeholder="Please input address"
              value={
                store.user.address
                  ? store.user.address.substring(0, 6) +
                    '....' +
                    store.user.address.substring(
                      store.user.address.length - 6,
                      store.user.address.length,
                    )
                  : ''
              }
              disabled
            />
          </View>
          <View style={styles.userDiv}>
            <Text style={styles.labelText}>To</Text>
            <Input
              value={address}
              placeholder="Please input address"
              onChangeText={message => {
                setAddress(message);
              }}
              errorStyle={{color: 'red'}}
              errorMessage={error.address}
            />
          </View>

          <View>
            <Text style={styles.labelText}>Balance</Text>
            <Input
              value={amount.toString()}
              placeholder="Please input blance"
              onChangeText={message => {
                setAmount(message);
              }}
              errorStyle={{color: 'red'}}
              keyboardType="numeric"
              errorMessage={error.amount}
              rightIcon={
                <Picker
                  style={{width: 100}}
                  selectedValue={selected}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelected(itemValue);
                  }}>
                  <Picker.Item label="ETH" value="eth" />
                  <Picker.Item label="HDT" value="hdt" />
                </Picker>
              }
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.submitButtonStyle}
          activeOpacity={0.5}
          onPress={() => {
            send();
          }}>
          <Text style={styles.TextStyle}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Transfer;
