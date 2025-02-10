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
      const { postId, userId, isLiked } = action.payload;
      const post = state.posts.find((p) => p._id === postId);

      if (post) {
        if (isLiked) {
          // Unlike karna hai toh user ID hata do

          post.likes = post.likes.filter((id) => id !== userId);
        } else {
          // Like karna hai toh user ID add kar do
          post.likes.push(userId);
        }
      }
    },
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

export const { updatePostLikes } = postsSlice.actions;
// Export Reducer
export default postsSlice.reducer;
