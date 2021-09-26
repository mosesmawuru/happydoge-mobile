import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Header from '../../components/Header';
import {DepositModal} from '../../components/DepositModal';
import {ErrorModal} from '../../components/ErrorModal';
import {message} from '../../constant/message';
import {BigNumber, ethers} from 'ethers';
import {hdtABI, usdtABI} from '../../constant/ABI';
const Tx = require('ethereumjs-tx').Transaction;
import styles from './styles';
const Deposit = ({navigation}) => {
  const hdtContractAddress = '0x08895697055b82890a312dfc9f52df907d8fd001';
  const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [myBalance, setMyBalance] = useState(0);
  const [selected, setSelected] = useState('eth');
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [errorData, setErrorData] = useState('');
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
        const tran = web3.web3.eth.sendSignedTransaction(serializedTx);

        tran.on('transactionHash', async hash => {});

        tran.on('receipt', async receipt => {
          const data = {
            id: store.user.id,
            address: profile.profiledata.address,
            flag: selected,
            amount: Number(amount),
          };

          await socket.socket.emit('deposit', data);
          await showModal(selected, Number(amount));
          await setBalance(profile, web3, selected);
        });

        tran.on('error', console.error);
      } else if (selected === 'hdt') {
        ////////////////////////////
        const myAddress = '0xE34440801560549F7d575Aa449562536346c0777';
        const destAddress = '0x9C817E9A34ED3f6da12B09B4fcB6B90da461bAc6';
        const contract = new web3.web3.eth.Contract(
          usdtABI,
          usdtContractAddress,
        );
        var count = await web3.web3.eth.getTransactionCount(myAddress);
        var transfer = contract.methods.transfer(destAddress, 10);
        var encodedABI = transfer.encodeABI();
        var rawTransaction = {
          from: myAddress,
          // to: hdtContractAddress,
          // value: '0x0',
          gas: 2000000,
          data: encodedABI,
          // nonce: '0x' + count.toString(16),
          // gasPrice: 0x2cb417800,
          // gasLimit: 0x30d40,
          // chainId: 1,
        };
        var tx = new Tx(rawTransaction);

        const privatekey =
          'e1aa9022d303c6bedd2503b24d92be7bd28d1f84a48bd3f56608ff9264926354';
        // var privKey = Buffer.from(privatekey, 'hex');
        // tx.sign(privKey);
        // const serializedTx = `0x${tx.serialize().toString('hex')}`;
        // web3.web3.eth.sendSignedTransaction(
        //   serializedTx,
        //   async function (err, hash) {
        //     if (!err) {
        //       console.log(hash);
        //     } else {
        //       console.log(err);
        //     }
        //   },
        // );

        web3.web3.eth.accounts
          .signTransaction(rawTransaction, privatekey)
          .then(async signedTx => {
            console.log(signedTx);
            await web3.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
          })
          .then(function (receipt) {
            console.log('Transaction receipt: ', receipt);
          })
          .then(async req => {
            /* The trx was done. Write your acctions here. For example getBalance */
            const balance = await contract.methods
              .balanceOf(destAddress)
              .call();
            console.log(balance);
            return true;
          });

        ////////////////////////
      }
    }
  };

  const showModal = async (flag, amount) => {
    const modalData = {
      message: message[2].message,
      content: message[2].content,
      flag: flag,
      amount: amount,
    };
    await setModalData(modalData);
    await setVisible(!visible);
    await setError({});
  };
  const showErrorModal = async () => {
    const modalData = {
      message: 'Please check transaction status or blance.',
    };
    await setErrorData(modalData);
    await setErrorVisible(!errorVisible);
    await setError({});
    await setLoading(false);
  };

  useEffect(() => {
    setError(errors);
  }, [errors]);
  const setBalance = async (profile, web3, selected) => {
    if (selected === 'eth') {
      const price = await web3.web3.eth.getBalance(profile.profiledata.address);
      await setMyBalance(ethers.utils.formatEther(BigNumber.from(price)));
      await setLoading(false);
    } else if (selected === 'hdt') {
      const contract = new web3.web3.eth.Contract(hdtABI, hdtContractAddress);
      const result = await contract.methods
        .balanceOf('0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E')
        .call(); // 29803630997051883414242659
      const format = web3.web3.utils.fromWei(result); // 29803630.997051883414242659
      await setMyBalance(format);
      await setLoading(false);
    }
  };
  useEffect(async () => {
    let isMount = true;
    if (isMount) {
      if (profile.profiledata && web3) {
        setBalance(profile, web3, selected);
      }
    }
    return () => {
      isMount = false;
    };
  }, [web3, profile]);
  return (
    <>
      <DepositModal
        item={modalData}
        visible={visible}
        setVisible={setVisible}
      />
      <ErrorModal
        item={errorData}
        visible={errorVisible}
        setVisible={setErrorVisible}
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
                onValueChange={async itemValue => {
                  await setLoading(true);
                  await setSelected(itemValue);
                  await setBalance(profile, web3, itemValue);
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
            <ActivityIndicator animating={true} size={13} color={'white'} />
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Deposit;
