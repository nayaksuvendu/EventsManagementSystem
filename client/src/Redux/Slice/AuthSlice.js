import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";


const initialState = {
  // getting all items from localStorage or DB
  user:
    localStorage.getItem("user") === "undefined"
      ? null
      : JSON.parse(localStorage.getItem("user")), // Parse JSON if it exists
  loading: false,
  error: null,
};

// sending dispatched value to the server
export const createAccount = createAsyncThunk("register", async (data, { rejectWithValue }) => {
  try {
    const res =  axios.post("auth/register", data); // sending data to the specified server URL
    toast.promise(res, {
      loading: "wait! creating your account",
      success: (data) =>{ return data?.data?.message},
      error: (data) => {return data?.response?.data?.message || "Registration failed"},
    });
    return (await res).data
  } catch (error) {
    toast.error("Registration failed");
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
  try {
    const res =  axios.post("auth/login", data); // sending data to the specified server URL
    toast.promise(res, {
      loading: "wait! authentication in progress...",
      success: (data) =>{return data?.data?.message},
      error: (data) =>{ return data?.response?.data?.message || "Login failed"},
    });
    return  (await res).data;
  } catch (err) {
    toast.error("Login failed");
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const forgetPassword = createAsyncThunk("user/forgetPassword", async (email, { rejectWithValue }) => {
  try {
    const res = axios.post("auth/forget", email);
    toast.promise(res, {
      loading: "wait! loading...",
      success: (data) => data?.data?.message,
      error: "Failed to send verification link",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error occurred");
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const resetPassword = createAsyncThunk("/auth/reset", async (data, { rejectWithValue }) => {
  try {
    const res =  axios.post(`auth/reset/${data.resetToken}`, { password: data.password });
    toast.promise(res, {
      loading: "wait! Resetting...",
      success: (data) => data?.data?.message,
      error: "Failed to reset password",
    });
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error occurred");
    return rejectWithValue(error.response?.data || error.message);
  }
});

// create slice
const AuthSlice = createSlice({
  name: "auth", // slice name
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
      localStorage.clear();
      toast.success("Logout Successful!");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login lifecycle
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action?.payload?.details));
        state.user = action?.payload?.details;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Login failed";
      })

      // Handle account creation lifecycle
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.loading = false;
        toast.success("Account created successfully");
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Registration failed";
      })

      // Handle forget password lifecycle
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("Verification link sent");
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Failed to send verification link";
      })

      // Handle reset password lifecycle
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Password reset successfully");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message || "Password reset failed";
      });
  },
});

// Export actions and reducer
export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
