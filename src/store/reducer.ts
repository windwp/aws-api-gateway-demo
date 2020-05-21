import { combineReducers } from "redux";
import wsSlice from "./ws-store";
const rootReducer = combineReducers({ ws: wsSlice });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
