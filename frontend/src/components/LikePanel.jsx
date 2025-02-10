import React from 'react'

const LikePanel = ({setlikePanelOpen,likedUserData}) => {
    
  return (
    <div>
          <div className="w-full  mb-3" ><i onClick={()=>{
                        setlikePanelOpen(false)
                    }} className="ri-arrow-left-line"></i>
                        </div>
                        
        {likedUserData?.likes?.map((user,key)=>{
            
            return <div key={key}> 
                
                <div className="h-16 w-full border-2 border-zinc-300 bg-white mb-2 p-3 rounded-lg flex items-center " >
                  <div className="h-12 rounded-full w-12 overflow-hidden " >
                    <img src={user?.profilePicture} className="h-full w-full object-cover " alt="" />
                  </div>
                  <h1 className="ml-4 font-semibold" >{user?.username}</h1>
                </div>
            </div>
        })}
    </div>
  )
}

export default LikePanel