import {combineReducers} from 'redux';
import {authSlice} from '../slices/auth.slice';
import {loaderSlice} from '../slices/loader.slice';
import {themeSlice} from '../slices/theme.slice';
import {nameSlice} from '../slices/name.slice';
import {postWebserviceSlice} from '../slices/postWebservice.slice';
import {filterDataSlice} from '../slices/fiterData.slice';
import {sortDataSlice} from '../slices/sortData.slice';
import {singleUserDataSlice} from '../slices/getsingleData.slice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loader: loaderSlice.reducer,
  theme: themeSlice.reducer,
  name: nameSlice.reducer,
  postWebservice: postWebserviceSlice.reducer,
  filterData: filterDataSlice.reducer,
  sortedData: sortDataSlice.reducer,
  singleData: singleUserDataSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
