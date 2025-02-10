import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import { followUnfollowUser } from "../Slices/AuthSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);
  const [userProfile, setuserProfile] = useState("");
  const { user } = useSelector((state) => state.auth);

  const isFollowing = user?.user?.following?.some((user) => user._id === id);

  useEffect(() => {
    if (id === user?.user?._id) {
      navigate("/profile");
    } else {
      async function profile() {
        try {
          const response = await Axios.get(`/users/${id}/profile`);

          if (response.status === 200) {
            setuserProfile(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
      profile();
      setIsFollowed(isFollowing);
    }
  }, [id, isFollowing]);


  const followUser = async () => {
    try {
      const response = await Axios.post(
        `/users/${id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsFollowed((prev) => !prev);
        dispatch(followUnfollowUser({userId:id,username:userProfile.username,profilePicture:userProfile.profilePicture}));
        setuserProfile((prev) => {prev.followers.push(user); return prev});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 w-full relative min-h-screen bg-[#f6f6f6]  ">
      <div className="w-full text-lg mb-4   flex items-center justify-between  ">
        <h1
          onClick={() => {
            navigate(-1);
          }}
          className="text-"
        >
          <i className="ri-arrow-left-line"></i>
        </h1>
        <h1>
          <i className="ri-more-2-fill"></i>
        </h1>
      </div>
      <div className="w-full h-fit pb-6 bg-white py-3 px-2  rounded-lg">
        <div className="w-full h-[27vw] p-2  flex">
          <div className="  h-[100%] w-1/4 relative ">
            <div className="h-[95%] w-full overflow-hidden rounded-full ">
              <img
                className="h-full w-full object-cover"
                src={userProfile?.profilePicture}
                alt=""
              />
            </div>
          </div>
          <div className="w-3/4 h-[100%] flex items-center gap-7 justify-end ">
            <div className="text-center  ">
              <h2 className="font-bold text-md ">
                {" "}
                {userProfile?.posts?.length}
              </h2>
              <h1 className="font-md text-sm">Posts</h1>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-md ">
                {userProfile?.followers?.length}
              </h2>
              <h1 className="font-md text-sm">Followers</h1>
            </div>
            <div className="text-center">
              <h2 className="font-bold text-md ">
                {userProfile?.following?.length}
              </h2>
              <h1 className="font-md text-sm">Following</h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-md font-md text-lg tracking-tight mb-1 mt-2 ">
            {userProfile?.username}
          </h1>
          <h2 className="text-sm font-md tracking-tight text-gray-400">
            {userProfile?.bio}
          </h2>
        </div>
        <div className="w-full h-12 flex mt-6 justify-between items-center gap-3 ">
          <div className="w-1/2 h-full  ">
            <h1
              onClick={() => {
                followUser();
              }}
              className="border-zinc-200 bg-blue-500 border-2 font-semibold text-white py-3 rounded-[5vh] flex items-center justify-center  p-1"
            >
                 {isFollowed ? "Unfollow" : "Follow"}
            </h1>
          </div>
          <div className="w-1/2 h-full  ">
            <h1 className="border-zinc-200 bg-zinc-200 border-2 font-semibold text-zinc-700 py-3 rounded-[5vh] flex items-center justify-center  p-1">
              message
            </h1>
          </div>
        </div>
      </div>
      {/* Posts Grid Section */}
      <div className="w-full mt-4  grid grid-cols-2 gap-2 bg-zinc-100">
        {userProfile?.posts?.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {}}
              className="h-44 w-full mb-2 rounded-md  overflow-hidden"
            >
              <img
                src={post.media}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
