import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/Axios";

// 🔹 Fetch All Posts with Token
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue, getState }) => {
    try {
      // ✅ Redux se token lo
      const token = getState().auth.user?.token; 
      
      const response = await Axios.get("/posts/all-posts", {
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ Token bhejna header me
        },
      });

      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// 🔹 Create Posts Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    updatePostLikes: (state, action) => {
      const { postId, user, isLiked } = action.payload;
      const post = state.posts.find((post) => post._id === postId);

      if (post) {
        if (isLiked) {
          // Unlike: Remove user from likes array
          post.likes = post.likes.filter((like) => like._id !== user._id);
        } else {
          // Like: Add user to likes array
          post.likes.push({ _id: user._id, username: user.username,profilePicture:user.profilePicture });
        }
      }
    },

    updateComments:(state,action)=>{
      const {postId,comment} = action.payload;
      const post = state.posts.find((post)=>post._id === postId)
      
      if(post){
        post.comments.push(comment)}
  },
  createPost :(state,action)=>{
    const {post} = action.payload;
    state.posts.unshift(post)

  }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updatePostLikes,updateComments ,createPost} = postsSlice.actions;
// Export Reducer
export default postsSlice.reducer;
