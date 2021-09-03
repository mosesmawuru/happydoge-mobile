import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
import Header from '../../components/Header';
import styles from './styles';
import {FlexLayout, CommonText} from '../../components/Common';
import {addStake} from '../../actions/stackAction';
import {getPrice} from '../../actions/exchangeAction';
const Stacking = ({navigation}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();
  const store = useSelector(state => state.auth);
  const price = useSelector(state => state.price);
  const onSubmit = () => {
    const data = {
      ID: store.user.id,
      amount,
      duration,
    };
    dispatch(addStake(data, navigation));
  };
  useEffect(() => {
    dispatch(getPrice());
  }, []);
  return (
    <>
      <Header text="Add Staking" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View>
              <View style={{paddingTop: 30, paddingHorizontal: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgb(223,100,71)',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingLeft: 20,
                    alignItems: 'center',
                  }}>
                  <CommonText>Add Staking</CommonText>
                </View>
                <View
                  style={{
                    backgroundColor: 'rgb(248,227,224)',
                    paddingTop: 15,
                    paddingBottom: 15,
                  }}>
                  <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
                    <FlexLayout width="50%" justify="center" direction="column">
                      <TextInput
                        value={amount}
                        placeholder="ENTER HDT AMOUNT"
                        style={{
                          borderColor: 'rgb(223,100,71)',
                          borderWidth: 2,
                          borderRadius: 20,
                          paddingHorizontal: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}
                        keyboardType="numeric"
                        onChangeText={msg => {
                          setAmount(msg);
                        }}
                      />
                      <FlexLayout direction="row">
                        <Text
                          style={{
                            marginLeft: 15,
                            marginTop: 5,
                            fontSize: 11,
                            backgroundColor: 'transparent',
                          }}>
                          MINIMUM
                        </Text>

                        <NumberFormat
                          value={price.pricedata.minium_amount}
                          displayType={'text'}
                          thousandSeparator={true}
                          suffix={'HDT'}
                          renderText={formattedValue => (
                            <Text
                              style={{
                                marginLeft: 5,
                                marginTop: 5,
                                fontSize: 11,
                                backgroundColor: 'transparent',
                              }}>
                              {formattedValue}
                            </Text>
                          )} // <--- Don't forget this!
                        />
                      </FlexLayout>
                    </FlexLayout>
                    <FlexLayout width="50%" justify="center">
                      <TextInput
                        value={duration}
                        placeholder="SELECT TRADE SESSION"
                        style={{
                          borderColor: 'rgb(223,100,71)',
                          borderWidth: 2,
                          borderRadius: 20,
                          paddingHorizontal: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}
                        keyboardType="numeric"
                        onChangeText={msg => {
                          setDuration(msg);
                        }}
                      />
                    </FlexLayout>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 15,
                        paddingRight: 15,
                        backgroundColor: 'rgb(223,100,71)',
                        borderRadius: 20,
                        borderWidth: 1,
                        width: 130,
                        borderColor: '#fff',
                        marginTop: 20,
                      }}
                      onPress={() => {
                        onSubmit();
                      }}>
                      <CommonText color="white" fontSize="18px">
                        SUBMIT
                      </CommonText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Stacking;
