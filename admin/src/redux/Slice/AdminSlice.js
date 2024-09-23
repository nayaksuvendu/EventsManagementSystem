import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axiosinstance from "../../helper/axiosinstance"
import toast from "react-hot-toast";
import axios from 'axios';

const initialState={
    totalUser:0,
    totalBookingUser:0
}

export const getStatsData = createAsyncThunk('/alldetails',async()=>{
    try {
         const res = axios.get('/admin');
         toast.promise(res,{
            loading: "Getting the stats...",
            success: (data) => {
              return data?.data?.message;
            },
            error: "Failed to load stats",
          });
          
          return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);      
    }
});

const statSlice = createSlice({
    name:'stats',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getStatsData.fulfilled,(state,action)=>{
            state.totalUser = action?.payload?.totalUser
            state.totalBookingUser = action?.payload?.totalBookingUser
        })
    },

});
export default statSlice.reducer;