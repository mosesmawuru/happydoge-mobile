import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Searchbar} from 'react-native-paper';
import {CommonText} from '../../components/Common';
const UserList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
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

          <TouchableOpacity>
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
                  0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E
                </Text>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
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
                  0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E
                </Text>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
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
                  0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E
                </Text>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
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
                  0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E
                </Text>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
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
                  0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E
                </Text>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
              <Col
                size={1.2}
                style={{
                  justifyContent: 'flex-end',
                  marginBottom: 5,
                  alignItems: 'flex-end',
                }}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight="bold">
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
        </Grid>
      </ScrollView>
    </View>
  );
};

export default UserList;
