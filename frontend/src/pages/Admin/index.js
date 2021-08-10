import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {ListItem, Input} from 'react-native-elements';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import styles from './styles';
import {getWithdraw} from '../../actions/adminAction';
const Price = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const HeadTable = ['Address', 'Amount', 'ETH/HDT', 'Date', 'Status'];
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
  console.log(store);
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
        {/* <ScrollView>
          <View style={styles.content}> */}
        {store.transdata.map((item, key) => {
          <ListItem key={key + 1} bottomDivider style={styles.content}>
            <ListItem.Content>
              <ListItem.Title>adsfsadf</ListItem.Title>
              <ListItem.Subtitle>asdfasdf</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>;
        })}
        {/* </View>
        </ScrollView> */}
      </View>
    </>
  );
};
export default Price;
