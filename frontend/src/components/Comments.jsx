import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import { updateComments } from '../Slices/PostSlice'

const Comments = ({setcommentPanel,commentPanelData}) => {
  
  const commentInputRef = useRef(null)
  const [comment, setcomment] = useState("")
  const [commentInputPanel, setcommentInputPanel] = useState(true)
  const {posts} = useSelector(state=> state.posts )
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  
  const post = posts.find((post) => post._id === commentPanelData);
  

  const handleCommentSubmit = (e)=>{
    e.preventDefault()
    
    const newComment = async ()=>{
      try{

        const response = await Axios.post(`/posts/${post?._id}/comment`,{content:comment},{
          headers:{
            Authorization:`Bearer ${user?.token}`
          }
        })

        if(response.status === 201){
          dispatch(updateComments({postId:post?._id,comment:response.data}))
          // setcommentPanel(false)
        }

      }catch(err){
        console.log(err)
      }
    }

    newComment()

    setcomment("")
  }
  
  useGSAP(()=>{
    if(commentInputPanel){
      gsap.to(commentInputRef.current,{
        transform:"translateY(0)"
      })
    }
    else{
      gsap.to(commentInputRef.current,{
        transform:"translateY(100%)"
      })
    }    

  },[commentInputPanel])
  
  return (
    <div className="  ">
       <div className="w-full text-center " >
        <i onClick={()=>{
          setcommentPanel(false)
        }}
         className="ri-arrow-down-wide-fill"></i> 
      </div>

      <h1 className='font-semibold text-xl text-gray-700 mb-4 text-center ' >Comments </h1>
      
      <div className='h-[3px] rounded-lg w-full bg-zinc-300 mb-4' ></div>

      <div className='w-full overflow-y-auto  ' >

            {post?.comments?.length> 0 ? post?.comments?.map((comment,key)=>{
              return   <div key={key} className="h-fit w-full  border-2 bg-white mb-2 p-3 rounded-lg flex items-start " >
              <div className="h-12 w-[15%] rounded-full  overflow-hidden  " >
                <img src={comment?.userId?.profilePicture} className="h-full w-full bg-red-400 object-cover " alt="" />
              </div>
              <div className='w-[79.5%] px-2 pt-2 -mt-2' >
                <h1 className='text-sm font-semibold' >{comment?.userId?.username}</h1>
                <p className='text-xs font-semibold text-zinc-600 ' > {comment?.content}</p>
              <div className='text-zinc-400 font-semibold text-xs mt-2' > <h1 onClick={()=>{setcommentInputPanel(true)}} >Reply</h1> </div>
              </div>


            </div> 
            }) : <h1 className='text-center text-gray-400 font-semibold mt-3' >No comments found</h1>}
            

      </div>
        
        {/* comment submit */}
        <div ref={commentInputRef} className='w-full border-2 h-fit bg-white  rounded-lg absolute left-0 bottom-0' >
        <div className="w-full text-center mt-1 " >
        <i onClick={()=>{
          setcommentInputPanel(false)
        }}
         className="ri-arrow-down-wide-fill"></i> 
      </div>
        <form onSubmit={(e)=>{handleCommentSubmit(e)}} className=' w-full p-2 pb-4 px-4 flex gap-4 '  >
        
        <div className="h-12 w-12 rounded-full  overflow-hidden  " >
          <img src={user?.user?.profilePicture} className="h-full w-full  object-cover " alt="" />
           </div>         
        
         <input 
         onChange={(e)=>{
          setcomment(e.target.value)
         }}
         value={comment}
         type="text" name='comment' placeholder='add comments' className='p-2 w-[85%] border-2 rounded-[30px] px-6' />
        </form>
        </div>
       
        
        </div>
  )
}

export default Comments