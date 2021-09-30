import React, {useState} from 'react';
import {Text} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import Header from '../../components/Header';
import SetValue from './SetValue';
import UserList from './UserList';
import UserProfile from './UserProfile';
const index = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <Header text="USER SELECT" navigation={navigation} />

      <UserProfile />
    </>
  );
};
export default index;
