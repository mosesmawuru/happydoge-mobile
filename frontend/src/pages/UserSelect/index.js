import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {useIsFocused} from '@react-navigation/native';
import {Searchbar, ActivityIndicator, Colors} from 'react-native-paper';
import {CommonText} from '../../components/Common';
import Header from '../../components/Header';
import {getAllUser} from '../../actions/userAction';
const UserSelect = ({navigation, props}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const store = useSelector(state => state.user);
  const onChangeSearch = query => setSearchQuery(query);

  useEffect(() => {
    dispatch(getAllUser());
  }, [isFocused, props]);

  return (
    <>
      <Header text="User Detail" navigation={navigation} />
      <View>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <ScrollView>
          <Grid>
            <Row
              style={{
                backgroundColor: 'rgb(223,100,71)',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Col size={2.4}>
                <CommonText fontSize="15px">USER ETH ADDRESS</CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText fontSize="15px">HDT</CommonText>
              </Col>
              <Col size={1}>
                <CommonText fontSize="15px">ETH</CommonText>
              </Col>
              <Col size={1}>
                <CommonText fontSize="15px">USDT</CommonText>
              </Col>
            </Row>
            {store.loading ? (
              <ActivityIndicator
                animating={true}
                size="large"
                color={Colors.red800}
                style={{marginTop: 20}}
              />
            ) : (
              store.userdata.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key + 1}
                    onPress={() =>
                      navigation.navigate('UserDetail', {item: item})
                    }>
                    <Row
                      style={{
                        borderBottomColor: 'rgb(120,121,133)',
                        borderBottomWidth: 1,
                        backgroundColor: 'white',
                        paddingHorizontal: 5,
                      }}>
                      <Col size={2.4}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '100',
                            textAlign: 'center',
                            paddingVertical: 5,
                            color: 'rgb(120,121,133)',
                            fontWeight: '800',
                          }}>
                          {item.address}
                        </Text>
                      </Col>
                      <Col
                        size={1.2}
                        style={{
                          paddingVertical: 5,
                        }}>
                        <CommonText
                          color="rgb(223,100,71)"
                          fontSize="12px"
                          fontWeight="bold"
                          textAlign="center">
                          {item.countHDT}
                        </CommonText>
                      </Col>
                      <Col
                        size={1.2}
                        style={{
                          paddingVertical: 5,
                        }}>
                        <CommonText
                          color="rgb(223,100,71)"
                          fontSize="12px"
                          fontWeight="bold">
                          {item.countETH}
                        </CommonText>
                      </Col>
                      <Col
                        size={1.2}
                        style={{
                          paddingVertical: 5,
                        }}>
                        <CommonText
                          color="rgb(223,100,71)"
                          fontSize="12px"
                          fontWeight="bold">
                          {item.countUSDT}
                        </CommonText>
                      </Col>
                    </Row>
                  </TouchableOpacity>
                );
              })
            )}
          </Grid>
        </ScrollView>
      </View>
    </>
  );
};

export default UserSelect;
