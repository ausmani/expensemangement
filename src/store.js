import {persistStore,persistReducer} from "redux-persist";

import combineReducer from "./Reducers/combineReducer";
import {createStore ,applyMiddleware} from "redux";
import thunk from "redux-thunk";

// const persistConfig = {
//     key: 'root',
//     storage
// }
// const persistedReducer = persistReducer(persistConfig,combineReducer)

// let store = createStore(persistedReduer,applyMiddleware(thunk))
// export const  persistor = persistStore(store)

// export default () => {
//
//     return { store,persistor}
// }

export const store = createStore(combineReducer,applyMiddleware(thunk));
export const persistor = persistStore(store);

export default {store,persistor}
//export default store;

// export default () => {
//     let store = createStore(persistedReducer,applyMiddleware(thunk))
//     let persistor = persistStore(store)
//     return { store, persistor }
// }

