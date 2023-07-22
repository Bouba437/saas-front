import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import { prospectsApi } from "../services/prospectsApi";
import { followsApi } from "../services/followsApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [prospectsApi.reducerPath]: prospectsApi.reducer,
        [followsApi.reducerPath]: followsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(prospectsApi.middleware, followsApi.middleware)
});

export default store;