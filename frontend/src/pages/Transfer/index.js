import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {getUser} from '../../actions/profileAction';
import {TransferModal} from '../../components/TransferModal';
import Header from '../../components/Header';
import styles from './styles';
import {message} from '../../constant/message';
import isEmpty from '../../utils/isEmpty';
const Transfer = ({navigation}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('eth');
  const [error, setError] = useState({});
  const [amount, setAmount] = useState(0);
  const [modalData, setModalData] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState('');
  const store = useSelector(state => state.auth);
  const socket = useSelector(state => state.socket);
  const errors = useSelector(state => state.errors);
  const send = async () => {
    // setLoading(true);
    if (isEmpty(address)) {
      setError({address: 'Please input address'});
    } else if (amount === 0) {
      setError({amount: 'Please input correct balance'});
    } else if (isNaN(amount)) {
      setError({amount: 'Please only input number'});
    } else {
      const data = {
        owneraddress: store.user.address,
        toaddress: address,
        flag: selected,
        amount: Number(amount),
        id: store.user.id,
      };
      await socket.socket.emit('transfer', data);
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
    await setError({});
    await setLoading(false);
  };
  useEffect(() => {
    setError(errors);
  }, [errors]);
  useEffect(() => {
    socket.socket.on('sent_money', async item => {
      await dispatch(getUser(item.id));
      await onShowModal(item.owner, item.method, item.amount);
    });
    socket.socket.on('failed_transfer', item => {
      setError(item);
    });
  }, [socket]);
  return (
    <>
      <TransferModal
        item={modalData}
        visible={visible}
        setVisible={setVisible}
      />
      <Header text="TRANSFER" navigation={navigation} />
      <ScrollView>
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
            <View>
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
            disabled={loading ? true : false}
            activeOpacity={0.5}
            onPress={() => {
              send();
            }}>
            <Text style={styles.TextStyle}>Send</Text>
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
export default Transfer;
