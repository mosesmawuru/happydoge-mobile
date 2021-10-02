import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {userRegister, clearErrors} from '../../actions/authAction';
import animal from '../../assets/img/animal.png';
import {useIsFocused} from '@react-navigation/native';
const Signup = ({navigation, props}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [address, setAddress] = useState('');
  const [referralcode, setReferralcode] = useState('');
  // const [errors, setErrors] = useState({});

  const onSignup = async () => {
    console.log(username, password, referralcode);
    dispatch(userRegister(username, password, referralcode, navigation));
  };
  const errors = useSelector(state => state.errors);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(clearErrors());
    }
    return () => {
      isMount = false;
    };
  }, [isFocused, props]);
  const selection = {
    start: 0,
    end: 0,
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgDiv}>
          <Image source={animal} />
        </View>
        <View>
          <Text style={styles.imgText}>HAPPY DOGE</Text>
        </View>
        <View style={styles.userDiv}>
          <Input
            value={username}
            placeholder="Username"
            onChangeText={message => {
              setUsername(message);
            }}
            errorStyle={{color: 'red'}}
            errorMessage={errors.name}
            textAlign={'center'}
            multiline={true}
          />

          <Input
            value={password}
            placeholder="Password"
            onChangeText={message => {
              setPassword(message);
            }}
            errorStyle={{color: 'red'}}
            errorMessage={errors.password}
            secureTextEntry={true}
            textAlign={'center'}
            multiline={true}
          />

          <Input
            value={referralcode}
            placeholder="Referral Code"
            onChangeText={message => {
              setReferralcode(message);
            }}
            errorStyle={{color: 'red'}}
            errorMessage={errors.referralcode}
            textAlign={'center'}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButtonStyle}
          onPress={() => {
            onSignup();
          }}>
          <Text style={styles.TextStyle}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.footertext}>
          <Text>Already Have an Account?</Text>
          <Text
            style={styles.signDiv}
            onPress={() => navigation.navigate('Login')}>
            Sign In
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
