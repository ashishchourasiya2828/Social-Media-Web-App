import React, { useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { userContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Home = () => {

  const [AllPosts, setAllPosts] = useState([])

  const {token} = useContext(userContext)

  useEffect(() => {
   
    const fetchAllPost = async ()=>{
      const response = await Axios.get('/posts/all-posts',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setAllPosts(response.data);
      
    }
    fetchAllPost()


  }, [])
  



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">SocialApp</h1>
          <nav className="space-x-4">
            <Link to="/home" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link to="/profile" className="text-gray-600 hover:text-gray-800">Profile</Link>
            <Link to="/setting" className="text-gray-600 hover:text-gray-800">Settings</Link>
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
            {
              AllPosts.map(function(elem,key){
                
                return  <div key={key} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <p className="font-medium text-gray-700">{elem.userId.username}</p>
                </div>
                <div className="bg-gray-100 h-72 overflow-hidden ">
                  <img src={elem.media} className="h-full w-full object-cover" alt="" />
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-2">{elem.content}</p>
                  <div className="flex space-x-4">
                    <button className="text-gray-600 hover:text-blue-500">Like</button>
                    <button className="text-gray-600 hover:text-blue-500">Comment</button>
                    <button className="text-gray-600 hover:text-blue-500">Share</button>
                  </div>
                </div>
              </div>
              })
            }
          </div>
        </section>

        {/* Sidebar */}
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

      {/* Footer */}
      <footer className="mt-10 py-4 bg-gray-100 border-t border-gray-200 text-center text-gray-600 text-sm">
        &copy; 2025 SocialApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
