import {NativeModules} from 'react-native';
import  { useSharedValue, useAnimatedStyle ,withSpring} from 'react-native-reanimated'
import MMKVStorage from "react-native-mmkv-storage";
import { themeSlice } from '../redux/slices/theme.slice'
import { useDispatch } from 'react-redux'
import {  Appearance } from 'react-native';

export const useSampleHook = () => {
  const offset = useSharedValue(0);
  const dispatch=useDispatch()
 let colorScheme = Appearance.getColorScheme();
  const { HelloWorldModule } = NativeModules;
  const world = NativeModules.HelloWorldModule;
  const MMKV = new MMKVStorage.Loader().initialize();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255),
        },
      ],
    };
  });

 
  const changeTheme = (theme:String) => {
    switch(theme){
      case "light":
        dispatch(
              themeSlice.actions.chooseTheme("light"),
            )
            break;
            case "dark":
              dispatch(
                themeSlice.actions.chooseTheme("dark"),
              )
              break;
              case "systemDefault":
                dispatch(
                  themeSlice.actions.chooseTheme(colorScheme),
                )
                break;
    }
 }


  return {animatedStyles,offset,changeTheme};
};
