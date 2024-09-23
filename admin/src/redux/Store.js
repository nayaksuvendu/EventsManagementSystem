import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slice/AuthSlice.js";
import RazorpaySliceReducer from "./Slice/RazorpaySlice.js";
import AdminSliceReducer from "./Slice/AdminSlice.js"


export const store = configureStore({
    reducer:{
        auth: AuthSliceReducer,
        razorpay: RazorpaySliceReducer,
        admin: AdminSliceReducer
    },
    devTools:true // optional 
});