import toast from "react-hot-toast";
// import axiosinstance from "../../helper/axiosinstance"
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    razorpayKey :"",
    subscription_id :"",
    isPaymentVerified : false,
    allPayments :{},
    finalMonths: {},
    monthlySalesRecord :[]
}

export const getRazorPayId = createAsyncThunk('/razorpay/getId',async ()=>{
    try{
        const response = await axios.get('/payment/razorpay-key');
        return response.data 
    }
    catch(error){
        toast.error(error?.response?.data?.message)
    }
})

export const bookingTicket = createAsyncThunk('/bookingticket',async()=>{
    try {
        const response = await axios.post('/payment/booking');
        return response.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message) 
    }
})

export const verifyUserPayment = createAsyncThunk('/payments/verify',async (data)=>{
    try {
        const response = await  axios.post('/payment/verify',{
            RozerPay_paymentId : data.razorpay_payment_id,
            RzpSubscription_id : data.razorpay_subscription_id,
            RozerPay_signature : data.razorpay_signature
        })
        return response.data
        
    } catch (error) {
        toast.error(error?.response?.data?.message) 

    }
})

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
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.razorpayKey = action?.payload?.razorpayKey 
        })
        .addCase(bookingTicket.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.sucess;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments = action?.payload?.paymentRecord;
            state.finalMonths = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })        
    }
})

export default razorPaySlice.reducer ;