/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from 'axios';
import {call, takeEvery, takeLatest, put} from 'redux-saga/effects';
import {
  REQUEST_USER_DATA,
  RECIEVE_USER_DATA,
  FILTER_USER_DATA,
  SORT_DATA,
} from '../actions/postWebservice.actions';
import * as api from '../../services/api/example.api';
import {postWebserviceSlice} from '../slices/postWebservice.slice';
import { filterDataSlice } from '../slices/fiterData.slice';
import { sortDataSlice } from '../slices/sortData.slice';
import { singleUserDataSlice } from '../slices/getsingleData.slice';
// import {postWebserviceSlice} from '../slices/postWebservice.slice';

function* GetUserData(action: any) {
  const data = yield call(api.retrieveUserData, action.payload.query);
  yield put(
    postWebserviceSlice.actions.setUserData({
      type: REQUEST_USER_DATA,
      data,
    }),
  );
}
function* getFilterData(action: any) {
  const data = yield call(api.retrieveUserData, action.payload);
  yield put(
    filterDataSlice.actions.setFilterData({
      data,
    }),
  );
}

function* getSortedData(action: any) {
  const data = yield call(api.retrieveUserData, action.payload.order);
  yield put(
    sortDataSlice.actions.setSortedData({
      data,
    }),
  );
}

function* getSingleUserData(action: any) {
  const data = yield call(api.retrieveUserData, action.payload.query);
  yield put(
    singleUserDataSlice.actions.setSingleUserData({
      data,
    }),
  );
}
function* deleteUserData(action: any) {
  const query = `?_page=${action.payload.query[1]}`;
  const data = yield call(api.deleteData, action.payload.query[0]);
  yield put(
    postWebserviceSlice.actions.GetUserData({
      query,
    }),
  );
}

function* createUserData(action: any) {
  const query = `?_page=${action.payload.commonParams[0].page}`;
  const data = yield call(api.createUser, action.payload.commonParams);
  yield put(
    postWebserviceSlice.actions.GetUserData({
      query,
    }),
  );
}

function* updateUserData(action: any) {
  const query = `?_page=${action.payload.commonParams[0].page}`;
  const data = yield call(api.updateData, action.payload.commonParams);
  yield put(
    postWebserviceSlice.actions.GetUserData({
      query,
    }),
  );
}
export function* PostWebservicesaga() {
  yield takeEvery('userDetails/GetUserData', GetUserData);
  yield takeEvery('filterData/getFilterData', getFilterData);
  yield takeEvery('sortData/getSortedData', getSortedData);
  yield takeEvery('singleUserDetails/getSingleUserData', getSingleUserData);
  yield takeEvery('userDetails/deleteUserData', deleteUserData);
  yield takeEvery('userDetails/createUserData', createUserData);
  yield takeEvery('userDetails/updateUserData', updateUserData);
}
