import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {getStake} from '../../actions/stackAction';
import styles from './styles';
import {SelectCircle} from './styles';
import Carousel from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.3);
const Stacking = ({navigation}) => {
  const isCarousel = React.useRef(null);
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  const stake = useSelector(state => state.stake);
  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.detailCircle} key={index + 1}>
        <SelectCircle>
          <View style={styles.rowLayout}>
            <Text style={styles.TextStyle}>{item.stack_amount}</Text>
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
          <View style={styles.circleView}>
            {stake.stakedata.length > 0 ? (
              // stake.stakedata.map((item, key) => {
              // if (key < 3) {
              // return (
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
              // );
              // }
              // })
              <View>
                <Text style={styles.description}>
                  You Have No Staking Contract. Click On Stake More To Add A New
                  Contract.
                </Text>
              </View>
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
