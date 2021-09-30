import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import animal from '../../assets/img/animal.png';

import Header from '../../components/Header';
import {getUser} from '../../actions/profileAction';
const Profile = ({navigation, props}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const [isCopied, setIsCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const onCopyText = flag => {
    if (flag === 'address') {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } else {
      setCodeCopied(true);
      setTimeout(() => {
        setCodeCopied(false);
      }, 1000);
    }
  };
  useEffect(() => {
    dispatch(getUser(store.user.id));
  }, [isFocused, props]);

  const copyToClipboard = (value, flag) => {
    onCopyText(flag);
    Clipboard.setString(value);
  };

  const {color} = useTheme();
  return (
    <>
      <Header text="PROFILE" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>MY PROFILE</Text>
          </View>

          <View style={styles.imgDiv}>
            <Image style={styles.img} source={animal} />
          </View>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.txt}>Username</Text>
              <Input
                placeholder="Name"
                value={profile.profiledata.name}
                disabled
              />
              <Text style={styles.txt}>Eth Wallet Address</Text>
              <Input
                placeholder="Address"
                value={
                  profile.profiledata.address
                    ? profile.profiledata.address.substring(0, 6) +
                      '....' +
                      profile.profiledata.address.substring(
                        profile.profiledata.address.length - 6,
                        profile.profiledata.address.length,
                      )
                    : ''
                }
                disabled
                rightIcon={
                  <Icon
                    name={isCopied ? 'check' : 'copy'}
                    size={24}
                    color="gray"
                    onPress={() => {
                      copyToClipboard(profile.profiledata.address, 'address');
                    }}
                  />
                }
              />

              <Text style={styles.txt}>ETH Balance</Text>
              <Input
                placeholder="INPUT WITH ERROR MESSAGE"
                value={profile.profiledata.countETH + ' ' + 'ETH'}
                disabled
              />

              <Text style={styles.txt}>HDT Balance</Text>
              <Input
                placeholder="HDT"
                value={profile.profiledata.countHDT + ' ' + 'HDT'}
                disabled
              />
              <Text style={styles.txt}>USDT Balance</Text>
              <Input
                placeholder="USDT"
                value={profile.profiledata.countUSDT + ' ' + 'HDT'}
                disabled
              />
              <Text style={styles.txt}>My Referral Code</Text>

              <Input
                placeholder="Referral Code"
                value={store.user.owncode}
                disabled
                rightIcon={
                  <Icon
                    name={codeCopied ? 'check' : 'copy'}
                    onPress={() => {
                      copyToClipboard(store.user.owncode, 'referralcode');
                    }}
                    size={24}
                    color="gray"
                  />
                }
              />
              {store.user.referralcode ? (
                <>
                  <Text style={styles.txt}>Sponsor’s Referral Code</Text>

                  <Input
                    placeholder="Referral Code"
                    value={store.user.referralcode}
                    disabled
                    rightIcon={
                      <Icon
                        name={codeCopied ? 'check' : 'copy'}
                        onPress={() => {
                          copyToClipboard(
                            store.user.referralcode,
                            'referralcode',
                          );
                        }}
                        size={24}
                        color="gray"
                      />
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Text style={styles.TextStyle}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default Profile;
