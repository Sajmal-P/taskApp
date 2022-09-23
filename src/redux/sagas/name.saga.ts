import {takeEvery} from 'redux-saga/effects';
import {NAME} from '../actions/name.actions';
import {nameSlice} from '../slices/name.slice';

function* name(action: any) {
  console.log('named middleware');
  // yield put(nameSlice.actions.names(action));
}

export function* nameSaga() {
  yield takeEvery(NAME, name);
}
