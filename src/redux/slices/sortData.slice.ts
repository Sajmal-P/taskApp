import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  sortData:
    | undefined
    | {
        age: string;
        name: string;
      };

  loader: boolean;
};
const initialState: InitialState = {
  sortData: undefined,
  loader: false,
};

type AuthReducer<Payload> = CaseReducer<InitialState, PayloadAction<Payload>>;

const getSortedData: AuthReducer<{name: string; age: number}> = (
  state,
  action,
) => {
  state.loader = true;
};
const setSortedData: AuthReducer<{name: string; age: number}> = (
  state,
  action,
) => {
  state.sortData = action.payload.data[0];
  state.loader = true;
};
const sortDataSlice = createSlice({
  name: 'sortData',
  initialState,
  reducers: {
    getSortedData,
    setSortedData,
  },
});

export {sortDataSlice};
