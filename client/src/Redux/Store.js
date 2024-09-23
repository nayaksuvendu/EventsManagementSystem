import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slice/AuthSlice";
import SearchSliceReducer from "./Slice/SearchSlice";
import RazorpaySliceReducer from "./Slice/RazorpaySlice";



export const store = configureStore({
    reducer:{
        auth: AuthSliceReducer,
        search: SearchSliceReducer,
        razorpay: RazorpaySliceReducer,

    },
    devTools:true // optional 
});


