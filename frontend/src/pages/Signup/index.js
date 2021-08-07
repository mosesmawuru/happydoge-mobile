import React, {useState, useEffect} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {userRegister} from '../../actions/authAction';
import animal from '../../assets/img/animal.png';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [referralcode, setReferralcode] = useState('');
  // const [errors, setErrors] = useState({});

  const onSignup = async () => {
    dispatch(
      userRegister(username, password, address, referralcode, navigation),
    );
  };
  const errors = useSelector(state => state.errors);
  // useEffect(() => {
  //   let isMount = true;
  //   if (isMount) {
  //     setErrors(error);
  //   }
  //   return () => {
  //     isMount = false;
  //   };
  // }, [error]);

  return (
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
        />

        <Input
          value={address}
          placeholder="Address"
          onChangeText={message => {
            setAddress(message);
          }}
          errorStyle={{color: 'red'}}
          errorMessage={errors.address}
        />

        <Input
          value={referralcode}
          placeholder="referralcode Referral Code"
          onChangeText={message => {
            setReferralcode(message);
          }}
          errorStyle={{color: 'red'}}
          errorMessage={errors.referralcode}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButtonStyle}
        onPress={() => {
          onSignup();
        }}>
        <Text style={styles.TextStyle}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
