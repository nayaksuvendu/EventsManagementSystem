import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Initial State
const initialState = {
  user: (sessionStorage.getItem("user") === "undefined") ? null : JSON.parse(sessionStorage.getItem("user")),
  isLoggedIn: sessionStorage.getItem('isLoggedIn') || false,
  isAdmin : sessionStorage.getItem('isAdmin') || false,
  loading: false,
  error: null,
};

// Asynchronous Thunks for Login and Register
export const loginUser = createAsyncThunk("login",async (credentials) => {
    try {
      const res = axios.post("auth/login", credentials);
      toast.promise(res,{
        loading:"wait! authentication on progress...",
        success: (data) =>{return data?.data?.message},
        error: (data) =>{ return data?.response?.data?.message || "Login failed"},
     })
      return (await res).data
    } catch (err) {
      toast.error("Login Failed!");
    }
  }
);

export const forgetPassword = createAsyncThunk("forgetpassword", async (email, { rejectWithValue }) => {
  try {
    const res = axios.post("auth/forget", email);
    toast.promise(res, {
      loading: "wait! loading...",
      success: (data) => data?.data?.message,
      error: "Failed to send verification link",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Internal error occurred");
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const resetPassword = createAsyncThunk("resetpassword", async (data, { rejectWithValue }) => {
  try {
    const res =  axios.post(`auth/reset/${data.resetToken}`, { password: data.password });
    toast.promise(res, {
      loading: "wait! Resetting...",
      success: (data) => data?.data?.message,
      error: "Failed to reset password",
    });
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Internal error occurred");
    return rejectWithValue(error.response?.data || error.message);
  }
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      sessionStorage.clear()
      toast.success("Logout Successful!");
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      sessionStorage.setItem("user",JSON.stringify(action?.payload?.details));
      sessionStorage.setItem("isAdmin",JSON.stringify(action?.payload?.isAdmin));
      sessionStorage.setItem("isLoggedIn",true);
      state.isLoggedIn = true;
      state.loading = false;
      state.isAdmin = action?.payload?.isAdmin;
      state.user = action?.payload?.details;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state,action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    });

  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;

export default authSlice.reducer;
