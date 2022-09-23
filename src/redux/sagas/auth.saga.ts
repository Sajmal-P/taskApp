import {AxiosResponse} from 'axios';
import {put, takeEvery, call, select} from 'redux-saga/effects';
import {LOGIN} from '../actions/auth.actions';
import {authSlice} from '../slices/auth.slice';

// workers
function* login(action: any) {
  // yield put(authSlice.actions.login(action.payload));
}

// Watcher
export function* authSaga() {
  yield takeEvery(LOGIN, login);
}
