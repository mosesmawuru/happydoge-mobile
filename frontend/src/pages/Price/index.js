import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getPrice, addPrice} from '../../actions/exchangeAction';
import Header from '../../components/Header';
import styles from './styles';
const Price = ({navigation}) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [error, setError] = useState({});
  const store = useSelector(state => state.price);
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getPrice());
    }
    return () => {
      isMount = false;
    };
  }, []);
  const onSave = () => {
    if (isNaN(price)) {
      setError({price: 'Only input number'});
    } else {
      dispatch(addPrice(price));
    }
  };
  return (
    <>
      <Header text="SET HDT PRICE" navigation={navigation} />
      <View style={styles.container}>
        <View>
          <Text style={styles.headText}>Price</Text>
        </View>
        <View>
          <Text>
            {store.pricedata
              ? `Current Price is $${store.pricedata.price}`
              : 'HDT Price is not setted yet'}
          </Text>
        </View>
        <View style={styles.userDiv}>
          <Input
            value={price.toString()}
            placeholder="Please input HDT Price"
            onChangeText={message => {
              setPrice(message);
            }}
            errorStyle={{color: 'red'}}
            keyboardType="numeric"
            errorMessage={error.price}
            rightIcon={<Icon name={'dollar'} size={24} color="gray" />}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButtonStyle}
          activeOpacity={0.5}
          onPress={() => {
            onSave();
          }}>
          <Text style={styles.TextStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Price;
