import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type InitialState = {
  userName: string;
};

const initialState: InitialState = {
  userName: 'sajmal',
};

type NameReucer<Payload> = CaseReducer<InitialState, PayloadAction<Payload>>;

const nameChange: NameReucer<string> = (state, action) => {
  state.userName = action.payload;
};
const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    nameChange,
  },
});

export {nameSlice};
