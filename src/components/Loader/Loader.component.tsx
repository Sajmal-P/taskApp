import React, {useEffect} from 'react';
import {SkypeIndicator} from 'react-native-indicators';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {StyleSheet, View} from 'react-native';
import {loaderSlice} from '../../redux/slices/loader.slice';
import {C} from '../../constants';

const styles = StyleSheet.create({
  spinnerStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
  },
});
const Spinner = props => {
  const enable = useSelector((state: RootState) => state.loader.loader.enable);

  const dispatch = useDispatch();

  useEffect(() => {
    if (enable) {
      setTimeout(() => {
        dispatch(loaderSlice.actions.hide());
      }, 1000 * 10);
    }
  }, [enable]);

  return props.enable ? (
    <View style={styles.spinnerStyle}>
      <SkypeIndicator color={'red'} size={60} />
    </View>
  ) : null;
};

export default Spinner;
