import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Header from '../../components/Header';
import {DepositModal} from '../../components/DepositModal';
import {message} from '../../constant/message';
import {BigNumber, ethers} from 'ethers';
import {deposit} from '../../actions/depositAction';
import {hdtABI} from '../../utils/hdtABI';
const Tx = require('ethereumjs-tx').Transaction;
import styles from './styles';
const Deposit = ({navigation}) => {
  const contractAddress = '0x08895697055b82890a312dfc9f52df907d8fd001';
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myBalance, setMyBalance] = useState(0);
  const [selected, setSelected] = useState('eth');
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [error, setError] = useState({});
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.errors);
  const web3 = useSelector(state => state.web3);
  const socket = useSelector(state => state.socket);

  const onSubmit = async () => {
    if (Number(amount) === 0) {
      setError({amount: 'Please input correct balance'});
    } else if (Number(amount) > myBalance) {
      setError({amount: 'Not Sufficiant Balance'});
    } else if (isNaN(amount)) {
      setError({amount: 'Please only input number'});
    } else {
      setLoading(true);
      if (selected === 'eth') {
        const adminaddress = '0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E';
        var count = await web3.web3.eth.getTransactionCount(
          profile.profiledata.address,
        );
        var gasPrice = await web3.web3.eth.getGasPrice();
        var gasLimit = 1000000;
        // console.log(gasLimit, gasPrice, amount, count);
        var rawTransaction = {
          from: profile.profiledata.address,
          nonce: web3.web3.utils.toHex(count),
          gasPrice: web3.web3.utils.toHex(gasPrice),
          gasLimit: web3.web3.utils.toHex(gasLimit),
          to: adminaddress,
          value: parseInt(amount * 1000000000000000000),
        };
        var tx = new Tx(rawTransaction, {chain: 'ropsten'});
        const privatekey = profile.profiledata.privateKey.substring(
          2,
          profile.profiledata.privateKey.length,
        );
        var privKey = Buffer.from(privatekey, 'hex');
        tx.sign(privKey);

        const serializedTx = `0x${tx.serialize().toString('hex')}`;

        web3.web3.eth.sendSignedTransaction(serializedTx, function (err, hash) {
          if (!err) {
            setBalance(profile, web3);
            const data = {
              id: store.user.id,
              address: profile.profiledata.address,
              flag: selected,
              amount: Number(amount),
            };
            socket.socket.emit('deposit', data);
          } else {
            console.log(err);
          }
        });
      } else if ((selected = 'hdt')) {
      }
    }
  };

  const sendRealTransaction = async () => {};
  const showModal = async (flag, amount) => {
    const modalData = {
      message: message[2].message,
      content: message[2].content,
      flag: flag,
      amount: amount,
    };
    await setModalData(modalData);
    await setVisible(!visible);
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);
  const setBalance = async (profile, web3) => {
    const price = await web3.web3.eth.getBalance(profile.profiledata.address);
    await setMyBalance(ethers.utils.formatEther(BigNumber.from(price)));
    await setLoading(false);
  };
  useEffect(async () => {
    let isMount = true;
    if (isMount) {
      if (profile.profiledata && web3) {
        setBalance(profile, web3);
      }
    }
    return () => {
      isMount = false;
    };
  }, [web3, profile]);
  useEffect(() => {
    socket.socket.on('success_deposit', item => {
      if (item.address === profile.profiledata.address) {
        showModal(selected, item.amount);
      }
    });
  }, [socket]);
  return (
    <ScrollView>
      <DepositModal
        item={modalData}
        visible={visible}
        setVisible={setVisible}
      />
      <Header text="DEPOSIT" navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.headText}>Deposit</Text>
        </View>

        <View style={styles.userDiv}>
          <Text style={styles.txt}>My Ethereum Balance of wallet</Text>
          <Input value={myBalance.toString()} disabled />
          <Text style={styles.txt}>My Address</Text>
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
            onChangeText={message => {
              setAddress(message);
            }}
          />

          <Input
            value={amount.toString()}
            placeholder="Please input ETH Amount"
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
        <TouchableOpacity
          style={styles.submitButtonStyle}
          disabled={loading ? true : false}
          activeOpacity={0.5}
          onPress={() => {
            onSubmit();
          }}>
          <Text style={styles.TextStyle}>Deposit</Text>
          {loading ? (
            <ActivityIndicator animating={true} size={13} color={'red'} />
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Deposit;
