/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {authSlice} from '../../redux/slices/auth.slice';
import {postWebserviceSlice} from '../../redux/slices/postWebservice.slice';
import {nameSlice} from '../../redux/slices/name.slice';
import {retrieveUserData} from '../../services/api/example.api';
import {filterDataSlice} from '../../redux/slices/fiterData.slice';
import {sortDataSlice} from '../../redux/slices/sortData.slice';
import {useIsFocused} from '@react-navigation/native';
import Spinner from '../../components/Loader/Loader.component';

const UserDetails = ({navigation}) => {
  const {width} = useWindowDimensions('width');
  const dispatch = useDispatch();
  const flatlistRef = useRef(null);
  const Focused = useIsFocused();
  const states = useSelector((state: RootState) => state, shallowEqual);
  const [data, setData] = useState([]);
  const [searchItem, setsearchItem] = useState('');
  const [dropValue, setdropValue] = useState('select');
  const [selectedId, setSelectedId] = useState(0);
  const [pageCount, setPageCount] = useState([]);
  const [age, setAge] = useState(false);
  const [dropdata, setdropdata] = useState([
    {value: 1, label: 'Desc'},
    {value: 2, label: 'Asc'},
  ]);

  useEffect(() => {
    retrieveUserData();
    pageCountService();
  }, [states.postWebservice.UserDetails]);

  useEffect(() => {
    setData(states.sortedData.sortData);
  }, [states.sortedData.sortData]);

  useEffect(() => {
    if (searchItem.trim().length > 0) {
      const text = `?${'q'}=${searchItem}&&_page=${selectedId}`;
      dispatch(filterDataSlice.actions.getFilterData(text));
      if (states.filterData.filterData !== undefined) {
        setData(states.filterData.filterData);
      }
    } else {
      retrieveLimitedData();
    }
  }, [searchItem, Focused]);

  const pageCountService = () => {
    const page = Math.ceil(parseInt(states.postWebservice.count) / 10);
    let counts: any = [];
    for (let i: number = 1; i <= page; i++) {
      counts.push({val: i});
      setPageCount(counts);
    }
  };

  const retrieveLimitedData = (type: string, num: number) => {
    let query: string;
    if (type === undefined) {
      query = `?_page=${selectedId + 1}`;
      dispatch(
        postWebserviceSlice.actions.GetUserData({
          query,
        }),
      );
      retrieveUserData();
    } else if (type === 'back') {
      query = `?_page=${num - 1}`;
      dispatch(
        postWebserviceSlice.actions.GetUserData({
          query,
        }),
      );
      retrieveUserData();
    } else if (type === 'forward') {
      query = `?_page=${num + 1}`;
      dispatch(
        postWebserviceSlice.actions.GetUserData({
          query,
        }),
      );
      retrieveUserData();
    } else {
      query = `?_page=${num}`;
      dispatch(
        postWebserviceSlice.actions.GetUserData({
          query,
        }),
      );
      retrieveUserData();
    }
  };

  const onChangeText = text => {
    setsearchItem(text);
    retrieveUserData();
  };

  const retrieveUserData = () => {
    if (states.postWebservice.UserDetails !== undefined) {
      setData(states.postWebservice.UserDetails);
    } else {
      setData([]);
    }
  };

  const renderUserData = ({item, index}) => {
    return (
      <View style={styles.flatlistMainView}>
        <View style={styles.imageView}>
          <Image
            source={{uri: item.avatarUrl}}
            style={{width: 60, height: 60, borderRadius: 100}}
          />
          <Text style={[styles.textStyle, {alignSelf: 'center'}]}>
            {item.age} Years
          </Text>
        </View>
        <View style={styles.innerView}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.textStyle}>{item.statusMessage}</Text>
          <Text style={styles.textStyle}>{item.createdAt}</Text>
        </View>
        {item.isPublic ? (
          <Icons
            style={styles.icon}
            size={wp('6%')}
            name="account-group"
            onPress={() => {
              navigation.navigate('CreateUser', {
                header: 'User Details',
                type: 'update',
                id: item.id,
                page: selectedId + 1,
              });
            }}
          />
        ) : (
          <AntDesign
            style={styles.icon}
            size={wp('6%')}
            name="deleteusergroup"
          />
        )}
      </View>
    );
  };
  const renderCount = ({item, index}) => {
    return (
      <View style={{alignSelf: 'center'}}>
        <Pressable
          onPress={() => {
            retrieveLimitedData('onPress', index + 1);
            setSelectedId(index);
            flatlistRef.current.scrollToIndex({animated: true, index: index});
          }}>
          <Text style={{color: selectedId === index ? 'blue' : '#000'}}>
            {' '}
            {item.val}{' '}
          </Text>
        </Pressable>
      </View>
    );
  };
  const count = pageCount.length;
  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={() => {
          navigation.navigate('InitialPage');
        }}>
        <Text style={styles.header}>Users</Text>
      </Pressable>
      <TextInput
        value={searchItem}
        placeholder="Search here..."
        onChangeText={text => {
          onChangeText(text);
        }}
        style={styles.searchfilter}
      />
      <View style={styles.dropDownView}>
        <Pressable
          onPress={() => {
            setAge(!age);
            const query = `?_sort=${'age'}&&_order=${
              age === false ? 'asc' : 'desc'
            }&&_page=${selectedId + 1}`;
            dispatch(
              sortDataSlice.actions.getSortedData({
                order: query,
              }),
            );
          }}
          style={[styles.sortBtn, {backgroundColor: age ? 'grey' : '#b3e0ff'}]}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Sort by age</Text>
        </Pressable>
        <Dropdown
          containerStyle={styles.dropDownStyle}
          inputContainerStyle={styles.inputConStyle}
          data={dropdata}
          baseColor={'transparent'}
          fontSize={wp('3.5%')}
          fontWeight="bold"
          underlineColor="transparent"
          textColor={'#000'}
          selectedItemColor="#7A7A7A"
          value={dropValue}
          onChangeText={value => {
            setAge(!age);
            setdropValue(value);
            const query = `?_sort=${'name'}&&_order=${
              value === 2 ? 'asc' : 'desc'
            }&&_page=${selectedId + 1}`;
            dispatch(
              sortDataSlice.actions.getSortedData({
                order: query,
              }),
            );
            setData(states.sortedData.sortData);
          }}
          rippleDuration={350}
          animationDuration={200}
        />
      </View>
      <FlatList data={data} renderItem={renderUserData} />
      {searchItem.trim().length <= 0 ? (
        <View style={styles.pagination}>
          {selectedId > 0 ? (
            <Arrow
              name="chevrons-left"
              size={wp('6%')}
              color={selectedId > 0 ? '#99c2ff' : 'grey'}
              style={{alignSelf: 'center'}}
              onPress={() => {
                if (selectedId > 0) {
                  const id = selectedId - 1;
                  setSelectedId(id);
                  flatlistRef.current.scrollToIndex({
                    animated: true,
                    index: id,
                  });
                  retrieveLimitedData('back', id);
                }
              }}
            />
          ) : null}
          <View>
            <FlatList
              ref={flatlistRef}
              scrollEnabled={false}
              data={pageCount}
              pagingEnabled
              renderItem={renderCount}
              horizontal
              style={{
                width: wp('24%'),
                marginLeft: selectedId > count - 10 ? wp('1%') : wp('0.1%'),
                marginRight: selectedId > count - 6 ? wp('1%') : wp('0.1%'),
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {selectedId < count - 6 ? (
            <Pressable
              style={[styles.pageCount, {marginRight: wp('2%')}]}
              onPress={() => {
                setSelectedId(9);
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: 9,
                });
                retrieveLimitedData('last', 9);
              }}>
              <Text>...{count}</Text>
            </Pressable>
          ) : null}
          {selectedId < count - 1 && (
            <Arrow
              name="chevrons-right"
              size={wp('6%')}
              color={selectedId < count ? '#99c2ff' : 'grey'}
              style={{alignSelf: 'center'}}
              onPress={() => {
                if (selectedId < count) {
                  const id = selectedId + 1;
                  setSelectedId(id);
                  flatlistRef.current.scrollToIndex({
                    animated: true,
                    index: id,
                  });
                  retrieveLimitedData('forward', id);
                }
              }}
            />
          )}
        </View>
      ) : null}
      <Pressable
        style={styles.createBtn}
        onPress={() => {
          navigation.navigate('CreateUser', {
            header: 'Create User',
            type: 'create',
          });
        }}>
        <Text style={{color: '#fff', fontSize: wp('4%'), fontWeight: 'bold'}}>
          Create New User
        </Text>
      </Pressable>
      <Spinner enable={states.postWebservice.loader} />
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  containerStyle: {
    height: hp('8%'),
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
    marginBottom: hp('2%'),
  },
  createBtn: {
    backgroundColor: '#00e6e6',
    padding: wp('2%'),
    margin: wp('2%'),
    borderRadius: 10,
    alignItems: 'center',
  },
  dropDownView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('1%'),
  },
  dropDownStyle: {
    justifyContent: 'center',
    height: hp('8%'),
    paddingTop: hp('2%'),
  },
  inputConStyle: {
    borderBottomColor: 'transparent',
  },
  flatlistMainView: {
    flexDirection: 'row',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  searchfilter: {
    borderColor: '#ededed',
    borderWidth: 1,
    marginHorizontal: wp('1%'),
    borderRadius: 25,
    padding: wp('2%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#fff',
  },
  header: {
    color: '#d1d1e0',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: wp('1.5%'),
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 2,
  },
  imageView: {
    flexDirection: 'column',
  },
  innerView: {
    marginHorizontal: 5,
  },
  inputContainerStyle: {
    backgroundColor: '#D7E2E9',
    borderRadius: wp('10%'),
  },
  nameText: {
    color: '#000',
    fontWeight: 'bold',
  },
  pageCount: {alignSelf: 'center'},
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: wp('2%'),
  },
  searchInputStyle: {fontSize: wp('4%'), color: 'black'},
  sortBtn: {
    // backgroundColor: '#b3e0ff',
    justifyContent: 'center',
    borderRadius: 10,
    padding: wp('2%'),
  },
  textStyle: {
    color: 'grey',
    // alignSelf: 'center',
    fontWeight: 'bold',
  },
});
