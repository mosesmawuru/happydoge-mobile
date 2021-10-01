import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import styles from './styles';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {mainText, subText} from '../../constant/history';
import moment from 'moment';
import Header from '../../components/Header';
const MoreHistory = ({navigation}) => {
  const store = useSelector(state => state.auth);
  const history = useSelector(state => state.history);
  return (
    <>
      <Header text="HISTORY" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>HISTORY</Text>
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
                return (
                  <View style={styles.historyDiv} key={key + 1}>
                    <View style={styles.rowDiv}>
                      <View style={styles.circle} />
                      <View>
                        {item.type === 1 ? (
                          item.method === 'eth' ? (
                            <Text>Deposit Completed. {item.amount} ETH</Text>
                          ) : item.method === 'hdt' ? (
                            <Text>Deposit Completed. {item.amount} HDT</Text>
                          ) : (
                            ''
                          )
                        ) : item.type === 2 ? (
                          item.method === 'eth' ? (
                            <Text>Withdraw Completed. {item.amount} ETH</Text>
                          ) : item.method === 'hdt' ? (
                            <Text>Withdraw Completed. {item.amount} HDT</Text>
                          ) : item.method === 'usdt' ? (
                            <Text>Withdraw Completed. {item.amount} USDT</Text>
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
                          <Text>HDT Staked Successfully {item.amount} HDT</Text>
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
                            Staking Reward Added to Balance {item.amount} HDT
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
              })
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MoreHistory;
