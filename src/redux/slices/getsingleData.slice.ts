import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  singleUserDetails:
    | undefined
    | {
        email: string;
        name: string;
      };

  loader: boolean;
};
const initialState: InitialState = {
  singleUserDetails: undefined,
  loader: false,
};

type AuthReducer<Payload> = CaseReducer<InitialState, PayloadAction<Payload>>;

const getSingleUserData: AuthReducer<{name: string; age: number}> = (
  state,
  action,
) => {
  state.loader = true;
};
const setSingleUserData: AuthReducer<{name: string; age: number}> = (
  state,
  action,
) => {
  state.singleUserDetails = action.payload.data[0];
  state.loader = false;
};

const singleUserDataSlice = createSlice({
  name: 'singleUserDetails',
  initialState,
  reducers: {
    getSingleUserData,
    setSingleUserData,
  },
});

export {singleUserDataSlice};
