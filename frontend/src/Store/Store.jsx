import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import postReducer from "../Slices/PostSlice";
import commentReducer from "../Slices/CommentSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments:commentReducer
    
  },
});

export default store;
