import { createSlice, configureStore } from '@reduxjs/toolkit'

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments:[],
    postId:null
  },
  reducers: {
    addCommentsData:(state,action)=>{
        const {data,postId} = action.payload
        
        state.comments = data;
        state.postId= postId

    },
    updateCommentsData:(state,action)=>{
        const {postId,data} = action.payload;

        state.comments.push(data);

    },   
     updateCommentsReply: (state, action) => {
        const { data } = action.payload;

        const foundComment = state.comments.find(comment => comment._id === data.parentCommentId);

        if (foundComment) {
            if (!foundComment.replies) {
                foundComment.replies = [];
            }

            foundComment.replies.push(data);
        }
    }

  }
})

export const { addCommentsData,updateCommentsReply,updateCommentsData} = commentSlice.actions

export default commentSlice.reducer

