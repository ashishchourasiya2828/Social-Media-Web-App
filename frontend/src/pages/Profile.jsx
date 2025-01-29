import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/UserContext'
import Axios from '../utils/Axios'

const Profile = () => {

   const {token,user} = useContext(userContext)
    const [loginuser, setloginuser] = useState("")
   useEffect(() => {

   const getProfile =async ()=>{
        await Axios.get(`/users/${user?._id}/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response =>{
            // setuser(response.data)
            setloginuser(response.data);
            
            
        } ).catch(err =>{
            console.log(err);
            
        })
   }

   getProfile()

   }, [])
   
console.log(loginuser);

  return (
    <div className='p-4 w-full h-screen bg-[#f6f6f6] ' >
        <div className='w-full text-lg mb-4   flex items-center justify-between  left-0' >
            <h1 className='text-' ><i className="ri-arrow-left-line"></i></h1>
            <h1  ><i className="ri-more-2-fill"></i></h1>
        </div>
        <div className='w-full h-fit pb-6 bg-white py-3 px-2  rounded-lg' >

            <div className='w-full h-[27vw] p-2  flex' >
                <div className='  h-[100%] w-1/4' >
                    <div className='h-[95%] w-full overflow-hidden rounded-full ' >
                        <img className='h-full w-full object-cover' src="https://plus.unsplash.com/premium_photo-1736749650482-53c9f4622813?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                </div>
                <div className='w-3/4 h-[100%] flex items-center gap-7 justify-end ' >
                    <div className='text-center  ' >
                        <h2 className='font-bold text-md ' > {user?.posts?.length}</h2>
                        <h1 className='font-md text-sm' >Posts</h1>
                    </div>
                    <div className='text-center' >
                        <h2 className='font-bold text-md ' >{user?.followers?.length}</h2>
                        <h1 className='font-md text-sm' >Followers</h1>
                    </div>
                    <div className='text-center' >
                        <h2 className='font-bold text-md ' >{user?.following?.length}</h2>
                        <h1 className='font-md text-sm' >Following</h1>
                    </div>
                </div>
            </div>
            <div>
            <h1 className='text-md font-md text-lg tracking-tight mb-1 mt-2 ' >{user?.username}</h1>
            <h2 className='text-sm font-md tracking-tight text-gray-400' >{user?.bio
                
                }</h2>

            </div>
           <div className='w-full h-12 flex mt-6 justify-between items-center gap-3 ' >
            <div className='w-1/2 h-full  ' ><h1 className='border-zinc-200 border-2 font-semibold text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1' >Following <i className="  ri-arrow-down-double-line"></i> </h1></div>
            <div className='w-1/2 h-full  ' ><h1 className='border-zinc-200 border-2 font-semibold text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1' >message</h1></div>

           </div>
        </div>
        {/* Posts Grid Section */}
        <div className='w-full mt-4  grid grid-cols-2 gap-2 bg-gray-100'>
                {loginuser?.posts?.map((post, index) => (

                   <div key={index}  className='h-44 w-full mb-2 rounded-md  overflow-hidden'>
                        <img src={post.media} alt="Post" className='w-full h-full object-cover' />
                    </div>
                   
                    
                    
                ))}
            </div>
    </div>
  )
}

export default Profile