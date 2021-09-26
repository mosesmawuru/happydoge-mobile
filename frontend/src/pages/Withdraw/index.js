import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Header from '../../components/Header';
import {withdraw} from '../../actions/withdrawAction';
import {DepositModal} from '../../components/DepositModal';
import {message} from '../../constant/message';
import animal from '../../assets/img/animal.png';
import ethImg from '../../assets/img/eth.png';
import usdtImg from '../../assets/img/usdt.png';
import styles from './styles';
const Withdraw = ({navigation}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState({});
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [selected, setSelected] = useState('eth');
  const [address, setAddress] = useState('');

  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.errors);
  const onSubmit = async () => {
    if (isNaN(amount)) {
      setError({amount: 'Only input number'});
    } else {
      const data = {
        address: profile.profiledata.address,
        amount: amount,
        flag: selected,
        id: profile.profiledata._id,
      };
      await dispatch(withdraw(data, showModal));
    }
  };
  const showModal = async (amount, flag) => {
    const modalData = {
      message: message[3].message,
      content: message[3].content,
      flag: flag,
      amount: amount,
    };
    await setModalData(modalData);
    await setVisible(!visible);
    await setAmount(0);
    await setSelected('eth');
  };
  useEffect(() => {
    setError(errors);
  }, [errors]);
  return (
    <>
      <DepositModal
        item={modalData}
        visible={visible}
        setVisible={setVisible}
      />
      <Header text="Withdraw" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>Withdraw</Text>
          </View>
          <View style={styles.userDiv}>
            <Text style={styles.txt}>Address</Text>
            <Input
              value={
                profile.profiledata.address
                  ? profile.profiledata.address.substring(0, 6) +
                    '....' +
                    profile.profiledata.address.substring(
                      profile.profiledata.address.length - 6,
                      profile.profiledata.address.length,
                    )
                  : ''
              }
              disabled
            />
          </View>
          <View style={styles.crypto}>
            <Input
              value={profile.profiledata.countHDT.toString()}
              disabled
              leftIcon={<Image style={styles.imgUnit} source={animal} />}
            />
            <Input
              value={profile.profiledata.countETH.toString()}
              disabled
              leftIcon={<Image style={styles.imgUnit} source={ethImg} />}
            />
            <Input
              value={profile.profiledata.countUSDT.toString()}
              disabled
              leftIcon={<Image style={styles.imgUnit} source={usdtImg} />}
            />
            <Input
              value={address}
              placeholder="Please input address."
              onChange={text => {
                setAddress(text);
              }}
            />
            <Input
              value={amount.toString()}
              placeholder="Please input balance"
              onChangeText={message => {
                setAmount(message);
              }}
              errorStyle={{color: 'red'}}
              keyboardType="numeric"
              errorMessage={error.amount}
              rightIcon={
                <Picker
                  style={{width: 110}}
                  selectedValue={selected}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelected(itemValue);
                  }}>
                  <Picker.Item label="ETH" value="eth" />
                  <Picker.Item label="HDT" value="hdt" />
                  <Picker.Item label="USDT" value="usdt" />
                </Picker>
              }
            />
          </View>
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              onSubmit();
            }}>
            <Text style={styles.TextStyle}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default Withdraw;
