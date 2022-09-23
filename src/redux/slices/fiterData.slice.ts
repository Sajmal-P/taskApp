import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  filterData:
    | undefined
    | {
        age: string;
        name: string;
      };

  loader: boolean;
};
const initialState: InitialState = {
  filterData: undefined,
  loader: false,
};

type AuthReducer<Payload> = CaseReducer<InitialState, PayloadAction<Payload>>;

const getFilterData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.loader = true;
};
const setFilterData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.filterData = action.payload.data[0];
  state.loader = true;
};
const filterDataSlice = createSlice({
  name: 'filterData',
  initialState,
  reducers: {
    getFilterData,
    setFilterData,
  },
});

export {filterDataSlice};
