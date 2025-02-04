import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../context/UserContext'
import Axios from '../utils/Axios'
import { useNavigate } from 'react-router-dom'
import Post from '../components/Post'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

const Profile = () => {


   const {token,user,setuser} = useContext(userContext)

   const [loginuser, setloginuser] = useState("")
   const [postData, setpostData] = useState("")
   const [profileImageURL, setprofileImageURL] = useState("")
   const [cloudinaryURL, setcloudinaryURL] = useState("")
   

   const [postPanelOpen, setpostPanelOpen] = useState(false)
   const [profileImagePanel, setprofileImagePanel] = useState(false)

   const profileImagePanelRef = useRef(null)
   const postPanelRef = useRef(null)

   const navigate = useNavigate()


   const navigateHandler = ()=>{
    navigate(-1)
   }

   const profileImage =async (e)=>{
    e.preventDefault()

    const formData = new FormData()
    formData.append('profilePicture',profileImageURL);

    try {
        const response = await Axios.post(
            `/users/${user?._id}/profile-picture`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if(response.status === 201){
            setcloudinaryURL(response.data.imageUrl);
            setprofileImagePanel(false)
            setuser((prevUser) => ({
                ...prevUser,
                profilePicture: response.data.imageUrl
            }));
            
        }

    } catch (err) {
        console.error("Error uploading profile image:", err); // ✅ Proper error handling
    }
    


   }

   const postHandler = (idx)=>{
    setpostData(loginuser.posts[idx])
   }

   useGSAP(()=>{
        if(postPanelOpen){
            gsap.to(postPanelRef.current,{
                transform:"translateY(0)"
            })
        }
        else{
            gsap.to(postPanelRef.current,{
                transform:"translateY(100%)"
            })
        }
   },[postPanelOpen])

   useGSAP(()=>{
    if(profileImagePanel){
        gsap.to(profileImagePanelRef.current,{
            transform:"translateY(0)"
        })
    }
    else{
        gsap.to(profileImagePanelRef.current,{
            transform:"translateY(100%)"
        })
    }
},[profileImagePanel])

   useEffect(() => {

   const getProfile =async ()=>{
        await Axios.get(`/users/${user?._id}/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(response =>{
            // setuser(response.data)
            setloginuser(response.data);
            console.log(response.data);
            
            
            
        } ).catch(err =>{
            console.log(err);
            
        })
   }

   getProfile()

   }, [])

  return (
    <div className='p-4 w-full relative h-fit bg-[#f6f6f6]  ' >
        <div className='w-full text-lg mb-4  flex items-center justify-between  ' >
            <h1 onClick={navigateHandler} className='text-' ><i className="ri-arrow-left-line"></i></h1>
            <h1  ><i className="ri-more-2-fill"></i></h1>
        </div>
        <div className='w-full h-fit pb-6 bg-white py-3 px-2  rounded-lg' >

            <div className='w-full h-[27vw] p-2  flex' >
                <div className='  h-[100%] w-1/4 relative ' >
                    <div className='h-6 w-6 rounded-full bottom-0 right-0 flex items-center justify-center absolute bg-blue-500' >
                        <h1 className='' onClick={()=>{
                            setprofileImagePanel(true)
                        }} >
                        <i className=" text-white font-bold ri-add-line"></i>
                        </h1>
                    </div>
                    <div className='h-[95%] w-full overflow-hidden rounded-full ' >
                        <img className='h-full w-full object-cover' src={user?.profilePicture} alt="" />
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
            <div className='w-1/2 h-full  ' ><h1 className='border-zinc-200 bg-zinc-200 border-2 font-semibold text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1' >Following <i className="  ri-arrow-down-double-line"></i> </h1></div>
            <div className='w-1/2 h-full  ' ><h1 className='border-zinc-200 bg-zinc-200 border-2 font-semibold text-zinc-700 py-2 rounded-[5vh] flex items-center justify-center  p-1' >message</h1></div>

           </div>
        </div>
        {/* Posts Grid Section */}
        <div className='w-full mt-4  grid grid-cols-2 gap-2 bg-gray-100'>
                {loginuser?.posts?.map((post, index) => (

                   <div key={index} onClick={()=>{postHandler(index)
                    setpostPanelOpen(true)
                   }} className='h-44 w-full mb-2 rounded-md  overflow-hidden'>
                        <img src={post.media} alt="Post" className='w-full h-full object-cover' />
                    </div>
                   
                    
                    
                ))}
            </div>

        <div ref={postPanelRef} className='h-screen w-[100%] left-0 py-5 fixed translate-y-full bg-gray-200 px-4 bottom-0 z-8' >
         <Post postData={postData} loginuser={loginuser} setloginuser={setloginuser} setpostPanelOpen={setpostPanelOpen} />
        </div>

        <div ref={profileImagePanelRef} className='h-36 w-full bg-zinc-200 rounded-xl  fixed  px-4 bottom-0 translate-y-full left-0' >
                <h1 onClick={()=>{
                    setprofileImagePanel(false)
                }} className='text-center mb-3 ' ><i className="ri-arrow-down-wide-line"></i></h1>
            <form onSubmit={(e)=>profileImage(e)} >
                <input onChange={(e)=>{
                    setprofileImageURL(e.target.files[0])
                }} className="file:bg-green-500 file:text-white file:px-4 file:outline-none file:border-none mb-3 file:py-2 file:rounded-md file:cursor-pointer hover:file:bg-green-600" type="file" />
                <button className='px-4 py-1 mt-2 rounded-md text-white bg-blue-600' >Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Profile