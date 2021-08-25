// import Routes from "./src/pages";
import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import Admin from './Admin';
import SetValue from './SetValue';
import UserSelect from './UserSelect';
import SelectedUser from './SelectedUser';
import {store} from '../store';

import setAuthToken from '../utils/setAuthToken';
import {setCurrentUser, logoutUser} from '../actions/authAction';
// if (AsyncStorage.getItem('jwtToken')) {
//   setAuthToken(AsyncStorage.getItem('jwtToken'));

// AsyncStorage.getItem('jwtToken', (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     return jwt_decode(result);
//   }
// });
// const data = new Promise((resolve, reject))
// store.dispatch(setCurrentUser(decoded));
// console.log(decoded);
// const currentTime = Date.now() / 1000;
// if (decoded.exp < currentTime) {
//   store.dispatch(logoutUser());

//   navigation.navigate('Login');
// }
// }
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
        name="UserDetail"
        component={SelectedUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Main({}) {
  return (
    <Drawer.Navigator
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
        options={{drawerLabel: 'My Profile'}}
        component={Profile}
      />

      <Drawer.Screen
        name="Transfer"
        options={{drawerLabel: 'Transfer'}}
        component={Transfer}
      />

      <Drawer.Screen
        name="SwapToEth"
        options={{drawerLabel: 'Swap To ETH'}}
        component={SwapToEth}
      />
      <Drawer.Screen
        name="SwapToHDT"
        options={{drawerLabel: 'Swap To HDT'}}
        component={SwapToHDT}
      />
      <Drawer.Screen
        name="Price"
        options={{drawerLabel: 'Set HDT Price'}}
        component={Price}
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
      <Drawer.Screen
        name="Admin Panel"
        options={{drawerLabel: 'Admin Panel'}}
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
        component={UserSelect}
      />
      <Drawer.Screen
        name="Log Out"
        options={{drawerLabel: 'Log Out'}}
        component={Login}
      />
    </Drawer.Navigator>
  );
}

function Routes({}) {
  const schema = useColorScheme();
  return (
    <AppearanceProvider>
      <NavigationContainer theme={schema === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
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
