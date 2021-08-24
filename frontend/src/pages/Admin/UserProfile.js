import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {CommonText} from '../../components/Common';

const UserProfile = () => {
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: 'STAKING DETAILS',
      content: <Text>'Lorem ipsum...'</Text>,
    },
    {
      title: 'REFERRAL DETAILS',
      content: 'Lorem ipsum...',
    },
    {
      title: 'WITHDRAWAL DETAILS',
      content: <Text>'Lorem ipsum...'</Text>,
    },
    {
      title: 'TRANSFER DETAILS',
      content: <Text>'Lorem ipsum...'</Text>,
    },
  ];

  const _renderHeader = section => {
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: 'rgb(223, 100, 71)',
              paddingVertical: 20,
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {section.title}
          </Text>
        </View>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  return (
    <ScrollView>
      <View style={{width: '100%', padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <CommonText color="rgb(223, 100, 71)" fontSize="15px">
              USER ETH ADDRESS
            </CommonText>
          </View>
          <View
            style={{
              width: '50%',
            }}>
            <CommonText color="rgb(223, 100, 71)" fontSize="14px">
              0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E
            </CommonText>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <CommonText color="rgb(223, 100, 71)" fontSize="15px">
              PASSWORD
            </CommonText>
          </View>
          <View
            style={{
              width: '50%',
            }}>
            <CommonText color="rgb(223, 100, 71)" fontSize="14px">
              asddaf
            </CommonText>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <CommonText color="rgb(223, 100, 71)" fontSize="15px">
              USER BALANCE
            </CommonText>
          </View>
          <View
            style={{
              width: '50%',
            }}>
            <CommonText color="rgb(223, 100, 71)" fontSize="14px">
              $5000
            </CommonText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 60,
          }}>
          <View>
            <View style={{backgroundColor: 'rgb(223, 100, 71)'}}>
              <CommonText>HDT BALANCE</CommonText>
            </View>
            <View style={{padding: 5}}>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: 'rgb(223, 100, 71)',
                }}>
                <Text style={{padding: 5}}>8423423.32</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 15,
                  backgroundColor: 'rgb(223,100,71)',
                  borderRadius: 20,
                  borderWidth: 1,
                  width: 80,
                  borderColor: '#fff',
                }}>
                <CommonText color="white" fontSize="13px">
                  EDIT
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 15,
                  backgroundColor: 'rgb(223,100,71)',
                  borderRadius: 20,
                  borderWidth: 1,
                  width: 80,
                  borderColor: '#fff',
                }}>
                <CommonText color="white" fontSize="13px">
                  APPLY
                </CommonText>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{backgroundColor: 'rgb(223, 100, 71)'}}>
              <CommonText>ETH BALANCE</CommonText>
            </View>
            <View style={{padding: 5}}>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: 'rgb(223, 100, 71)',
                }}>
                <Text style={{padding: 5}}>8423423.32</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 15,
                  backgroundColor: 'rgb(223,100,71)',
                  borderRadius: 20,
                  borderWidth: 1,
                  width: 80,
                  borderColor: '#fff',
                }}>
                <CommonText color="white" fontSize="13px">
                  EDIT
                </CommonText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 15,
                  backgroundColor: 'rgb(223,100,71)',
                  borderRadius: 20,
                  borderWidth: 1,
                  width: 80,
                  borderColor: '#fff',
                }}>
                <CommonText color="white" fontSize="13px">
                  APPLY
                </CommonText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 40,
          }}>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default UserProfile;
