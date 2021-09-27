import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Colors} from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import {getStake, getStakeByID, Clear} from '../../actions/stackAction';

import Carousel from 'react-native-snap-carousel';
import NumberFormat from 'react-number-format';
import Header from '../../components/Header';
import {SelectCircle} from './styles';
import io from 'socket.io-client';
import isEmpty from '../../utils/isEmpty';
import styles from './styles';
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const Stacking = ({navigation}) => {
  const isCarousel = React.useRef(null);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const store = useSelector(state => state.auth);
  const stake = useSelector(state => state.stake);

  const onSelect = id => {
    dispatch(getStakeByID(id));
    setSelected(id);
  };

  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.detailCircle} key={index + 1}>
        <SelectCircle
          onPress={() => {
            onSelect(item._id);
          }}
          click={selected === item._id ? true : false}>
          <View style={styles.rowLayout}>
            <NumberFormat
              value={item.stack_amount}
              displayType={'text'}
              thousandSeparator={true}
              renderText={formattedValue => (
                <Text style={styles.TextStyle}>{formattedValue}</Text>
              )}
            />

            <Text style={styles.tokenTxt}>HDT</Text>
          </View>
          <Text style={styles.SubTextStyle}>
            {Math.floor(
              (new Date(item.end_date).getTime() -
                new Date(item.date).getTime()) /
                (1000 * 60 * 60 * 24),
            )}
            days
          </Text>
        </SelectCircle>
        <Text style={styles.stackTitle}>Staking {index + 1}</Text>
      </View>
    );
  };
  useEffect(() => {
    let isMount = true;
    if (isMount) {
      dispatch(getStake(store.user.id));
      dispatch(Clear());
    }
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <>
      <Header text="STACKING" navigation={navigation} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.headText}>Stacking Details</Text>
          </View>
          {stake.stakedata.length > 0 ? (
            <>
              {stake.enloading ? (
                <View style={styles.earnTextView}>
                  <ProgressCircle
                    percent={0}
                    radius={80}
                    borderWidth={8}
                    size={300}
                    fill={100}
                    color="rgb(223,100,71)"
                    shadowColor="#999"
                    bgColor="#fff">
                    <ActivityIndicator
                      animating={true}
                      size="large"
                      color={Colors.red800}
                    />
                  </ProgressCircle>
                </View>
              ) : (
                <>
                  <View style={styles.earnTextView}>
                    <ProgressCircle
                      percent={
                        (Math.abs(
                          new Date(stake.earndata.currentDate) -
                            new Date(stake.earndata.date),
                        ) /
                          36e5 /
                          (Math.abs(
                            new Date(stake.earndata.end_date) -
                              new Date(stake.earndata.date),
                          ) /
                            36e5)) *
                        100
                      }
                      radius={80}
                      borderWidth={8}
                      size={300}
                      fill={100}
                      color="rgb(223,100,71)"
                      shadowColor="#999"
                      bgColor="#fff">
                      {isEmpty(stake.earndata) ? (
                        <>
                          <View style={styles.rowLayout}>
                            <Text style={styles.earnHdtText}>
                              Staking is not selected
                            </Text>
                          </View>
                          <Text style={styles.TextStyle}></Text>
                        </>
                      ) : (
                        <>
                          <View style={styles.rowLayout}>
                            <Text style={styles.earnHdtText}>
                              {stake.earndata.earned_amount}
                            </Text>
                          </View>
                          <Text style={styles.TextStyle}>earned</Text>
                        </>
                      )}
                    </ProgressCircle>
                  </View>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          <View style={styles.circleView}>
            {stake.loading ? (
              <ActivityIndicator
                animating={true}
                size="large"
                color={Colors.red800}
              />
            ) : stake.stakedata.length > 0 ? (
              <View>
                <Carousel
                  layout="default"
                  layoutCardOffset={9}
                  ref={isCarousel}
                  data={stake.stakedata}
                  renderItem={CarouselCardItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  inactiveSlideShift={0}
                  useScrollView={true}
                />
              </View>
            ) : (
              <></>
            )}
            {stake.loading === 'false' && !stake.stakedata.length > 0 ? (
              <View>
                <Text style={styles.description}>
                  You Have No Staking Contract. Click On Stake More To Add A New
                  Contract.
                </Text>
              </View>
            ) : (
              <></>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('AddStake');
              }}>
              <Text style={styles.btnText}>Stake More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Stacking;
