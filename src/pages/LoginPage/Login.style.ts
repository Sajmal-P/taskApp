import {StyleSheet} from 'react-native';
import { t } from 'react-native-tailwindcss'
export const loginStyles = StyleSheet.create({
  loginScreenContainer:{
    flex: 1,
   ... t.justifyBetween,
  },
  box: {
   height:50,
   width:50,
   borderRadius:25,
   ... t.bgBlue500,
   ...t.selfStart
  },
  preference:{
    flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
  },
  modalText:{
    margin:5,
    fontFamily:'libreBaskerville-Italic',

  },
  button:{
    borderRadius:100,
    height:45,
    width:280,
   ... t.bgBlue500,
   ... t.justifyCenter,
   ...t.m1,
   
  },
  nativeText:{
    fontFamily:'LibreBaskerville-Bold',
    ...t.selfCenter,
    ...t.textBlue400,
    ...t.textXl,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
    alignItems: 'center',
   ... t.justifyBetween,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
justifyContent:"space-evenly"
  },
  
});
