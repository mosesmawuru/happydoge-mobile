import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import NumberFormat from 'react-number-format';
import {FlexLayout, CommonText} from '../../components/Common';
import Header from '../../components/Header';
import {getPrice, setPrice} from '../../actions/exchangeAction';
const SetValue = ({navigation}) => {
  const dispatch = useDispatch();
  const [hdtprice, setHdtprice] = useState();
  const [stakeRate, setStakeRate] = useState();
  const [referRate, setReferRate] = useState();
  const [swapRate, setSwapRate] = useState();
  const [feeRate, setFeeRate] = useState();
  const [minimum, setMinimum] = useState();
  const state = useSelector(state => state.price);
  const onSetValue = msg => {
    let data = {};
    if (msg === 'price') {
      data.amount = hdtprice;
    }
    if (msg === 'stack_rate') {
      data.amount = stakeRate;
    }
    if (msg === 'referral_rate') {
      data.amount = referRate;
    }
    if (msg === 'swap_rate') {
      data.amount = swapRate;
    }
    if (msg === 'withdraw_rate') {
      data.amount = feeRate;
    }
    if (msg === 'minium_amount') {
      data.amount = minimum;
    }
    data.label = msg;
    dispatch(setPrice(data));
  };
  useEffect(() => {
    dispatch(getPrice());
  }, []);
  return (
    <>
      <Header text="SET VALUE" navigation={navigation} />
      <ScrollView>
        <View>
          <View style={{padding: 20}}>
            <View style={{paddingBottom: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(223,100,71)',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                }}>
                <CommonText maxWidth="50%">HDT PRICE</CommonText>
                <CommonText color="black">
                  {state.pricedata.price
                    ? `$${state.pricedata.price}`
                    : 'not setted'}
                </CommonText>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(248,227,224)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <FlexLayout width="50%" justify="center">
                  <TextInput
                    placeholder="ENTER NEW PRICE"
                    style={{
                      borderColor: 'rgb(223,100,71)',
                      borderWidth: 2,
                      borderRadius: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontWeight: 'bold',
                    }}
                    keyboardType="numeric"
                    onChangeText={msg => {
                      setHdtprice(msg);
                    }}
                  />
                </FlexLayout>
                <FlexLayout width="50%" justify="center">
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
                    }}
                    keyboardType="numeric"
                    onPress={() => {
                      onSetValue('price');
                    }}>
                    <CommonText color="white" fontSize="18px">
                      APPLY
                    </CommonText>
                  </TouchableOpacity>
                </FlexLayout>
              </View>
            </View>
            <View style={{paddingBottom: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(223,100,71)',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <CommonText maxWidth="50%">STAKING RATE</CommonText>
                <CommonText color="black">
                  {state.pricedata.stack_rate
                    ? `${state.pricedata.stack_rate}%`
                    : 'not setted'}
                </CommonText>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(248,227,224)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <FlexLayout width="50%" justify="center">
                  <TextInput
                    placeholder="ENTER NEW PRICE"
                    style={{
                      borderColor: 'rgb(223,100,71)',
                      borderWidth: 2,
                      borderRadius: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontWeight: 'bold',
                    }}
                    keyboardType="numeric"
                    onChangeText={msg => {
                      setStakeRate(msg);
                    }}
                  />
                </FlexLayout>
                <FlexLayout width="50%" justify="center">
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
                    }}
                    onPress={() => {
                      onSetValue('stack_rate');
                    }}>
                    <CommonText color="white" fontSize="18px">
                      APPLY
                    </CommonText>
                  </TouchableOpacity>
                </FlexLayout>
              </View>
            </View>
            <View style={{paddingBottom: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(223,100,71)',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <CommonText maxWidth="60%">REFERRAL COMMISION RATE</CommonText>
                <CommonText color="black">
                  {state.pricedata.referral_rate
                    ? `${state.pricedata.referral_rate}%`
                    : 'not setted'}
                </CommonText>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(248,227,224)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <FlexLayout width="50%" justify="center">
                  <TextInput
                    placeholder="ENTER NEW PRICE"
                    style={{
                      borderColor: 'rgb(223,100,71)',
                      borderWidth: 2,
                      borderRadius: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontWeight: 'bold',
                    }}
                    keyboardType="numeric"
                    onChangeText={msg => {
                      setReferRate(msg);
                    }}
                  />
                </FlexLayout>
                <FlexLayout width="50%" justify="center">
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
                    }}
                    onPress={() => {
                      onSetValue('referral_rate');
                    }}>
                    <CommonText color="white" fontSize="18px">
                      APPLY
                    </CommonText>
                  </TouchableOpacity>
                </FlexLayout>
              </View>
            </View>
            <View style={{paddingBottom: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(223,100,71)',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <CommonText maxWidth="40%">HDT TO ETH SWAP RATE</CommonText>
                <CommonText color="black">
                  {state.pricedata.swap_rate
                    ? `${state.pricedata.swap_rate}%`
                    : 'not setted'}
                </CommonText>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(248,227,224)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <FlexLayout width="50%" justify="center">
                  <TextInput
                    placeholder="ENTER NEW PRICE"
                    style={{
                      borderColor: 'rgb(223,100,71)',
                      borderWidth: 2,
                      borderRadius: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontWeight: 'bold',
                    }}
                    keyboardType="numeric"
                    onChangeText={msg => {
                      setSwapRate(msg);
                    }}
                  />
                </FlexLayout>
                <FlexLayout width="50%" justify="center">
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
                    }}
                    onPress={() => {
                      onSetValue('swap_rate');
                    }}>
                    <CommonText color="white" fontSize="18px">
                      APPLY
                    </CommonText>
                  </TouchableOpacity>
                </FlexLayout>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(223,100,71)',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <CommonText maxWidth="50%">ETH WITHDRAW FEE RATE</CommonText>
                <CommonText color="black">
                  {state.pricedata.withdraw_rate
                    ? `${state.pricedata.withdraw_rate}%`
                    : 'not setted'}
                </CommonText>
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(248,227,224)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <FlexLayout width="50%" justify="center">
                  <TextInput
                    placeholder="ENTER NEW PRICE"
                    style={{
                      borderColor: 'rgb(223,100,71)',
                      borderWidth: 2,
                      borderRadius: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontWeight: 'bold',
                    }}
                    keyboardType="numeric"
                    onChangeText={msg => {
                      setFeeRate(msg);
                    }}
                  />
                </FlexLayout>
                <FlexLayout width="50%" justify="center">
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
                    }}
                    onPress={() => {
                      onSetValue('withdraw_rate');
                    }}>
                    <CommonText color="white" fontSize="18px">
                      APPLY
                    </CommonText>
                  </TouchableOpacity>
                </FlexLayout>
              </View>
            </View>
            <View style={{paddingBottom: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(223,100,71)',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  paddingRight: 30,
                  paddingLeft: 30,
                  paddingBottom: 10,
                  alignItems: 'center',
                }}>
                <CommonText maxWidth="40%">MINIMUM AMOUNT</CommonText>
                {state.pricedata.minium_amount ? (
                  <NumberFormat
                    value={state.pricedata.minium_amount}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={formattedValue => (
                      <CommonText color="black">{formattedValue} </CommonText>
                    )} // <--- Don't forget this!
                  />
                ) : (
                  'not setted'
                )}
              </View>
              <View
                style={{
                  backgroundColor: 'rgb(248,227,224)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                <FlexLayout width="50%" justify="center">
                  <TextInput
                    placeholder="ENTER AMOUNT"
                    style={{
                      borderColor: 'rgb(223,100,71)',
                      borderWidth: 2,
                      borderRadius: 30,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 5,
                      paddingBottom: 5,
                      fontWeight: 'bold',
                    }}
                    keyboardType="numeric"
                    onChangeText={msg => {
                      setMinimum(msg);
                    }}
                  />
                </FlexLayout>
                <FlexLayout width="50%" justify="center">
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
                    }}
                    onPress={() => {
                      onSetValue('minium_amount');
                    }}>
                    <CommonText color="white" fontSize="18px">
                      APPLY
                    </CommonText>
                  </TouchableOpacity>
                </FlexLayout>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default SetValue;
