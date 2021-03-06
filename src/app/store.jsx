// This is step 2. You have to pass the reducer to the store.
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authSlice,
    }
})