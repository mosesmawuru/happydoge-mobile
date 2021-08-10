import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Badge} from 'react-native-elements';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../actions/profileAction';
import {getPrice} from '../../actions/exchangeAction';
import {getHistoryById} from '../../actions/historyAction';
import animal from '../../assets/img/animal.png';
import axios from 'axios';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [hdtprice, setHdtprice] = useState(0);
  const [money, setMoney] = useState(0);
  const price = useSelector(state => state.price);
  const store = useSelector(state => state.auth);
  const history = useSelector(state => state.history);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getPrice());
      dispatch(getUser(store.user.id));
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
    <ScrollView>
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
        <View>
          <View style={styles.historyDiv}>
            <View style={styles.rowDiv}>
              <View style={styles.circle} />
              <View>
                <Text>Eth Deposit</Text>
                <Text>Received payment</Text>
              </View>
            </View>
            <Text>2.14 ETH</Text>
          </View>
          <View style={styles.historyDiv}>
            <View style={styles.rowDiv}>
              <View style={styles.circle} />
              <View>
                <Text>Your refferal</Text>
                <Text>Transfer money</Text>
              </View>
            </View>
            <Text>-450.00 HDT</Text>
          </View>
          <View style={styles.historyDiv}>
            <View style={styles.rowDiv}>
              <View style={styles.circle} />
              <View>
                <Text>Your refferal</Text>
                <Text>Transfer money</Text>
              </View>
            </View>
            <Text>-20050.00 HDT</Text>
          </View>
          <View style={styles.historyDiv}>
            <View style={styles.rowDiv}>
              <View style={styles.circle} />
              <View>
                <Text>Your refferal</Text>
                <Text>Transfer money</Text>
              </View>
            </View>
            <Text>-4110.00 HDT</Text>
          </View>
        </View>
        <View style={styles.footTxt}>
          <Text
            style={styles.moreText}
            onPress={() => navigation.navigate('Pages')}>{`more>>`}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
