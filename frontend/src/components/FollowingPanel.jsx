import React from 'react'
import { useSelector } from 'react-redux'

const FollowingPanel = ({setfollowingPanel}) => {
    const { user} = useSelector(state=>state.auth)
  return (
<div>
        <div className="w-full  text-center " >
        <i onClick={()=>{setfollowingPanel(false)}}
         className=" text-2xl  font-lg ri-arrow-down-wide-fill"></i> 
      </div>     
            
            <h1 className="font-semibold text-xl mb-3 text-zinc-700" >Followings</h1>
            <div className="h-[2px] mb-4 w-full bg-zinc-800" ></div>
            <div className="w-full " >
              {user?.user?.following?.length > 0 ? user?.user?.following?.map((following,key)=>{
                return <div key={key} className="w-full h-fit p-2 flex border-2 border-zinc-800 rounded-lg mt-2 items-center gap-3  " >
                <div className="h-12 w-12 rounded-full overflow-hidden " >
                  <img src={following?.profilePicture} className="h-full w-full object-cover" alt="" />
                </div>
                <div className=" ml-2" >
                  <h1 className="font-semibold text-lg" >{following?.username}</h1>
                  <h2 className="text-sm font-semibold text-gray-500" >{following?.bio}</h2>
                </div>
              </div>
              }) : <h1 className="text-center text-gray-400 font-semibold mt-3" >No following found</h1>}
            </div>
    </div>  )
}

export default FollowingPanel