import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../actions/profileAction';
import animal from '../../assets/img/animal.png';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(getUser(store.user.id));
  }, []);
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
        <View style={styles.imgDiv}>
          <Image style={styles.img} source={animal} />
        </View>
        <View style={styles.curDiv}>
          <Text style={styles.curMoney}>$4820.86</Text>
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
