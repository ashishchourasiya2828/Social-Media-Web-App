import React, { useEffect, useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import Axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../Slices/AuthSlice';

const EditProfile = () => {

    const {user} = useSelector((state) => state.auth || { user: null, error: null, loading: false });

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const [userData, setuserData] = useState({
        username: "",
        bio: "",
        email: "",
        phoneNumber: "",
      });

    useEffect(() => {
        setuserData({
            username: user?.user?.username || "",
            bio: user?.user?.bio|| "",
            email: user?.user?.email|| "",
            phoneNumber: user?.user?.phoneNumber|| "",
            profilePicture: user?.user?.profilePicture|| "",
        })
    
      
    }, [ user])
    
const handleSubmit = async (e) => {
    e.preventDefault()

    try{
        const response = await Axios.put(`/users/${user?.user?._id}/update`,{username: userData.username, bio: userData.bio, email: userData.email, phoneNumber: userData.phoneNumber},{
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })

        if(response.status === 200){

            dispatch(updateProfile({
                username: response.data.username,
                bio: response.data.bio,
                email: response.data.email,
                phoneNumber: response.data.phoneNumber,
            }))
            navigate(-1)
        }
        
        

    }catch(err){
        console.log(err);
        
    }
    
}
    

  return (
    <div className="w-full h-screen bg-gray-100 pt-1 p-4">
        <h1 onClick={()=>{
            navigate(-1)
        }} className="text-xl font-semibold text-gray-800 mb-2 cursor-pointer" >
          <i className="ri-arrow-left-line"></i>
        </h1>
          <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 ">Edit Profile</h1>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-20 w-20 mt-3 bg-gray-200 rounded-full overflow-hidden shadow-md relative">
            <img src={userData.profilePicture} className='h-full w-full object-cover' alt="" />
          
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">UserName</label>
            <input
              type="text"
              required
              onChange={(e)=>{
                setuserData({...userData, username: e.target.value})
              }}
              value={userData.username}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
            <textarea
              placeholder="Write a short bio"
              onChange={(e)=>{
                setuserData({...userData, bio: e.target.value})
              }}
              value={userData.bio}
              rows="3"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              required
              onChange={(e)=>{
                setuserData({...userData, email: e.target.value})
              }}
              value={userData.email}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <input
            onChange={(e)=>{
                setuserData({...userData, phoneNumber: e.target.value})
            }}
            value={userData?.phoneNumber ? userData?.phoneNumber : ""}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition">
            Save Changes
          </button>
        </div>
        </form>

       
      </div>
    </div>
  );
};

export default EditProfile;
