import React, { useContext, useEffect, useRef, useState } from "react";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage } from "../Slices/AuthSlice";
import PostList from "../components/Post";

const UserProfile = () => {
  const { user, error, loading } = useSelector(
    (state) => state.auth || { user: null, error: null, loading: false }
  );
  
  
  
  const [profileImageURL, setprofileImageURL] = useState("");
  const [postPanelOpen, setpostPanelOpen] = useState(false);
  const [profileImagePanel, setprofileImagePanel] = useState(false);
  const profileImagePanelRef = useRef(null);
  const postPanelRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateHandler = () => {
    navigate('/home');
  };

  
  const profileImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", profileImageURL);

    try {
      const response = await Axios.post(
        `/users/${user?.user?._id}/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setprofileImagePanel(false);
        dispatch(updateProfileImage(response.data.imageUrl));
      }
    } catch (err) {
      console.error("Error uploading profile image:", err); // ✅ Proper error handling
    }
  };

  //    useGSAP(()=>{
  //         if(postPanelOpen){
  //             gsap.to(postPanelRef.current,{
  //                 transform:"translateY(0)"
  //             })
  //         }
  //         else{
  //             gsap.to(postPanelRef.current,{
  //                 transform:"translateY(100%)"
  //             })
  //         }
  //    },[postPanelOpen])

  useGSAP(() => {
    if (profileImagePanel) {
      gsap.to(profileImagePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(profileImagePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [profileImagePanel]);

  return (
    <div className="p-4 w-full relative min-h-screen bg-[#f6f6f6]  ">
      <div className="w-full text-lg mb-4   flex items-center justify-between  ">
        <h1 onClick={navigateHandler} className="text-">
          <i className="ri-arrow-left-line"></i>
        </h1>
        <h1>
          <i className="ri-more-2-fill"></i>
        </h1>
      </div>
      <div className="w-full h-fit pb-6 bg-white py-3 px-2  rounded-lg">
        <div className="w-full h-[27vw] p-2  flex">
          <div className="  h-[100%] w-1/4 relative ">
            <div className="h-6 w-6 rounded-full bottom-0 right-0 flex items-center justify-center absolute bg-blue-500">
              <h1
                className=""
                onClick={() => {
                  setprofileImagePanel(true);
                }}
              >
                <i className=" text-white font-bold ri-add-line"></i>
              </h1>
            </div>
            <div className="h-[95%] w-full overflow-hidden rounded-full ">
              <img
                className="h-full w-full object-cover"
                src={user?.user?.profilePicture}
                alt=""
              />
            </div>
          </div>
          <div className="w-3/4 h-[100%] flex items-center gap-7 justify-end ">
            <div className="text-center  ">
              <h2 className="font-bold text-md ">
                {" "}
                {user?.user?.posts?.length}
              </h2>
              <h1 className="font-md text-sm">Posts</h1>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-md ">
                {user?.user?.followers?.length}
              </h2>
              <h1 className="font-md text-sm">Followers</h1>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-md ">
                {user?.user?.following?.length}
              </h2>
              <h1 className="font-md text-sm">Following</h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-md font-md text-lg tracking-tight mb-1 mt-2 ">
            {user?.user?.username}
          </h1>
          <h2 className="text-sm font-md tracking-tight text-gray-400">
            {user?.user?.bio}
          </h2>
        </div>
        <div className="w-full h-12 flex mt-6 justify-between items-center gap-3 ">
          <div className="w-1/2 h-full  ">
            <h1 className="border-zinc-200 bg-zinc-200 border-2 font-semibold text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1">
              Following <i className="  ri-arrow-down-double-line"></i>
            </h1>
          </div>
          <div className="w-1/2 h-full  ">
            <h1 className="border-zinc-200 bg-zinc-200 border-2 font-semibold text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1">
              message
            </h1>
          </div>
        </div>
      </div>
      {/* Posts Grid Section */}
      <div className="w-full mt-4  grid grid-cols-2 gap-2 bg-zinc-100">
        {user?.user?.posts?.map((post, index) => {
            
            return <div
             key={index}
             onClick={() => {
                     }}
             className="h-44 w-full mb-2 rounded-md  overflow-hidden"
           >
             <img
               src={post.media}
               alt="Post"
               className="w-full h-full object-cover"
             />
           </div>
        })}
      </div>

      {/* <div ref={postPanelRef} className='h-screen w-[100%] left-0 py-5 fixed translate-y-full bg-gray-200 px-4 bottom-0 z-8' >
         <Post postData={postData}  setpostPanelOpen={setpostPanelOpen} />
        </div> */}

      <div
        ref={profileImagePanelRef}
        className="h-36 w-full bg-zinc-200 rounded-xl  fixed  px-4 bottom-0 translate-y-full left-0"
      >
        <h1
          onClick={() => {
            setprofileImagePanel(false);
          }}
          className="text-center mb-3 "
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h1>
        <form onSubmit={(e) => profileImage(e)}>
          <input
            required
            onChange={(e) => {
              setprofileImageURL(e.target.files[0]);
            }}
            className="file:bg-green-500 file:text-white file:px-4 file:outline-none file:border-none mb-3 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-green-600"
            type="file"
          />
          <button className="px-4 py-1 mt-2 rounded-md text-white bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
