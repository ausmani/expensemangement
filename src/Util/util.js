import {applyMiddleware,createStore} from 'redux'
import combineReducer from '../Reducers/combineReducer'
import thunk from "redux-thunk";

export const testStore = (initialState) => {

    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    return createStoreWithMiddleware(combineReducer,initialState)

}