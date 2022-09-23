import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  logginedUser:
    | undefined
    | {
        email: string;
        email_verified: boolean;
        name: string;
        sub: string;
      };
};
const initialState: InitialState = {
  logginedUser: undefined,
};

type AuthReducer<Payload> = CaseReducer<InitialState, PayloadAction<Payload>>;

const login: AuthReducer<{username: string; password: string}> = (
  state,
  action,
) => {
  state.logginedUser = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login,
  },
});

export {authSlice};
