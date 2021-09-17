import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBar, Badge} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {getWithdraw, rejectWithdraw} from '../../actions/adminAction';

const MyComponent = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Pending', icon: 'close'},
    {key: 'albums', title: 'Allowed', icon: 'check'},
  ]);

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const store = useSelector(state => state.transaction);
  const profile = useSelector(state => state.profile);
  const soclet = useSelector(state => state.socket);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getWithdraw());
    }
    return () => {
      isMount = false;
    };
  }, []);

  const MusicRoute = () => (
    <ScrollView>
      {store.transdata
        .filter(item => {
          return item.address.indexOf(search) > -1 && item.status === 3;
        })
        .map((item, key) => {
          return (
            <View key={key + 1}>
              <ListItem.Swipeable
                rightContent={
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}>
                    <Button
                      icon={{name: 'check', color: 'white'}}
                      buttonStyle={{backgroundColor: 'green'}}
                      onPress={() => {}}
                    />
                    <Button
                      icon={{name: 'close', color: 'white'}}
                      buttonStyle={{backgroundColor: 'red'}}
                      onPress={() => {
                        console.log(profile.profiledata._id);
                        // dispatch(rejectWithdraw(item));
                      }}
                    />
                  </View>
                }>
                <Icon
                  style={{paddingLeft: 10}}
                  name="user"
                  size={30}
                  color={'rgb(223,100,71)'}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
                <ListItem.Content bottomDivider>
                  <ListItem.Title>
                    {item.address
                      ? item.address.substring(0, 10) +
                        '....' +
                        item.address.substring(
                          item.address.length - 10,
                          item.address.length,
                        )
                      : ''}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Badge
                      value={
                        item.status === 1
                          ? 'Success'
                          : item.status === 2
                          ? 'Reject'
                          : 'Pending'
                      }
                      status={
                        item.status === 1
                          ? 'success'
                          : item.status === 2
                          ? 'error'
                          : 'primary'
                      }
                    />
                    <Text>
                      {item.amount} {item.method === 'eth' ? 'ETH' : 'HDT'}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            </View>
          );
        })}
    </ScrollView>
  );

  const AlbumsRoute = () => (
    <ScrollView>
      {store.transdata
        .filter(item => {
          return item.address.indexOf(search) > -1 && item.status === 1;
        })
        .map((item, key) => {
          return (
            <View key={key + 1}>
              <ListItem.Swipeable>
                <Icon
                  style={{paddingLeft: 10}}
                  name="user"
                  size={30}
                  color={'rgb(223,100,71)'}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
                <ListItem.Content bottomDivider>
                  <ListItem.Title>
                    {item.address
                      ? item.address.substring(0, 10) +
                        '....' +
                        item.address.substring(
                          item.address.length - 10,
                          item.address.length,
                        )
                      : ''}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Badge
                      value={
                        item.status === 1
                          ? 'Success'
                          : item.status === 2
                          ? 'Reject'
                          : 'Pending'
                      }
                      status={
                        item.status === 1
                          ? 'success'
                          : item.status === 2
                          ? 'error'
                          : 'primary'
                      }
                    />
                    <Text>
                      {item.amount} {item.method === 'eth' ? 'ETH' : 'HDT'}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Chevron />
              </ListItem.Swipeable>
            </View>
          );
        })}
    </ScrollView>
  );

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
  });
  return (
    <>
      <Header text="Transactions" navigation={navigation} />

      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
      />

      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

export default MyComponent;
