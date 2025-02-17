import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import { updatePostLikes } from "../Slices/PostSlice";
import { Link } from "react-router-dom";

const Post = ({ post, setlikePanelOpen, likePanelData,setcommentPanel,setcommentPanelData }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // const isliked = post.likes.includes(user?.user?._id)
  const isliked = post?.likes?.some((like) => like._id === user?.user?._id);

  const handleLike = async ({ postID, isliked }) => {
    try {
      const response = await Axios.post(
        `/posts/${postID}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          updatePostLikes({
            postId: postID,
            user: user?.user,
            isLiked: isliked,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
            <img
              className="h-full w-full object-cover"
              src={post?.userId.profilePicture}
              alt=""
            />
          </div>
          <Link
            to={`/profile/${post?.userId?._id}`}
            className="font-medium text-gray-700"
          >
            {post?.userId.username}
          </Link>
        </div>
        <div className="bg-gray-100 h-72 overflow-hidden ">
          <img
            src={post?.media}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="p-4">
          <div className="flex mt-5 px-2 itmes-center gap-6">
            <div className="flex items-center gap-2">
              <h2 className="flex  items-center  gap-1">
                <i
                  onClick={() => {
                    handleLike({ postID: post?._id, isliked });
                  }}
                  className={`text-2xl ${
                    isliked ? "ri-heart-fill  text-red-500" : "ri-heart-line"
                  }`}
                ></i>
              </h2>
              <h1
                onClick={() => {
                  likePanelData(post?._id);
                  setlikePanelOpen(true);
                }}
              >
                {post?.likes?.length}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="flex items-center gap-1">
                <i onClick={()=>{
                  setcommentPanel(true)
                  setcommentPanelData(post?._id)
                  }} className=" text-2xl ri-chat-3-line"></i>
              </h1>
              <h2>{post?.comments.length}</h2>
            </div>
          </div>
          <p className="text-gray-600 mt-2 ">{post?.content}</p>

          <h2 className="text-gray-400">
            {new Date(post?.createdAt).toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Post;
