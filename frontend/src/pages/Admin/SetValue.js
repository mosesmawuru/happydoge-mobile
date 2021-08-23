import React from 'react';
import {View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {FlexLayout, CommonText} from '../../components/Common';
const SetValue = () => {
  return (
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
              <CommonText color="black">$1</CommonText>
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
              <CommonText color="black">0.125%</CommonText>
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
              <CommonText color="black">30%</CommonText>
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
              <CommonText color="black">50%</CommonText>
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
              <CommonText color="black">50%</CommonText>
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
  );
};
export default SetValue;
