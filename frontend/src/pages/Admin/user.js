import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar, Badge} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {getWithdraw} from '../../actions/adminAction';
import {getUser} from '../../actions/profileAction';
import {getPrice} from '../../actions/exchangeAction';
const Tx = require('ethereumjs-tx').Transaction;

const MyComponent = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Pending', icon: 'close'},
    {key: 'albums', title: 'Allowed', icon: 'check'},
  ]);

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
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
  }, []);
  console.log(price);
  const MusicRoute = () => (
    <ScrollView>
      {store.transdata
        .filter(item => {
          return item.address.indexOf(search) > -1 && item.status === 3;
        })
        .map((item, key) => {
          return (
            <View key={key + 1}>
              <ListItem.Swipeable
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
                        if (item.method === 'eth') {
                          const adminaddress =
                            '0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E';
                          const privateKey =
                            '09629aa26282f4f6bb7d9792a18e77cc2bcd0fbbb2113ccfeaf7933d45080738';
                          var count = await web3.web3.eth.getTransactionCount(
                            adminaddress,
                          );
                          var gasPrice = await web3.web3.eth.getGasPrice();
                          var gasLimit = 1000000;
                          var rawTransaction = {
                            from: adminaddress,
                            nonce: web3.web3.utils.toHex(count),
                            gasPrice: web3.web3.utils.toHex(gasPrice),
                            gasLimit: web3.web3.utils.toHex(gasLimit),
                            to: item.address,
                            value: parseInt(
                              ((item.amount * 100) /
                                price.pricedata.withdraw_rate) *
                                10 ** 18,
                            ),
                          };

                          var tx = new Tx(rawTransaction, {chain: 'ropsten'});
                          var privKey = Buffer.from(privateKey, 'hex');
                          tx.sign(privKey);
                          const serializedTx = `0x${tx
                            .serialize()
                            .toString('hex')}`;
                          const tran =
                            web3.web3.eth.sendSignedTransaction(serializedTx);

                          tran.on('transactionHash', async hash => {});

                          tran.on('receipt', async receipt => {
                            await socket.socket.emit('approve', item._id);
                            await dispatch(getWithdraw());
                          });

                          tran.on('error', () => {
                            console.log('err');
                          });
                          // var serializedTx = tx.serialize();
                          // web3.web3.eth.sendSignedTransaction(
                          //   '0x' + serializedTx.toString('hex'),
                          //   function (err, hash) {
                          //     if (!err) {
                          //       socket.socket.emit('approve', item._id);
                          //       dispatch(getWithdraw());
                          //     } else {
                          //       console.log(err);
                          //     }
                          //   },
                          // );
                        } else if (item.method === 'hdt') {
                        }
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
        })}
    </ScrollView>
  );

  const AlbumsRoute = () => (
    <ScrollView>
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

      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
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
