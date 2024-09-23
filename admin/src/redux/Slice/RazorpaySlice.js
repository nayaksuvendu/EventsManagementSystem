import toast from "react-hot-toast";
// import axiosinstance from "../../helper/axiosinstance"
import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    allPayments :{},
    finalMonths: {},
    monthlySalesRecord :[]
}

export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response =  axios.get("/payment?count=100"); // getting latest 100 payment
        toast.promise(response, {
            loading: "Getting the payment record",
            success: (data) => {
                return data?.data?.message
            },
            error: (data) => {
                return data?.data?.message
            }
        })
        return  (await response).data

    } catch(error) {

        toast.error("Operation failed");
    }
});

// Create Slice
const razorPaySlice = createSlice({
    name:'razorpay',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
         builder.addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments = action?.payload?.paymentRecord;
            state.finalMonths = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })        
    }
})

export default razorPaySlice.reducer ;