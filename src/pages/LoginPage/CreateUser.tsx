import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {shallowEqual, useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import {postWebserviceSlice} from '../../redux/slices/postWebservice.slice';
import {singleUserDataSlice} from '../../redux/slices/getsingleData.slice';
import Spinner from '../../components/Loader/Loader.component';
import {useIsFocused} from '@react-navigation/native';

let array = [];
const CreteUser = ({navigation, route}) => {
  const dispatch = useDispatch();
  const Focus = useIsFocused();
  const states = useSelector((state: RootState) => state);
  const [modalVisible, setModalVisible] = useState(false);
  const [responseModal, setResponseModal] = useState(false);
  const [modalSubtitel, setmodalSubtitel] = useState('');
  const [modalTitle, setmodalTitle] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    console.log(route.params.page)
    if (route.params.id !== undefined) {
      let query = `/${route.params.id}`;
      dispatch(singleUserDataSlice.actions.getSingleUserData({query}));
      retrieveSingleDataService(query);
    }
  }, []);

  useEffect(() => {
    if (route.params.id !== undefined) {
      setData(states.singleData.singleUserDetails);
      if (data !== undefined && data !== [] && route.params.id !== undefined) {
        setName(data.name);
        setAge(String(data.age));
        setImage(data.avatarUrl);
        setEmail(data.email);
        setIsPublic(data.isPublic);
        setstatusMessage(data.statusMessage);
      }
    }
  }, [states.singleData.singleUserDetails]);

  const retrieveSingleDataService = (query) => {
    dispatch(singleUserDataSlice.actions.getSingleUserData({query}));
    setData(states.singleData.singleUserDetails);
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
    }).then(image => {
      setImage(image.path);
    });
  };

  const takePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
    }).then(image => {
      setImage(image.path);
    });
  };

  const InitialValidation = () => {
    const commonParams = [
      {
        data: {
          age: parseInt(age),
          name: name,
          email: email,
          statusMessage: statusMessage,
          createdAt: new Date(),
          isPublic: isPublic,
          avatarUrl: image,
        },
      },
      {page: route.params.page},
    ];
    dispatch(postWebserviceSlice.actions.createUserData({commonParams}));
    setResponseModal(true);
    setmodalTitle('Create User');
    setmodalSubtitel('Successfully Submitted');
    modalCloseFunction();
  };
  const deleteServiceCall = () => {
    const query = [`/${route.params.id}`, route.params.page];
    dispatch(postWebserviceSlice.actions.deleteUserData({query}));
    setResponseModal(true);
    setmodalTitle('Delete');
    setmodalSubtitel('Successfully Deleted');
    modalCloseFunction();
  };
  const updateServiceCall = () => {
    const commonParams = [
      {
        data: {
          age: age,
          name: name,
          email: email,
          statusMessage: statusMessage,
          createdAt: data.createdAt,
          isPublic: isPublic,
          avatarUrl: image,
        },
      },
      {id: route.params.id},
      {page: route.params.page},
    ];
    dispatch(postWebserviceSlice.actions.updateUserData({commonParams}));
    setResponseModal(true);
    setmodalTitle('Update');
    setmodalSubtitel('Successfully Updated');
    modalCloseFunction();
  };

  const modalCloseFunction = () => {
    setTimeout(() => {
      setResponseModal(false);
      navigation.navigate('UserDetails');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icons
          onPress={() => {
            navigation.navigate('UserDetails');
          }}
          name="md-arrow-undo-sharp"
          size={wp('6%')}
          color="#000"
        />
        <Text style={styles.headerText}>{route.params.header}</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#ededed',
          borderBottomWidth: 1,
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{margin: wp('1%')}}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
            console.log('clicked');
          }}
          style={styles.camera}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />

          <Icon
            name="plus-circle"
            size={wp('6%')}
            color="blue"
            style={styles.camIcon}
          />
        </Pressable>
        <TextInput
          style={styles.inp}
          placeholder="Enter Your Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.inp}
          placeholder="Enter Your Age"
          onChangeText={setAge}
          value={age}
        />
        <TextInput
          style={styles.inp}
          placeholder="Enter Your Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.inp}
          placeholder="Enter Your statusMessage"
          onChangeText={setstatusMessage}
          value={statusMessage}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: wp('3%'),
          }}>
          <View style={{flexDirection: 'row', marginVertical: wp('2%')}}>
            <CheckBox
              value={isPublic}
              onValueChange={setIsPublic}
              style={styles.checkbox}
            />
            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
              Public
            </Text>
          </View>
          {route.params.type === 'create' ? (
            <Pressable
              style={{
                backgroundColor: '#00cc99',
                alignSelf: 'center',
                padding: wp('2%'),
                borderRadius: 25,
                paddingHorizontal: wp('7%'),
                marginHorizontal: wp('3%'),
              }}
              onPress={() => {
                InitialValidation();
              }}>
              <Text>Create</Text>
            </Pressable>
          ) : null}
        </View>
        {route.params.type === 'update' ? (
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={{
                backgroundColor: '#00cc99',
                alignSelf: 'center',
                padding: wp('2%'),
                borderRadius: 25,
                paddingHorizontal: wp('7%'),
                marginLeft: wp('1%'),
              }}
              onPress={() => {
                updateServiceCall();
              }}>
              <Text style={{color: '#fff'}}>Save</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#cc0000',
                alignSelf: 'center',
                padding: wp('2%'),
                borderRadius: 25,
                paddingHorizontal: wp('7%'),
                marginHorizontal: wp('3%'),
              }}
              onPress={() => {
                deleteServiceCall();
              }}>
              <Text style={{color: '#fff'}}>Delete</Text>
            </Pressable>
          </View>
        ) : null}

        {modalVisible === true ? (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Icon
                    name="image"
                    style={styles.modalText}
                    color={'red'}
                    size={wp('13%')}
                  />
                  <Text style={[styles.modalText, {fontWeight: 'bold'}]}>
                    Warning
                  </Text>
                  <Text style={[styles.modalText, {paddingBottom: wp('2%')}]}>
                    Please select file type
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: wp('3%'),
                    }}>
                    <Pressable
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        console.log('clicked');
                        takePhotoFromGallery();
                      }}>
                      <Text style={styles.textStyle}>Gallery</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        takePhoto();
                      }}>
                      <Text style={styles.textStyle}>Camera</Text>
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        ) : null}
        {responseModal && (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={responseModal}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Icon
                    name="check-circle"
                    style={styles.modalText}
                    color={'red'}
                    size={wp('13%')}
                  />
                  <Text
                    style={[
                      styles.modalText,
                      {fontWeight: 'bold', fontSize: wp('5%')},
                    ]}>
                    {modalTitle}
                  </Text>
                  <Text
                    style={[
                      styles.modalText,
                      {paddingBottom: wp('2%'), fontSize: wp('4%')},
                    ]}>
                    {modalSubtitel}
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <Spinner enable={states.postWebservice.loader} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreteUser;

const styles = StyleSheet.create({
  container: {flex: 1},
  checkbox: {
    alignSelf: 'flex-start',
  },

  image: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('100%'),
    //   backgroundColor: 'gray',
  },
  camera: {
    borderRadius: wp('16%'),
    padding: wp('2%'),
    backgroundColor: 'white',
    marginLeft: wp('-10%'),
    alignSelf: 'center',
    marginBottom: wp('4%'),
  },
  camIcon: {
    alignSelf: 'flex-end',
    marginTop: wp('-7%'),
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: wp('1%'),
    margin: wp('1%'),
  },
  headerText: {
    alignSelf: 'center',
    fontSize: wp('5%'),
    color: '#002966',
    marginLeft: wp('2%'),
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: hp('1%'),
    marginTop: wp('10%'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: wp('5%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: wp('67%'),
  },
  textStyle: {
    color: '#000',
    fontWeight: 'normal',
    alignSelf: 'flex-end',
  },
  modalText: {
    textAlign: 'center',
  },
  inp: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
  },
});
