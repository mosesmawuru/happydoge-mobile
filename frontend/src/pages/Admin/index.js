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
      <Header text="Admin Panel" navigation={navigation} />
      <Tab
        value={selectedIndex}
        onChange={e => {
          setSelectedIndex(e);
        }}>
        <Tab.Item title="SET VALUE" />
        <Tab.Item title="USERS" />
        <Tab.Item title="WITHDRAW" />
      </Tab>

      <TabView
        value={selectedIndex}
        onChange={e => {
          setSelectedIndex(e);
        }}>
        <TabView.Item style={{width: '100%'}}>
          <SetValue />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <UserList />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <UserProfile />
        </TabView.Item>
      </TabView>
    </>
  );
};
export default index;
