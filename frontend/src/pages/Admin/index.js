import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Switch} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import moment from 'moment';
import {SearchBar, Badge} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import styles from './styles';
import {getWithdraw} from '../../actions/adminAction';
const Price = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const store = useSelector(state => state.transaction);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getWithdraw());
    }
    return () => {
      isMount = false;
    };
  }, []);
  const data = store.transdata
    .filter(item => {
      return item.address.indexOf(search) > -1;
    })
    .map((item, key) => {
      return (
        <View key={key + 1}>
          <ListItem bottomDivider>
            <Avatar
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              rounded
              title="LW"
            />
            <ListItem.Content>
              <ListItem.Title>
                <Text>
                  {item.address
                    ? item.address.substring(0, 10) +
                      '....' +
                      item.address.substring(
                        item.address.length - 10,
                        item.address.length,
                      )
                    : ''}
                </Text>
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

            <Switch value={false} />
          </ListItem>
        </View>
      );
    });
  return (
    <>
      <Header text="Transactions" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.content}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <ScrollView>
          <View style={styles.content}>{data}</View>
        </ScrollView>
      </View>
    </>
  );
};
export default Price;
