import {all} from 'redux-saga/effects';
import {authSaga} from '../sagas/auth.saga';
import {PostWebservicesaga} from '../sagas/postWebservice.saga';

function* rootSaga() {
  yield all([authSaga(), PostWebservicesaga()]);
}

export {rootSaga};
