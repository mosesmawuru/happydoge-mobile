import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {DataTable, TextInput} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {CommonText} from '../../components/Common';
const UserList = ({navigation}) => {
  return (
    <View>
      <View>
        <TextInput placeholder="SEARCH USER" />
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
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}>
              <Col size={2.4}>
                <Text>0x17b546D3179ca33b542eD6BD9fE6656fb5D5b70E</Text>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
                  22196433
                </CommonText>
              </Col>
              <Col size={1.2}>
                <CommonText
                  color="rgb(223,100,71)"
                  fontSize="12px"
                  fontWeight={100}>
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
