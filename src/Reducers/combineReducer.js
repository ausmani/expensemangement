import UserReducer from "./UserReducer";
import DepositReducer from "./DepositReducer";
import ExpenseReducer from "./ExpenseReducer";
import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import DashboardReducer from "./DashboardReducer";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitlelist:['users','deposit','expenses','auth','home']
}

const appReducer = combineReducers({
    users: UserReducer,
    deposit: DepositReducer,
    expenses: ExpenseReducer,
    auth:AuthReducer,
    home:DashboardReducer
});

const combinedReducer = (state,action) => {
    if(action.type=='USER_LOGOUT'){
        storage.removeItem("persist:root");
        state = undefined;
        // console.log("Here")

    }
    return appReducer(state,action)

}

const combineReducer = persistReducer(persistConfig,combinedReducer);
export default combineReducer;