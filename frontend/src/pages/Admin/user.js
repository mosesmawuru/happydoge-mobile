import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tx = require('ethereumjs-tx').Transaction;
import {SearchBar, Badge} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {getWithdraw} from '../../actions/adminAction';
import {getUser} from '../../actions/profileAction';

const MyComponent = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Pending', icon: 'close'},
    {key: 'albums', title: 'Allowed', icon: 'check'},
  ]);

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const store = useSelector(state => state.transaction);
  const profile = useSelector(state => state.profile);
  const socket = useSelector(state => state.socket);
  const web3 = useSelector(state => state.web3);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getWithdraw());
    }
    return () => {
      isMount = false;
    };
  }, []);

  const MusicRoute = () => (
    <ScrollView>
      {store.transdata
        .filter(item => {
          return item.user.address.indexOf(search) > -1 && item.status === 3;
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
                          to: item.user.address,
                          value: parseInt(item.amount * 1000000000000000000),
                        };

                        var tx = new Tx(rawTransaction, {chain: 'ropsten'});
                        var privKey = Buffer.from(privateKey, 'hex');
                        tx.sign(privKey);
                        var serializedTx = tx.serialize();
                        web3.web3.eth.sendSignedTransaction(
                          '0x' + serializedTx.toString('hex'),
                          function (err, hash) {
                            if (!err) {
                              console.log('success');
                              socket.socket.emit('approve', item._id);
                              dispatch(getWithdraw());
                            } else {
                              console.log(err);
                            }
                          },
                        );
                      }}
                    />
                    <Button
                      icon={{name: 'close', color: 'white'}}
                      buttonStyle={{backgroundColor: 'red'}}
                      onPress={async () => {
                        await socket.socket.emit('reject', item);
                        await dispatch(getWithdraw());
                        await dispatch(getUser(item.user._id));
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
                    {item.user.address
                      ? item.user.address.substring(0, 10) +
                        '....' +
                        item.user.address.substring(
                          item.user.address.length - 10,
                          item.user.address.length,
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
          return item.user.address.indexOf(search) > -1 && item.status === 1;
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
                    {item.user.address
                      ? item.user.address.substring(0, 10) +
                        '....' +
                        item.user.address.substring(
                          item.user.address.length - 10,
                          item.user.address.length,
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
