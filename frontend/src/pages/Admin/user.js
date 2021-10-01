import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {ListItem, Button} from 'react-native-elements';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar, Badge} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {getWithdraw} from '../../actions/adminAction';
import {getUser} from '../../actions/profileAction';
import {getPrice} from '../../actions/exchangeAction';
import {TransDetail} from '../../components/TransDetail';
import {ErrorModal} from '../../components/ErrorModal';
const Tx = require('ethereumjs-tx').Transaction;

const MyComponent = ({navigation, props}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Pending', icon: 'close'},
    {key: 'albums', title: 'Allowed', icon: 'check'},
  ]);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorData, setErrorData] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [item, setItem] = useState('');
  const store = useSelector(state => state.transaction);
  const socket = useSelector(state => state.socket);
  const web3 = useSelector(state => state.web3);
  const price = useSelector(state => state.price);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getWithdraw());
      dispatch(getPrice());
    }
    return () => {
      isMount = false;
    };
  }, [isFocused, props]);

  const onClickItem = item => {
    setVisible(true);
    setItem(item);
  };
  const showErrorModal = async message => {
    const modalData = {
      message: message,
    };
    await setErrorData(modalData);
    await setErrorVisible(!errorVisible);
  };
  const onApprove = async item => {
    setLoading(true);
    if (item.method === 'eth') {
      const adminaddress = '0x9C817E9A34ED3f6da12B09B4fcB6B90da461bAc6';
      const privateKey =
        '9b066f6d1864f4d8420e9b99e1041fa29cf748f708c2afb0ea66c55175858705';
      var count = await web3.web3.eth.getTransactionCount(adminaddress);
      var gasPrice = await web3.web3.eth.getGasPrice();
      var gasLimit = 1000000;
      var rawTransaction = {
        from: adminaddress,
        nonce: web3.web3.utils.toHex(count),
        gasPrice: web3.web3.utils.toHex(gasPrice),
        gasLimit: web3.web3.utils.toHex(gasLimit),
        to: item.address,
        value: parseInt(
          ((item.amount * 100) / price.pricedata.withdraw_rate) * 10 ** 18,
        ),
      };

      var tx = new Tx(rawTransaction, {chain: 'ropsten'});
      var privKey = Buffer.from(privateKey, 'hex');
      tx.sign(privKey);
      const serializedTx = `0x${tx.serialize().toString('hex')}`;
      const tran = web3.web3.eth.sendSignedTransaction(serializedTx);

      tran.on('transactionHash', async hash => {});

      tran.on('receipt', async receipt => {
        await socket.socket.emit('approve', item._id);
        await dispatch(getWithdraw());
        await setLoading(false);
        await setVisible(false);
      });

      tran.on('error', err => {
        showErrorModal(err.message);
      });
    } else if (item.method === 'hdt') {
    }
  };
  const MusicRoute = () => (
    <ScrollView style={{backgroundColor: '#fff'}}>
      {loading ? (
        <ActivityIndicator
          style={{marginTop: 5}}
          animating={true}
          size={50}
          color={'red'}
        />
      ) : (
        store.transdata
          .filter(item => {
            return item.address.indexOf(search) > -1 && item.status === 3;
          })
          .map((item, key) => {
            return (
              <View key={key + 1}>
                <ListItem.Swipeable
                  onPress={() => {
                    onClickItem(item);
                  }}
                  rightContent={
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                      }}>
                      <Button
                        icon={{name: 'check', color: 'white'}}
                        buttonStyle={{backgroundColor: 'green'}}
                        onPress={async () => {
                          onApprove(item);
                        }}
                      />
                      <Button
                        icon={{name: 'close', color: 'white'}}
                        buttonStyle={{backgroundColor: 'red'}}
                        onPress={async () => {
                          await socket.socket.emit('reject', item);
                          await dispatch(getWithdraw());
                          await dispatch(getUser(item._id));
                        }}
                      />
                    </View>
                  }>
                  <Icon
                    style={{paddingLeft: 10}}
                    name="user"
                    size={30}
                    color={'rgb(223,100,71)'}
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                  <ListItem.Content bottomDivider>
                    <ListItem.Title>
                      {item.address
                        ? item.address.substring(0, 10) +
                          '....' +
                          item.address.substring(
                            item.address.length - 10,
                            item.address.length,
                          )
                        : ''}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Badge
                        value={
                          item.status === 1
                            ? 'Success'
                            : item.status === 2
                            ? 'Reject'
                            : 'Pending'
                        }
                        status={
                          item.status === 1
                            ? 'success'
                            : item.status === 2
                            ? 'error'
                            : 'primary'
                        }
                      />
                      <Text>
                        {item.amount}{' '}
                        {item.method === 'eth'
                          ? 'ETH'
                          : item.method === 'hdt'
                          ? 'HDT'
                          : item.method === 'usdt'
                          ? 'USDT'
                          : ''}
                      </Text>
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem.Swipeable>
              </View>
            );
          })
      )}
    </ScrollView>
  );

  const AlbumsRoute = () => (
    <ScrollView style={{backgroundColor: '#fff'}}>
      {store.transdata
        .filter(item => {
          return item.address.indexOf(search) > -1 && item.status === 1;
        })
        .map((item, key) => {
          return (
            <View key={key + 1}>
              <ListItem.Swipeable>
                <Icon
                  style={{paddingLeft: 10}}
                  name="user"
                  size={30}
                  color={'rgb(223,100,71)'}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
                <ListItem.Content bottomDivider>
                  <ListItem.Title>
                    {item.address
                      ? item.address.substring(0, 10) +
                        '....' +
                        item.address.substring(
                          item.address.length - 10,
                          item.address.length,
                        )
                      : ''}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Badge
                      value={
                        item.status === 1
                          ? 'Success'
                          : item.status === 2
                          ? 'Reject'
                          : 'Pending'
                      }
                      status={
                        item.status === 1
                          ? 'success'
                          : item.status === 2
                          ? 'error'
                          : 'primary'
                      }
                    />
                    <Text>
                      {item.amount} {item.method === 'eth' ? 'ETH' : 'HDT'}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Chevron />
              </ListItem.Swipeable>
            </View>
          );
        })}
    </ScrollView>
  );

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
  });
  return (
    <>
      <Header text="Transactions" navigation={navigation} />
      <TransDetail visible={visible} item={item} setVisible={setVisible} />
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
      />
      <ErrorModal
        item={errorData}
        visible={errorVisible}
        setVisible={setErrorVisible}
      />
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default MyComponent;
