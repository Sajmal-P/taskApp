import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';

type LoaderState = {
  loader: {
    enable: boolean;
    text?: string;
  };
};
type LoaderSliceReducer<Payload> = CaseReducer<
  LoaderState,
  PayloadAction<Payload>
>;

const initialState: LoaderState = {
  loader: {
    enable: false,
  },
};

const show: LoaderSliceReducer<string | void> = (state) => {
  state.loader.enable = true;
};

const hide: LoaderSliceReducer<string | void> = (state) => {
  state.loader.enable = false;
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    show,
    hide,
  },
});

export {loaderSlice};
