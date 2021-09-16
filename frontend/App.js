import React, {Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, Text, View, TouchableOpacity, Alert} from 'react-native';
import NotifService from './src/notification/NotifService';
import Routes from './src/pages';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  render() {
    // const socket = useSelector(state => state.socket);
    return (
      <Routes />
      // <View>
      //   <View />
      //   <TextInput
      //     value={this.state.registerToken}
      //     placeholder="Register token"
      //   />
      //   <View />

      //   <TouchableOpacity
      //     onPress={() => {
      //       this.notif.localNotif();
      //     }}>
      //     <Text>Local Notification (now)</Text>
      //   </TouchableOpacity>
      // </View>
    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }
}
