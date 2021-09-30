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
import animal from '../../assets/img/animal.png';
import ethImg from '../../assets/img/eth.png';
import usdtImg from '../../assets/img/usdt.png';
import {mainText, subText} from '../../constant/history';
import isEmpty from '../../utils/isEmpty';

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
                            {item.type === 6
                              ? subText[0].description
                              : item.type === 1
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
                            {item.type === 1
                              ? 'Deposit Money'
                              : item.type === 6
                              ? 'Referral Money'
                              : item.type === 3
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
                        {item.amount}{' '}
                        {item.method === 'eth'
                          ? 'ETH'
                          : item.method === 'hdt'
                          ? 'HDT'
                          : item.method === 'usdt'
                          ? 'USDT'
                          : ''}
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
