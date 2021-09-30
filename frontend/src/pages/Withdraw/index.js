import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Header from '../../components/Header';
import {withdraw} from '../../actions/withdrawAction';
import {DepositModal} from '../../components/DepositModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {message} from '../../constant/message';
import SelectDropdown from 'react-native-select-dropdown';
import {useIsFocused} from '@react-navigation/native';
import animal from '../../assets/img/animal.png';
import ethImg from '../../assets/img/eth.png';
import usdtImg from '../../assets/img/usdt.png';
import styles from './styles';

const celldata = ['ETH', 'HDT', 'USDT'];
const Withdraw = ({navigation, props}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
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
        senderAddress: address,
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
    await setAddress('');
    await setSelected('eth');
  };
  useEffect(() => {
    setError(errors);
  }, [errors, props, isFocused]);
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
              value={
                address
                  ? address.substring(0, 6) +
                    '....' +
                    address.substring(address.length - 6, address.length)
                  : ''
              }
              placeholder="Please input address."
              onChangeText={text => {
                setAddress(text);
              }}
              errorMessage={error.address}
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
                <SelectDropdown
                  data={celldata}
                  rowStyle={{
                    height: 40,
                    color: 'white',
                  }}
                  renderDropdownIcon={() => {
                    return (
                      <FontAwesome
                        name="chevron-down"
                        color={'#444'}
                        size={18}
                      />
                    );
                  }}
                  buttonStyle={{
                    color: 'white',
                    backgroundColor: 'white',
                    textAlign: 'left',
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 40,
                    width: 90,
                  }}
                  rowTextStyle={{color: 'black'}}
                  onSelect={(selectedItem, index) => {
                    if (selectedItem === 'HDT') {
                      setSelected('hdt');
                    } else if (selectedItem === 'ETH') {
                      setSelected('eth');
                    } else if (selectedItem === 'USDT') {
                      setSelected('usdt');
                    }
                  }}
                  defaultButtonText={celldata[0]}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  dropdownIconPosition="right"
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
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
