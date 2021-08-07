import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import Header from '../../components/Header';
import styles from './styles';
const Withdraw = ({navigation}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState('eth');
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.errors);
  return (
    <>
      <Header text="Withdraw" navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.headText}>Withdraw</Text>
        </View>

        <View style={styles.userDiv}>
          <Text style={styles.txt}>Address</Text>
          <Input
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
            onChangeText={message => {
              setAddress(message);
            }}
          />

          <Input
            value={amount.toString()}
            placeholder="Please input ETH Amount"
            onChangeText={message => {
              setAmount(message);
            }}
            errorStyle={{color: 'red'}}
            keyboardType="numeric"
            rightIcon={
              <Picker
                style={{width: 100}}
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) => {
                  setSelected(itemValue);
                }}>
                <Picker.Item label="ETH" value="eth" />
                <Picker.Item label="HDT" value="hdt" />
              </Picker>
            }
          />
        </View>
        <TouchableOpacity style={styles.submitButtonStyle} activeOpacity={0.5}>
          <Text style={styles.TextStyle}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Withdraw;
