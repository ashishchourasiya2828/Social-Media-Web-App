import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/Axios";

// 🔹 Login API
export const loginUser = createAsyncThunk("auth/login", async ({email,password}, { rejectWithValue }) => {
    try {
        const response = await Axios.post(`/users/login`, {email,password});
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Register API
export const registerUser = createAsyncThunk(
    "auth/register",
    async ({email,password,username,}, { rejectWithValue }) => {
      try {
        const response = await Axios.post(`/users/register`, {email,password,username});
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

// 🔹 User Slice
const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        logout: (state) => { state.user = null; },
        
        updateProfileImage: (state, action) => {
          if (state.user) {
              state.user.user.profilePicture = action.payload;
          }},
        
          followUnfollowUser: (state, action) => {
            if (state.user) {
                const { userId, username, profilePicture } = action.payload;
        
                const isFollowing = state.user.user.following.some(user => user._id === userId);
        
                if (isFollowing) {
                    state.user.user.following = state.user.user.following.filter(user => user._id !== userId);
                } else {
                    state.user.user.following.push({ _id: userId, username, profilePicture });
                }
            }
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => { 
                state.loading = false; 
                state.user = action.payload; 

            })
            .addCase(loginUser.rejected, (state, action) => { 
                state.loading = false; 
                state.error = action.payload; 
            })
             .addCase(registerUser.pending, (state) => {
                state.loading = true;
              })
              .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user=action.payload
                
              })
              .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
    },
});

export const {  logout, updateProfileImage,followUnfollowUser } = authSlice.actions;
export default authSlice.reducer;
