import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ws from "../services/ws-service";
import { AppThunk } from "./store";
const initState: {
  status: "init" | "connecting" | "connected" | "close";
  errorMessage: string;
} = {
  status: "init",
  errorMessage: "",
};
const wsSlice = createSlice({
  name: "ws-store",
  initialState: initState,
  reducers: {
    init: (state) => {
      state.status = "init";
      state.errorMessage = "";
    },
    connected: (state) => {
      state.status = "connected";
    },
    connecting: (state) => {
      state.status = "connecting";
      state.errorMessage = "";
    },
    closed: (state) => {
      state.status = "close";
    },
    setError: {
      reducer: (state, action: PayloadAction<string>) => {
        return { ...state, errorMessage: action.payload };
      },
      prepare: (value: string) => ({ payload: value }), // fallback if t
    },
  },
});
export const { connected, closed, setError } = wsSlice.actions;
export default wsSlice.reducer;
export type wsStateType = Partial<typeof initState>;

export const connect = (): AppThunk => (dispatch) => {
  dispatch(wsSlice.actions.connecting());
  ws.connect(dispatch);
};

export const disconnect = (): AppThunk => (dispatch) => {
  dispatch(wsSlice.actions.init());
  ws.disconnect();
};
