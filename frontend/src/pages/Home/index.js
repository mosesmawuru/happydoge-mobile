import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import {getUser} from '../../actions/profileAction';
import {getPrice} from '../../actions/exchangeAction';
import {getHistoryById} from '../../actions/historyAction';
import animal from '../../assets/img/doge.png';
import ethImg from '../../assets/img/eth.png';
import usdtImg from '../../assets/img/usdt.png';
import {newText} from '../../constant/history';
import isEmpty from '../../utils/isEmpty';
import moment from 'moment';

const Home = ({navigation, props}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [money, setMoney] = useState(0);
  const price = useSelector(state => state.price);
  const store = useSelector(state => state.auth);
  const history = useSelector(state => state.history);
  const socket = useSelector(state => state.socket);
  const profile = useSelector(state => state.profile);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getPrice());
      dispatch(getUser(store.user.id));
      dispatch(getHistoryById(store.user.address));
    }
    return () => {
      isMount = false;
    };
  }, [isFocused, props]);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      if (
        !isEmpty(socket.socket) &&
        !isEmpty(price.pricedata) &&
        !isEmpty(profile.profiledata)
      )
        socket.socket.on('price', item => {
          setMoney(
            price.pricedata.price * profile.profiledata.countHDT +
              Number(item.price) * profile.profiledata.countETH +
              profile.profiledata.countUSDT,
          );
        });
    }
    return () => {
      isMount = false;
    };
  }, [socket, price, profile, isFocused, props]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.menuDiv}>
          <Icon
            style={{paddingLeft: 10}}
            name="bars"
            size={30}
            color={'rgb(223,100,71)'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </View>
        <ScrollView>
          <View style={styles.scrollMenu}>
            <View style={styles.imgDiv}>
              <Image style={styles.img} source={animal} />
            </View>
            <View style={styles.curDiv}>
              <Text style={styles.curMoney}>${money.toFixed(2)}</Text>
            </View>
            <View style={styles.rowDiv}>
              <Image style={styles.imgUnit} source={animal} />
              <Text style={styles.tokenCount}>
                {isEmpty(profile.profiledata)
                  ? ''
                  : profile.profiledata.countHDT.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rowDiv}>
              <Image style={styles.imgUnit} source={ethImg} />
              <Text style={styles.curMoney}>
                {isEmpty(profile.profiledata)
                  ? ''
                  : profile.profiledata.countETH.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rowDiv}>
              <Image style={styles.imgUnit} source={usdtImg} />
              <Text style={styles.curMoney}>
                {isEmpty(profile.profiledata)
                  ? ''
                  : profile.profiledata.countUSDT.toFixed(2)}
              </Text>
            </View>
            <View>
              <View style={styles.btnGroup}>
                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Stacking')}>
                  <Text style={styles.TextStyle}>STACKING</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Transfer')}>
                  <Text style={styles.TextStyle}>TRANSFER</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnGroup}>
                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('SwapToEth')}>
                  <Text style={styles.TextStyle}>SWAP TO ETH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('SwapToHDT')}>
                  <Text style={styles.TextStyle}>SWAP TO HDT</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.transText}>LATEST TRANSACTIONS</Text>
            </View>

            <View>
              {history.loading ? (
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={Colors.red800}
                />
              ) : (
                history.historydata.map((item, key) => {
                  if (key < 4) {
                    return (
                      <View style={styles.historyDiv} key={key + 1}>
                        <View style={styles.rowDiv}>
                          <View style={styles.circle} />
                          <View>
                            {item.type === 1 ? (
                              item.method === 'eth' ? (
                                <Text>
                                  Deposit Completed. {item.amount} ETH
                                </Text>
                              ) : item.method === 'hdt' ? (
                                <Text>
                                  Deposit Completed. {item.amount} HDT
                                </Text>
                              ) : (
                                ''
                              )
                            ) : item.type === 2 ? (
                              item.method === 'eth' ? (
                                <Text>
                                  Withdraw Completed. {item.amount} ETH
                                </Text>
                              ) : item.method === 'hdt' ? (
                                <Text>
                                  Withdraw Completed. {item.amount} HDT
                                </Text>
                              ) : item.method === 'usdt' ? (
                                <Text>
                                  Withdraw Completed. {item.amount} USDT
                                </Text>
                              ) : (
                                ''
                              )
                            ) : item.type === 3 ? (
                              item.method === 'eth' ? (
                                <Text>
                                  Transferred to{' '}
                                  {item.to_address
                                    ? item.to_address.substring(0, 3) +
                                      '...' +
                                      item.to_address.substring(
                                        item.to_address.length - 3,
                                        item.to_address,
                                      )
                                    : ''}{' '}
                                  {item.amount} ETH
                                </Text>
                              ) : item.method === 'hdt' ? (
                                <Text>
                                  Transferred to{' '}
                                  {item.to_address
                                    ? item.to_address.substring(0, 3) +
                                      '...' +
                                      item.to_address.substring(
                                        item.to_address.length - 3,
                                        item.to_address,
                                      )
                                    : ''}{' '}
                                  {item.amount} HDT
                                </Text>
                              ) : (
                                ''
                              )
                            ) : item.type === 4 ? (
                              <Text>
                                HDT Staked Successfully {item.amount} HDT
                              </Text>
                            ) : item.type === 5 ? (
                              item.method === 'eth' ? (
                                <Text>{item.amount} ETH Swapped to HDT</Text>
                              ) : item.method === 'hdt' ? (
                                <Text>{item.amount} HDT Swapped to ETH</Text>
                              ) : (
                                ''
                              )
                            ) : item.type === 6 ? (
                              <Text>
                                Referral Commission Received. {item.amount} USDT
                              </Text>
                            ) : item.type === 7 ? (
                              <Text>
                                Staking Reward Added to Balance {item.amount}{' '}
                                HDT
                              </Text>
                            ) : (
                              ''
                            )}
                            <Text>
                              {moment(item.date).format('DD/MM/YYYY hh:mm A')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                })
              )}
            </View>

            <View style={styles.footTxt}>
              <Text
                style={styles.moreText}
                onPress={() =>
                  navigation.navigate('MoreHistory')
                }>{`more>>`}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
