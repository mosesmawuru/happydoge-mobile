import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
import Header from '../../components/Header';
import {stack} from '../../actions/stackAction';
import styles from './styles';
import {SelectCircle} from './styles';
const Stacking = ({navigation}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [checked, setChecked] = useState(true);
  const [error, setError] = useState({});
  const [duration, setDuration] = useState('');
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
  const selectDuration = duration => {
    setDuration(duration);
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
          <View style={styles.headerView}>
            <Text style={styles.headText}>Stacking Details</Text>
          </View>
          <View style={styles.earnTextView}>
            <TouchableOpacity style={styles.clickEarn} activeOpacity={0.5}>
              <View style={styles.rowLayout}>
                <Text style={styles.earnHdtText}>250</Text>
                {/* <Text style={styles.earnHdt}>HDT</Text> */}
              </View>
              <Text style={styles.TextStyle}>earned</Text>
            </TouchableOpacity>
            <View style={styles.progressLayer}></View>
          </View>
          <View style={styles.circleView}>
            <View style={styles.detailCircle}>
              <SelectCircle
                onPress={() => {
                  selectDuration('week');
                }}
                click={duration === 'week' ? true : false}>
                <View style={styles.rowLayout}>
                  <Text style={styles.TextStyle}>250</Text>
                  <Text style={styles.tokenTxt}>HDT</Text>
                </View>
                <Text style={styles.SubTextStyle}>weekly</Text>
              </SelectCircle>
              <Text style={styles.stackTitle}>Staking 1</Text>
            </View>
            <View style={styles.detailCircle}>
              <SelectCircle
                onPress={() => {
                  selectDuration('month');
                }}
                click={duration === 'month' ? true : false}>
                <View style={styles.rowLayout}>
                  <Text style={styles.TextStyle}>450</Text>
                  <Text style={styles.tokenTxt}>HDT</Text>
                </View>
                <Text style={styles.SubTextStyle}>monthly</Text>
              </SelectCircle>
              <Text style={styles.stackTitle}>Staking 2</Text>
            </View>
            <View style={styles.detailCircle}>
              <SelectCircle
                onPress={() => {
                  selectDuration('year');
                }}
                click={duration === 'year' ? true : false}>
                <View style={styles.rowLayout}>
                  <Text style={styles.TextStyle}>750</Text>
                  <Text style={styles.tokenTxt}>HDT</Text>
                </View>
                <Text style={styles.SubTextStyle}>yearly</Text>
              </SelectCircle>
              <Text style={styles.stackTitle}>Staking 3</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitButtonStyle}
            activeOpacity={0.5}
            onPress={() => {
              onStack();
            }}>
            <Text style={styles.btnText}>Stake More</Text>
          </TouchableOpacity>
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
      </ScrollView>
    </>
  );
};
export default Stacking;
