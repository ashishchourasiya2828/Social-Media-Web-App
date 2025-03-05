import React, { useEffect, useRef, useState } from "react";
import Axios from "../utils/Axios";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfileImage } from "../Slices/AuthSlice";
import { deletePost } from "../Slices/PostSlice";
import FollowerPanel from "../components/FollowerPanel";
import FollowingPanel from "../components/FollowingPanel";

const UserProfile = () => {
  const { user, error, loading } = useSelector(
    (state) => state.auth || { user: null, error: null, loading: false }
  );

  const { posts } = useSelector((state) => state.posts);

  const [LogutIcon, setLogutIcon] = useState(false);
  const [followerPanel, setfollowerPanel] = useState(false)
  const [userPosts, setuserPosts] = useState([]);
  const [deletePostTimeout, setdeletePostTimeout] = useState(null);
  const [postDeleteIconId, setpostDeleteIconId] = useState(null);
  const [followingPanel, setfollowingPanel] = useState(false)
  const followingPanelRef = useRef(null)

  const [profileImageURL, setprofileImageURL] = useState("");
  const [profileImagePanel, setprofileImagePanel] = useState(false);
  const profileImagePanelRef = useRef(null);
  const followerPanelRef = useRef(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setuserPosts(posts.filter((post) => post?.userId?._id === user?.user?._id));
  }, [posts, user]);

  const navigateHandler = () => {
    navigate("/home");
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

  useGSAP(() => {
    if (profileImagePanel) {
      gsap.to(profileImagePanelRef.current, {
        transform: "translateY(0)",
        ease: "power2.out",
      });
    } else {
      gsap.to(profileImagePanelRef.current, {
        transform: "translateY(100%)",
        ease: "power2.out",
      });
    }
  }, [profileImagePanel]);

  useGSAP(() => {
    if (followerPanel) {
      gsap.to(followerPanelRef.current, {
        transform: "translateY(0)",
        ease: "power2.out",
      });
    } else {
      gsap.to(followerPanelRef.current, {
        transform: "translateY(100%)",
        ease: "power2.out",
      });
    }
  },[followerPanel])

  useGSAP(() => {
    if (followingPanel) {
      gsap.to(followingPanelRef.current, {
        transform: "translateY(0)",
        ease: "power2.out",
      });
    } else {
      gsap.to(followingPanelRef.current, {
        transform: "translateY(100%)",
        ease: "power2.out",
      });
    }
  },[followingPanel])

  const toLogOutPanelFalse = () => {
    setTimeout(() => {
      setLogutIcon(false);
    }, 4000);
  };

  const logoutUser = async () => {
    try {
      const response = await Axios.get(
        "/users/logout",
        {},
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postDeleteHanlder = async (postId) => {
    try {
      const response = await Axios.post(
        `/posts/${postId}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(deletePost({ postId }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostDeleteToggle = (postId) => {
    if (deletePostTimeout) {
      clearTimeout(deletePostTimeout);
      setdeletePostTimeout(null);
    }

    if (postDeleteIconId === postId) {
      setpostDeleteIconId(null);
    } else {
      setpostDeleteIconId(postId);

      setdeletePostTimeout(
        setTimeout(() => {
          setpostDeleteIconId(null);
        }, 5000)
      );
    }
  };

  return (
    <div className="p-4 w-full relative min-h-screen bg-[#f6f6f6]  ">
      <div className="w-full text-lg mb-4 relative  flex items-center justify-between  ">
        <h1 onClick={navigateHandler} className="text-">
          <i className="ri-arrow-left-line"></i>
        </h1>
        <i
          onClick={() => {
            setLogutIcon(true);
            toLogOutPanelFalse();
          }}
          className="ri-more-2-fill"
        ></i>
        <Link
          onClick={() => {
            logoutUser();
            setLogutIcon(false);
          }}
          className={`text-gray-900 absolute p-2 bg-white ${
            !LogutIcon ? "hidden" : ""
          } rounded-md border-2  right-0 top-4 hover:text-gray-800`}
        >
          {/* <i className="text-xl font-bold ri-logout-box-r-line"></i> */}
          <h1 className="text-sm font-semibold ">Logout</h1>
        </Link>
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
                <i className=" text-white font-lg ri-pencil-line"></i>
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
            <div className="  text-center">
              <h2 onClick={()=>{setfollowerPanel(true)}} className="font-bold text-md ">
                {user?.user?.followers?.length}
              </h2>
              <h1 className="font-md text-sm">Followers</h1>
            </div>
            <div className="text-center">
              <h2 onClick={()=>{setfollowingPanel(true)}} className="font-bold text-md ">
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
        <div className="w-full h-12 flex mt-6  justify-between items-center gap-3 ">
          <div className="w-1/2 h-full  ">
            <Link
              to="/edit-profile"
              className="border-zinc-200 bg-blue-500 text-lg border-2 font-semibold text-white py-2 rounded-[5vh] flex items-center justify-center  p-1"
            >
              Edit Profile
            </Link>
          </div>
          <div className="w-1/2 h-full  ">
            <h1 className="border-zinc-200 bg-zinc-200 border-2 font-semibold text-lg text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1">
              message
            </h1>
          </div>
        </div>
      </div>
      {/* Posts Grid Section */}
      <div className="w-full mt-4  grid grid-cols-2 gap-2 bg-zinc-100">
        {userPosts.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {}}
              className="h-44 w-full mb-2 rounded-md relative overflow-hidden"
            >
              <h1
                onClick={() => {
                  handlePostDeleteToggle(post._id);
                }}
                className="text-lg font-bold text-black top-0 absolute right-0  "
              >
                <i className="ri-more-2-fill"></i>
              </h1>
              {postDeleteIconId === post._id && (
                <Link className="absolute right-0 top-4  bg-zinc-300 p-2 rounded-md ">
                  <i
                    onClick={() => {
                      postDeleteHanlder(post._id);
                    }}
                    className=" text-2xl font-lg ri-delete-bin-6-line"
                  ></i>
                </Link>
              )}

              <div className="bg-gray-300 absolute p-2 h-fit hidden w-fit rounded right-0 top-4 ">
                <h1 className="font-semibold text-zinc-500">
                  {" "}
                  <i className="ri-delete-bin-6-line"></i>{" "}
                </h1>
              </div>
              <img
                src={post.media}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

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

      <div ref={followerPanelRef} className="h-3/4 w-full translate-y-full bg-zinc-200 fixed p-4 bottom-0 left-0 rounded-lg" >
      <FollowerPanel setfollowerPanel={setfollowerPanel} />
       </div>

       <div ref={followingPanelRef} className="h-3/4 w-full translate-y-full bg-zinc-200 fixed p-4 bottom-0 left-0 rounded-lg" >
       <FollowingPanel setfollowingPanel={setfollowingPanel} />
       </div>
    </div>
  );
};

export default UserProfile;
