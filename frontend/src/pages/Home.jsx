import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Slices/PostSlice";
import Post from "../components/Post";
import LikePanel from "../components/LikePanel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likePanelOpen, setlikePanelOpen] = useState(false);
  const [likedUserData, setlikedUserData] = useState([]);
  const likePanelRef = useRef(null);

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

  const likePanelData = (postId) => {
    setlikedUserData(posts.find((post) => post._id === postId));
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SocialApp</h1>
          <nav className="space-x-4">
            <Link to="/home" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-800">
              Profile
            </Link>
            <Link to="/setting" className="text-gray-600 hover:text-gray-800">
              Settings
            </Link>
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
          <div className="mt-6 space-y-6">
            {posts?.map(function (elem, key) {
              
              return (
                <Post
                  key={key}
                  likePanelData={likePanelData}
                  setlikePanelOpen={setlikePanelOpen}
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

      <div
        ref={likePanelRef}
        className="h-2/3 w-full fixed translate-y-full bottom-0 p-4  bg-gray-200 rounded-lg "
      >
        <LikePanel
          likedUserData={likedUserData}
          setlikePanelOpen={setlikePanelOpen}
        />
      </div>

      <footer className="mt-10 py-4 bg-gray-100 border-t border-gray-200 text-center text-gray-600 text-sm">
        &copy; 2025 SocialApp. All rights reserved.
      </footer>
      {/* 
      <div className='w-full bg-red-500 flex items-center justify-between px-12 h-12 fixed bottom-0 left-0 z-9' >
        <div> <h1><i className=" text-2xl ri-home-line"></i></h1> </div>
        <div> <h1><i className=" text-2xl ri-add-line"></i></h1> </div>
        <div> <h1><i className=" text-2xl ri-search-line"></i></h1> </div>
      </div> */}
    </div>
  );
};

export default Home;
