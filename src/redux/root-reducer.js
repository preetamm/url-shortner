import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import dashBoardReducer from "./dashboard/dashboard.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

/*onst persistConfig = {
  key: "root",
  storage,
};
*/

const rootReducer = combineReducers({
  user: userReducer,
  dashBoard: dashBoardReducer,
});

export default rootReducer;
