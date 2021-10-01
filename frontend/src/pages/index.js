// import Routes from "./src/pages";
import 'react-native-gesture-handler';

import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, TouchableOpacity, Image, Button} from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import SwapToEth from './SwapToETH';
import SwapToHDT from './SwapToHDT';
import Transfer from './Transfer';
import Price from './Price';
import Stacking from './Stacking';
import Profile from './Profile';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Admin from './Admin/user';
import SetValue from './SetValue';
import UserSelect from './UserSelect';
import SelectedUser from './SelectedUser';
import AddStake from './Stacking/Add';
// import Logout from './Logout';
import MoreHistory from './Home/MoreHistory';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MoreHistory"
        component={MoreHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SwapToEth"
        component={SwapToEth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SwapToHDT"
        component={SwapToHDT}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Stacking"
        component={Stacking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddStake"
        component={AddStake}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
function User({navigation}) {
  return (
    <Stack.Navigator initialRouteName="UserSelect">
      <Stack.Screen
        name="UserSelect"
        component={UserSelect}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={SelectedUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Main({}) {
  const store = useSelector(state => state.auth);
  return (
    <Drawer.Navigator
      drawerContent={props => <AppDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Home"
        options={{drawerLabel: 'Home'}}
        component={firstScreenStack}
      />
      <Drawer.Screen
        name="profile"
        options={{drawerLabel: 'Profile'}}
        component={Profile}
      />

      <Drawer.Screen
        name="Transfer"
        options={{drawerLabel: 'Transfer'}}
        component={Transfer}
      />
      <Drawer.Screen
        name="SwapToHDT"
        options={{drawerLabel: 'Swap To HDT'}}
        component={SwapToHDT}
      />
      <Drawer.Screen
        name="SwapToEth"
        options={{drawerLabel: 'Swap To ETH'}}
        component={SwapToEth}
      />

      <Drawer.Screen
        name="Deposit"
        options={{drawerLabel: 'Deposit'}}
        component={Deposit}
      />
      <Drawer.Screen
        name="Withdraw"
        options={{drawerLabel: 'Withdraw'}}
        component={Withdraw}
      />
      {store.user.role === 'admin' ? (
        <>
          <Drawer.Screen
            name="Admin"
            options={{drawerLabel: 'Withdrawals'}}
            component={Admin}
          />
          <Drawer.Screen
            name="Set Value"
            options={{drawerLabel: 'Set Value'}}
            component={SetValue}
          />
          <Drawer.Screen
            name="User Select"
            options={{drawerLabel: 'User Select'}}
            component={User}
          />
        </>
      ) : (
        <></>
      )}
    </Drawer.Navigator>
  );
}
function AppDrawerContent(props) {
  const socket = useSelector(state => state.socket);
  const store = useSelector(state => state.auth);
  return (
    <DrawerContentScrollView {...props}>
      {/*all of the drawer items*/}
      <DrawerItemList {...props} style={{borderWidth: 1}} />
      <View style={{flex: 1, color: 'red'}}>
        {/* here's where you put your logout drawer item*/}

        <DrawerItem
          label="Log out"
          onPress={() => {
            AsyncStorage.clear();
            props.navigation.navigate('Login');
            socket.socket.emit('user_logout', store.user.id);
          }}
          style={{flex: 1, justifyContent: 'flex-start'}}
        />
      </View>
    </DrawerContentScrollView>
  );
}
function Routes(navigation) {
  const schema = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={schema === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default Routes;
