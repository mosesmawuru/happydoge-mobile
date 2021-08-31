import React, {useEffect} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../actions/profileAction';
import {getPrice} from '../../actions/exchangeAction';
import {getHistoryById} from '../../actions/historyAction';
import {mainText, subText} from '../../constant/history';
import Header from '../../components/Header';
const MoreHistory = ({navigation}) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  const history = useSelector(state => state.history);
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
  }, []);
  // useEffect(() => {
  //   setInterval(async () => {
  //     await axios
  //       .get('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
  //       .then(res => {
  //         const ethprice = res.data.weightedAvgPrice;
  //         setMoney(
  //           profile.profiledata.countETH * ethprice +
  //             profile.profiledata.countHDT * price.pricedata.price,
  //         );
  //       });
  //   }, 21000);
  // });

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
                        <Text>
                          {item.type === 1
                            ? item.method === 'eth'
                              ? mainText[1].text
                              : mainText[5].text
                            : item.type === 2
                            ? mainText[1].text
                            : item.type === 3
                            ? item.from_address === store.user.address
                              ? mainText[0].text
                              : subText[0].description
                            : item.type === 4
                            ? mainText[0].text
                            : item.type === 5
                            ? mainText[0].text
                            : ''}
                        </Text>
                        <Text>
                          {item.type === 3
                            ? 'Transfer Money'
                            : item.type === 5
                            ? 'Swapped Money'
                            : item.type === 4
                            ? 'Staked HDT'
                            : ''}
                        </Text>
                      </View>
                    </View>

                    <Text>
                      {item.from_address
                        ? item.from_address === store.user.address ||
                          item.type === 4
                          ? '-'
                          : ''
                        : ''}
                      {item.type === 4 ? '-' : ''}
                      {item.amount} {item.method === 'eth' ? 'ETH' : 'HDT'}
                    </Text>
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
