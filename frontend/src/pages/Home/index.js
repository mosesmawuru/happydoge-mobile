import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Badge} from 'react-native-elements';
import {ActivityIndicator, Colors} from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../actions/profileAction';
import {getPrice} from '../../actions/exchangeAction';
import {getHistoryById} from '../../actions/historyAction';
import animal from '../../assets/img/animal.png';
import {SERVER_URL} from '../../constant/server_url';
import {mainText, subText} from '../../constant/history';
import io from 'socket.io-client';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [hdtprice, setHdtprice] = useState(0);
  const [money, setMoney] = useState(0);
  const price = useSelector(state => state.price);
  const store = useSelector(state => state.auth);
  const history = useSelector(state => state.history);
  useEffect(() => {
    // var socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    // socket.on("cron", (item, callback) => {
    //   console.log(item);
    // });
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
  const profile = useSelector(state => state.profile);

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
          <View style={styles.iconDiv}>
            <Icon
              style={{paddingLeft: 10}}
              name="bell"
              size={30}
              color={'rgb(223,100,71)'}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Badge value="2" status="error" />
            </Icon>
            <Icon
              style={{paddingRight: 10}}
              name="cog"
              size={30}
              color={'rgb(223,100,71)'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </View>

        <View style={styles.imgDiv}>
          <Image style={styles.img} source={animal} />
        </View>
        <View style={styles.curDiv}>
          <Text style={styles.curMoney}>${money}</Text>
        </View>
        <View style={styles.rowDiv}>
          <Image style={styles.imgUnit} source={animal} />
          <Text style={styles.tokenCount}>{profile.profiledata.countHDT}</Text>
        </View>
        <View style={styles.rowDiv}>
          <Icon
            style={{paddingLeft: 10}}
            name="bars"
            size={20}
            color={'rgb(119,118,120)'}
          />
          <Text style={styles.curMoney}>{profile.profiledata.countETH}</Text>
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
        <ScrollView>
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
                }
              })
            )}
          </View>
        </ScrollView>
        <View style={styles.footTxt}>
          <Text
            style={styles.moreText}
            onPress={() => navigation.navigate('MoreHistory')}>{`more>>`}</Text>
        </View>
      </View>
    </>
  );
};

export default Home;
