import React from 'react'
import { useSelector } from 'react-redux'

const FollowerPanel = ({setfollowerPanel}) => {
    const {user} = useSelector(state=>state.auth)
  return (
    <div>
        <div className="w-full  text-center " >
        <i onClick={()=>{setfollowerPanel(false)}}
         className=" text-2xl  font-lg ri-arrow-down-wide-fill"></i> 
      </div>     
            
            <h1 className="font-semibold text-xl mb-3 text-zinc-700" >Followers</h1>
            <div className="h-[2px] mb-4 w-full bg-zinc-800" ></div>
            <div className="w-full " >
              {user?.user?.followers?.length > 0 ? user?.user?.followers?.map((follower,key)=>{
                return <div key={key} className="w-full h-fit p-2 flex border-2 border-zinc-800 rounded-lg mt-2 items-center gap-3  " >
                <div className="h-12 w-12 rounded-full overflow-hidden " >
                  <img src={follower?.profilePicture} className="h-full w-full object-cover" alt="" />
                </div>
                <div className=" ml-2" >
                  <h1 className="font-semibold text-lg" >{follower?.username}</h1>
                  <h2 className="text-sm font-semibold text-gray-500" >{follower?.bio}</h2>
                </div>
              </div>
              }) : <h1 className="text-center text-gray-400 font-semibold mt-3" >No followers found</h1>}
            </div>
    </div>
  )
}

export default FollowerPanel