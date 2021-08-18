import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
import Header from '../../components/Header';
import {stack} from '../../actions/stackAction';
import styles from './styles';
const Stacking = ({navigation}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState({});
  const store = useSelector(state => state.auth);
  const profile = useSelector(state => state.profile);
  const errors = useSelector(state => state.errors);
  const onStack = () => {
    if (isNaN(amount)) {
      setError({stackamount: 'only input number'});
    } else {
      if (checked) {
        dispatch(
          stack(store.user.id, Number(store.user.countHDT), store.user.id),
        );
      } else {
        dispatch(stack(store.user.id, Number(amount), store.user.id));
      }
    }
  };
  useEffect(() => {
    setAmount(0);
  }, []);
  useEffect(() => {
    setError(errors);
  }, [errors]);
  return (
    <>
      <Header text="STACKING" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.headText}>Stacking Details</Text>
          </View>

          <View style={styles.userDiv}>
            <Text style={styles.labelText}>Current HDT Balance</Text>
            <Input value={profile.profiledata.countHDT.toString()} disabled />
            <Text style={styles.labelText}>Balance</Text>

            <Input
              value={
                checked
                  ? profile.profiledata.countHDT.toString()
                  : amount.toString()
              }
              placeholder="Please input balance"
              onChangeText={message => {
                setAmount(message);
              }}
              errorStyle={{color: 'red'}}
              keyboardType="numeric"
              disabled={checked ? true : false}
              errorMessage={error.stackamount}
            />
            <CheckBox
              center
              title="Max"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={checked}
              onPress={() => setChecked(!checked)}
            />
          </View>

          <View style={styles.circleView}>
            <TouchableOpacity
              style={styles.clickWeek}
              activeOpacity={0.5}
              onPress={() => {
                onStack();
              }}>
              <Text style={styles.TextStyle}>Stacking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clickWeek}
              activeOpacity={0.5}
              onPress={() => {
                onStack();
              }}>
              <Text style={styles.TextStyle}>Stacking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clickWeek}
              activeOpacity={0.5}
              onPress={() => {
                onStack();
              }}>
              <Text style={styles.TextStyle}>Stacking</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              onStack();
            }}>
            <Text style={styles.TextStyle}>Stacking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default Stacking;
