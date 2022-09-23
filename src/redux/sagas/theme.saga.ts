import { AxiosResponse } from 'axios';
import { put, takeEvery, call, select } from 'redux-saga/effects';
import {  CHOOSE_THEME} from '../actions/theme.actions';
import { themeSlice } from '../slices/theme.slice';

  function* chooseTheme(action: any) {
    yield put(themeSlice.actions.chooseTheme(action));
  }
 

  export function* themeSaga() {
    yield takeEvery(CHOOSE_THEME, chooseTheme);
  }
  