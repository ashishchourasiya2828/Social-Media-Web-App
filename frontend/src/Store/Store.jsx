import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import postReducer from "../Slices/PostSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export default store;
