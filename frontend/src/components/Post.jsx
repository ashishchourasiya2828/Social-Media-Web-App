import React, { useContext, useRef, useState } from 'react'
import { userContext } from '../context/UserContext'
import Axios from '../utils/Axios'

const Post = ({postData,setpostPanelOpen,loginuser,setloginuser}) => {

  const {user,token}=useContext(userContext)
  const [isRed, setisRed] = useState(false)
  const redHeartRef = useRef(null)
  console.log(postData);
  

  const isLike = async()=>{

    
  
    const response = await Axios.post(`/posts/${postData?._id}/like`,{},{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })

    if(response.status===200){
      if(response.data.message === "liked"){
        redHeartRef.current.className = "text-2xl text-red-500 ri-heart-fill" 
      }
      else{
        redHeartRef.current.className = "text-2xl ri-heart-line" 
      }
    }
    

    if(isRed){
      redHeartRef.current.className="text-2xl "
      setisRed(false)
    }
    else{
     redHeartRef.current.className = "text-2xl " 
     setisRed(true);
    }

  }


  return (
    <div>
   <h1 onClick={()=>{
         setpostPanelOpen(false)
     }} className='text-lg mb-3' ><i  className="ri-arrow-left-line"></i></h1>

         <div className='h-72 w-full rounded-lg bg-blue-500 overflow-hidden' >

                    <img className='h-full w-full object-cover' src={postData?.media} alt="" />
                </div>
                <div className='flex mt-5 px-2 itmes-center gap-10 ' >
                    <div className='flex items-center gap-2' >
                    <h2 className='flex items-center  gap-1' ><i onClick={()=>{isLike()}} ref={redHeartRef} className={`text-2xl ${postData?.likes?.includes(postData?.userId) ? "text-red-500 ri-heart-fill" : "ri-heart-line"}`}></i></h2>
                    <h1>{postData?.likes?.length}</h1>
                    </div>
                    <div className='flex items-center gap-2' >
                    <h1 className='flex items-center gap-1' ><i className=" text-2xl ri-chat-3-line"></i></h1>
                    <h2>{postData?.comments?.length}</h2>
                    </div>
                </div>
                <h2 className='mt-2 ml-2' >{user?.username}</h2>
                <h2 className='text-zinc-500 ml-2 text-sm mt-1 ' >{postData?.content}</h2>
                
    </div>
  )
}

export default Post