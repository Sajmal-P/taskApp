import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {t} from 'react-native-tailwindcss';
import {translate} from '../../utils/translations/index';
// import {authSlice} from '../../redux/slices/auth.slice';

interface Props {}

const InitialPage = (props: Props) => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View style={[t.selfCenter, t.justifyCenter, t.flex1]}>
      <Text
        style={[
          t.selfCenter,
          t.textBlack,
          t.fontMedium,
          t.text2xl,
          t.uppercase,
          {marginTop: -width / 4},
        ]}>
        {translate('Welcome to seed')}
      </Text>
      <LottieView
        source={require('../../assets/animations/boat.json')}
        style={[, {width: width / 1.6, height: width / 1.6, marginTop: 20}]}
        autoPlay
        loop
      />

      {/* <Logo/> */}
      <TouchableOpacity
        style={[
          t.h10,
          t.rounded,
          t.justifyCenter,
          {width: width / 2, backgroundColor: '#0096CE'},
          t.selfCenter,
          t.mT10,
        ]}
        onPress={() => {
          navigation.navigate('UserDetails');
        }}>
        <Text style={[t.selfCenter, t.textWhite, t.fontBold]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InitialPage;
