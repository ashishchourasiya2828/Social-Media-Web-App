import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Slices/PostSlice";
import Post from "../components/Post";
import LikePanel from "../components/LikePanel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Comments from "../components/Comments";
import Axios from "../utils/Axios";
import { logout } from "../Slices/AuthSlice";
import { addCommentsData } from "../Slices/CommentSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likePanelOpen, setlikePanelOpen] = useState(false);
  const [commentPanel, setcommentPanel] = useState(false);
  const [likedUserData, setlikedUserData] = useState([]);
  const [isActiveforBgChange, setisActiveforBgChange] = useState("home");
  const likePanelRef = useRef(null);
  const commentPanelRef = useRef(null);

  const { posts, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.user?.token);

 

  useEffect(() => {
    if (token) {
      dispatch(fetchPosts());
    } else {
      navigate("/");
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (commentPanel) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [commentPanel]);

  useGSAP(() => {
    if (likePanelOpen) {
      gsap.to(likePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(likePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [likePanelOpen]);

  useGSAP(() => {
    if (commentPanel) {
      gsap.to(commentPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(commentPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [commentPanel]);

  const likePanelData = (postId) => {
    const post = posts.find((post) => post._id === postId);

    setlikedUserData(post?.likes || []); // Ensure likedUsers exists
  };

  const getCommentsForPost = async(postId)=>{
    try{
      const response = await Axios.get(`/posts/${postId}/comments`,{},{
        headers:{
          Authorization:`Bearer ${user?.token}`
        }
      })
      dispatch(addCommentsData({data:response.data,postId:postId}))
      
      
      
    }catch(err){
      console.log(err);
      
    }
  }


  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen  relative bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SnapGram</h1>
          <nav className="space-x-6  ">
           
              <i className=" text-2xl font-lg ri-search-2-line"></i>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Stories Section */}
        <section className="md:col-span-2">
          {/* <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-blue-500"></div>
                <p className="text-sm mt-2 text-gray-600">User {index + 1}</p>
              </div>
            ))}
          </div> */}

          {/* Feed */}
          <div className=" space-y-6">
            {posts?.map(function (elem, key) {
              return (
                <Post
                  key={key}
                  likePanelData={likePanelData}
                  setlikePanelOpen={setlikePanelOpen}
                  setcommentPanel={setcommentPanel}
                  getCommentsForPost={getCommentsForPost}
                  post={elem}
                />
              );
            })}
          </div>
        </section>

        <aside className="hidden md:block">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-medium text-gray-700">Your Name</p>
                <p className="text-sm text-gray-500">@username</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Create Post
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">
                Explore
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">
                Notifications
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* like panel  */}
      <div
        ref={likePanelRef}
        className="h-2/3 w-full fixed translate-y-full bottom-0 p-4  bg-gray-200 rounded-lg "
      >
        <LikePanel
          likedUserData={likedUserData}
          setlikePanelOpen={setlikePanelOpen}
        />
      </div>

      {/* comment panel */}
      <div
        ref={commentPanelRef}
        className="h-4/5 w-full fixed pt-2 translate-y-full px-4 z-10 border-2 overflow-y-hidden  bg-gray-100 rounded-lg bottom-0"
      >
        <Comments
          setcommentPanel={setcommentPanel}
        />
      </div>

      <footer className="mt-10 py-4 bg-gray-100 border-t border-gray-200 text-center text-gray-600 text-sm">
        &copy; 2025 SocialApp. All rights reserved.
      </footer>

    
    </div>
  );
};

export default Home;
