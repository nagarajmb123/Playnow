

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice"
import searchReducer from "./searchSlice"

const rootReducer = combineReducers({
    search: searchReducer,
    auth: authReducer,
});


export const store = configureStore({
    reducer: rootReducer,
})