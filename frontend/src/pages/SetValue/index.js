import React, {useState} from 'react';
import {View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import NumberFormat from 'react-number-format';
import {FlexLayout, CommonText} from '../../components/Common';
import Header from '../../components/Header';
const SetValue = ({navigation}) => {
  const [data, setData] = useState({
    hdtprice: 1,
    stakeRate: 0.125,
    referRate: 30,
    swapRate: 50,
    feeRate: 50,
  });
  const [hdtprice, setHdtprice] = useState(1);
  const [stakeRate, setStakeRate] = useState(0.125);
  const [referRate, setReferRate] = useState(30);
  const [swapRate, setSwapRate] = useState(50);
  const [feeRate, setFeeRate] = useState(50);
  const [minimum, setMinimum] = useState(100000);
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
                <CommonText color="black">${data.hdtprice}</CommonText>
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
                    onChangeText={msg => {
                      +setHdtprice(msg);
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
                      setData({
                        hdtprice,
                        stakeRate: 0.125,
                        referRate: 30,
                        swapRate: 50,
                        feeRate: 50,
                      });
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
                <CommonText color="black">{data.stakeRate}%</CommonText>
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
                      setData({
                        hdtprice: 30,
                        stakeRate,
                        referRate: 30,
                        swapRate: 50,
                        feeRate: 50,
                      });
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
                <CommonText color="black">{data.referRate}%</CommonText>
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
                      setData({
                        hdtprice: 30,
                        stakeRate: 20,
                        referRate,
                        swapRate: 50,
                        feeRate: 50,
                      });
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
                <CommonText color="black">{data.swapRate}%</CommonText>
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
                      setData({
                        hdtprice: 30,
                        stakeRate: 20,
                        referRate: 20,
                        swapRate,
                        feeRate: 50,
                      });
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
                <CommonText color="black">{data.feeRate}%</CommonText>
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
                      setData({
                        hdtprice: 30,
                        stakeRate: 20,
                        referRate: 20,
                        swapRate: 40,
                        feeRate: 60,
                      });
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

                <NumberFormat
                  value={10000000}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={formattedValue => (
                    <CommonText color="black">{formattedValue} </CommonText>
                  )} // <--- Don't forget this!
                />
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
