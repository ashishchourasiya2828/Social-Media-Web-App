import React, { useState } from "react";
import Axios from "../utils/Axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../Slices/PostSlice";

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth || { user: null, error: null, loading: false }
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [postContent, setPostContent] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      alert("Please add some files!");
      return;
    }

    const formData = new FormData();

    formData.append("content", postContent);

    const files = Array.isArray(selectedFiles)
      ? selectedFiles
      : [selectedFiles];

    files.forEach((file) => {
      formData.append("media", file);
    });

    try {
      const response = await Axios.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (response.status === 201) {
        dispatch(createPost(response.data));
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="fixed top-10 left-0  p-2">
        <h1
          onClick={() => {
            navigate(-1);
          }}
          className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer"
        >
          <i className="ri-arrow-left-line"></i>
        </h1>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create New Post
        </h2>
        <form onSubmit={handlePostSubmit}>
          {/* File Input */}
          <div className="mb-4">
            <label
              htmlFor="file-input"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Files
            </label>
            <div className="border-2 border-dashed rounded-lg flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition">
              <input
                id="file-input"
                type="file"
                multiple
                required
                accept="image/*, video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input"
                className="text-gray-600 cursor-pointer"
              >
                {selectedFiles.length > 0
                  ? `${selectedFiles.length} file(s) selected`
                  : "Drag and drop files here or click to browse"}
              </label>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-6">
            <label
              htmlFor="post-content"
              className="block text-gray-700 font-medium mb-2"
            >
              Post Content
            </label>
            <textarea
              id="post-content"
              rows="4"
              placeholder="Write something interesting..."
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={postContent}
              onChange={(e) => setPostContent(e?.target.value)}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handlePostSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
