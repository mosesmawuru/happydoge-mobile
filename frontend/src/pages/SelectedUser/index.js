import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NumberFormat from 'react-number-format';
import Accordion from 'react-native-collapsible/Accordion';
import {CommonText} from '../../components/Common';
import {ActivityIndicator, Colors} from 'react-native-paper';
import Header from '../../components/Header';
import {
  getUserById,
  getStakeData,
  getTransferData,
  getWithdrawData,
  getReferralData,
} from '../../actions/userAction';
import isEmpty from '../../utils/isEmpty';
const SelectedUser = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [countHDT, setCountHDT] = useState();
  const [countETH, setCountETH] = useState();
  const [ethprice, setEthprice] = useState(0);
  const [activeSections, setActiveSections] = useState([]);
  const store = useSelector(state => state.user);
  const socket = useSelector(state => state.socket);
  const price = useSelector(state => state.price);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      if (!isEmpty(socket.socket) && !isEmpty(price.pricedata))
        socket.socket.on('price', item => {
          setEthprice(Number(item.price));
        });
    }
    return () => {
      isMount = false;
    };
  }, [socket, price]);

  const SECTIONS = [
    {
      title: 'STAKING DETAILS',
      content: (
        <View>
          {store.stakedata.length > 0 ? (
            store.stakedata.map((item, key) => {
              return (
                <View
                  key={key + 1}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <NumberFormat
                    value={item.stack_amount}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={'HDT'}
                    renderText={formattedValue => (
                      <Text
                        style={{
                          color: 'rgb(223, 100, 71)',
                          fontSize: 20,
                          fontWeight: 'bold',
                          padding: 10,
                          textAlign: 'center',
                        }}>
                        {formattedValue}
                      </Text>
                    )} // <--- Don't forget this!
                  />

                  <Text
                    style={{
                      color: 'rgb(223, 100, 71)',
                      fontSize: 23,
                      fontWeight: 'bold',
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    {Math.floor(
                      (new Date(item.end_date).getTime() -
                        new Date(item.date).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{' '}
                    days
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                color: 'rgb(223, 100, 71)',
                fontSize: 23,
                fontWeight: 'bold',
                padding: 10,
                textAlign: 'center',
              }}>
              No Staking History
            </Text>
          )}
        </View>
      ),
    },
    {
      title: 'REFERRAL DETAILS',
      content: (
        <View>
          {store.referraldata.length > 0 ? (
            store.referraldata.map((item, key) => {
              return (
                <View
                  key={key + 1}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: 'rgb(223, 100, 71)',
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    {item.referral_amount} USDT
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                color: 'rgb(223, 100, 71)',
                fontSize: 23,
                fontWeight: 'bold',
                padding: 10,
                textAlign: 'center',
              }}>
              No Referral History
            </Text>
          )}
        </View>
      ),
    },
    {
      title: 'WITHDRAWAL DETAILS',
      content: (
        <View>
          {store.withdrawdata.length > 0 ? (
            store.withdrawdata.map((item, key) => {
              return (
                <View
                  key={key + 1}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: 'rgb(223, 100, 71)',
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    WITHDRAWED {item.method === 'eth' ? 'ETH' : 'HDT'}
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(223, 100, 71)',
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    {item.amount} {item.method === 'eth' ? 'ETH' : 'HDT'}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                color: 'rgb(223, 100, 71)',
                fontSize: 23,
                fontWeight: 'bold',
                padding: 10,
                textAlign: 'center',
              }}>
              No Withdraw History
            </Text>
          )}
        </View>
      ),
    },
    {
      title: 'TRANSFER DETAILS',
      content: (
        <View>
          {store.transferdata.length > 0 ? (
            store.transferdata.map((item, key) => {
              return (
                <View
                  key={key + 1}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: 'rgb(223, 100, 71)',
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    {route.params.item.address === item.to_address
                      ? 'Received'
                      : 'Sent'}{' '}
                    {item.method === 'eth' ? 'ETH' : 'HDT'}
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(223, 100, 71)',
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 10,
                      textAlign: 'center',
                    }}>
                    {item.amount} {item.method === 'eth' ? 'ETH' : 'HDT'}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                color: 'rgb(223, 100, 71)',
                fontSize: 23,
                fontWeight: 'bold',
                padding: 10,
                textAlign: 'center',
              }}>
              No Transfer History
            </Text>
          )}
        </View>
      ),
    },
  ];

  const _renderHeader = section => {
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: 'rgb(223, 100, 71)',
              paddingVertical: 20,
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {section.title}
          </Text>
        </View>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View
        style={{
          backgroundColor: 'rgb(248,227,224)',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getUserById(route.params.item._id));
      dispatch(getStakeData(route.params.item._id));
      dispatch(getTransferData(route.params.item.address));
      dispatch(getWithdrawData(route.params.item.address));
      dispatch(getReferralData(route.params.item.address));
    }
    return () => {
      isMount = false;
    };
  }, [route]);

  return (
    <>
      <Header text="User Detail" navigation={navigation} />
      {store.loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={Colors.red800}
          style={{marginTop: 20}}
        />
      ) : (
        <ScrollView style={{backgroundColor: '#fff'}}>
          <View
            style={{width: '100%', paddingHorizontal: 20, paddingVertical: 30}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View>
                <CommonText color="rgb(223, 100, 71)" fontSize="15px">
                  USER ETH ADDRESS
                </CommonText>
              </View>
              <View
                style={{
                  width: '50%',
                }}>
                <CommonText color="rgb(223, 100, 71)" fontSize="14px">
                  {store.selectedUser.address}
                </CommonText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View>
                <CommonText color="rgb(223, 100, 71)" fontSize="15px">
                  PASSWORD
                </CommonText>
              </View>
              <View
                style={{
                  width: '50%',
                }}>
                <CommonText color="rgb(223, 100, 71)" fontSize="14px">
                  {store.selectedUser.password}
                </CommonText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View>
                <CommonText color="rgb(223, 100, 71)" fontSize="15px">
                  USER BALANCE
                </CommonText>
              </View>
              <View
                style={{
                  width: '50%',
                }}>
                <NumberFormat
                  value={
                    route.params.item.countHDT * price.pricedata.price +
                    ethprice * route.params.item.countETH +
                    route.params.item.countUSDT
                  }
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                  renderText={formattedValue => (
                    <CommonText color="rgb(223, 100, 71)" fontSize="14px">
                      {formattedValue}
                    </CommonText>
                  )} // <--- Don't forget this!
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 60,
              }}>
              <View>
                <View
                  style={{backgroundColor: 'rgb(223, 100, 71)', padding: 10}}>
                  <CommonText>HDT BALANCE</CommonText>
                </View>
                <View
                  style={{
                    backgroundColor: 'rgb(248,227,224)',
                  }}>
                  <View style={{padding: 15}}>
                    <View
                      style={{
                        borderWidth: 3,
                        borderColor: 'rgb(223, 100, 71)',
                      }}>
                      <TextInput
                        keyboardType="numeric"
                        style={{
                          padding: 4,
                          fontWeight: 'bold',
                        }}
                        onChangeText={msg => {
                          setCountHDT(msg);
                        }}>
                        {store.selectedUser.countHDT}
                      </TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        paddingVertical: 3,
                        backgroundColor: 'rgb(223,100,71)',
                        borderRadius: 20,
                        borderWidth: 1,
                        width: 60,
                        borderColor: '#fff',
                      }}>
                      <CommonText color="white" fontSize="12px">
                        EDIT
                      </CommonText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        paddingVertical: 3,
                        backgroundColor: 'rgb(223,100,71)',
                        borderRadius: 20,
                        borderWidth: 1,
                        width: 60,
                        borderColor: '#fff',
                      }}
                      onPress={() => {
                        const data = {
                          ID: route.params.item._id,
                          amount: countHDT,
                        };
                        console.log(data);
                      }}>
                      <CommonText color="white" fontSize="12px">
                        APPLY
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <View
                  style={{backgroundColor: 'rgb(223, 100, 71)', padding: 10}}>
                  <CommonText>ETH BALANCE</CommonText>
                </View>
                <View
                  style={{
                    backgroundColor: 'rgb(248,227,224)',
                  }}>
                  <View style={{padding: 15}}>
                    <View
                      style={{
                        borderWidth: 3,
                        borderColor: 'rgb(223, 100, 71)',
                      }}>
                      <TextInput
                        keyboardType="numeric"
                        style={{padding: 4, fontWeight: 'bold'}}
                        onChangeText={msg => {
                          setCountETH(msg);
                        }}>
                        {store.selectedUser.countETH}
                      </TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 10,
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        paddingVertical: 3,
                        backgroundColor: 'rgb(223,100,71)',
                        borderRadius: 20,
                        borderWidth: 1,
                        width: 60,
                        borderColor: '#fff',
                      }}>
                      <CommonText color="white" fontSize="12px">
                        EDIT
                      </CommonText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        paddingVertical: 3,
                        backgroundColor: 'rgb(223,100,71)',
                        borderRadius: 20,
                        borderWidth: 1,
                        width: 60,
                        borderColor: '#fff',
                      }}
                      onPress={() => {
                        const data = {
                          ID: route.params.item._id,
                          amount: countETH,
                        };
                        console.log(data);
                      }}>
                      <CommonText color="white" fontSize="12px">
                        APPLY
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
              }}>
              <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};
export default SelectedUser;
