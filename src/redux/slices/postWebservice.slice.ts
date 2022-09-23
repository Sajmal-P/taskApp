import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  UserDetails:
    | undefined
    | {
        email: string;
        name: string;
      };

  loader: boolean;
  count: number;
};
const initialState: InitialState = {
  UserDetails: undefined,
  loader: false,
  count: 0,
};

type AuthReducer<Payload> = CaseReducer<InitialState, PayloadAction<Payload>>;

const GetUserData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.loader = true;
};
const setUserData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.UserDetails = action.payload.data[0];
  state.count = action.payload.data[1];
  state.loader = false;
};
const deleteUserData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.loader = false;
};

const createUserData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.loader = false;
};

const updateUserData: AuthReducer<{name: string; age: number}> = (state, action) => {
  state.loader = false;
};

const postWebserviceSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    GetUserData,
    setUserData,
    deleteUserData,
    createUserData,
    updateUserData,
  },
});

export {postWebserviceSlice};
