import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import { updateComments } from '../Slices/PostSlice'
import { updateCommentsData, updateCommentsReply } from '../Slices/CommentSlice'

const Comments = ({setcommentPanel}) => {

  
  
  const commentInputRef = useRef(null)
  const replyInputRef = useRef(null)
  const [comment, setcomment] = useState("")
  const [replyComment, setreplyComment] = useState("")
  const [commentInputPanel, setcommentInputPanel] = useState(true)
  const [getCommentId, setgetCommentId] = useState("")
  const [replyCommentInput, setreplyCommentInput] = useState(false)
  const {posts} = useSelector(state=> state.posts )
  const {user} = useSelector((state)=>state.auth)
  const {comments,postId} = useSelector(state => state.comments)
  
  const dispatch = useDispatch()
  

  
  const commentSubmitHandler = async(e)=>{
    e.preventDefault()
    
      try{

        const response = await Axios.post(`/posts/${postId}/comment`,{content:comment,parentCommentId:null},{
          headers:{
            Authorization:`Bearer ${user?.token}`
          }
        })

        if(response.status === 201){
          
          dispatch(updateCommentsData({postId,data:response.data}))
        }

      }catch(err){
        console.log(err)
      }


    setcomment("")
  }
  
  
  const replyCommentSubmitHandler = async (e)=>{
    e.preventDefault();
    try{
      

      const response = await Axios.post(`/posts/${postId}/comment`,{content:replyComment,parentCommentId:getCommentId},{
        headers:{
          Authorization:`Bearer ${user?.token}`
        }
      })

      if(response.status === 201){
          dispatch(updateCommentsReply({data:response.data}));
          setreplyComment("")
          
      }  

      }catch(err){
      console.log(err);
      
    }
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

  useGSAP(()=>{
    if(replyCommentInput){
      gsap.to(replyInputRef.current,{
        transform:"translateY(0)"
      })
    }
    else{
      gsap.to(replyInputRef.current,{
        transform:"translateY(100%)"
      })
    }    

  },[replyCommentInput])
  
  // return (
  //   <div className="  ">
  //      <div className="w-full text-center " >
  //       <i onClick={()=>{
  //         setcommentPanel(false)
  //       }}
  //        className="ri-arrow-down-wide-fill"></i> 
  //     </div>

  //     <h1 className='font-semibold text-xl text-gray-700 mb-4 text-center ' >Comments </h1>
      
  //     <div className='h-[3px] rounded-lg w-full bg-zinc-300 mb-4' ></div>

  //     <div className='w-full overflow-y-auto  ' >

  //             {
  //               commentPanelData?.map((comment,idx)=>{
  //                 return  <div key={idx} className="h-fit w-full  border-2 bg-white mb-2 p-3 rounded-lg flex items-start " >
  //                 <div className="h-12 w-[15%] rounded-full  overflow-hidden  " >
  //                   <img  className="h-full w-full bg-red-400 object-cover " alt="" />
  //                 </div>
  //                 <div className='w-[79.5%] px-2 pt-2 -mt-2' >
  //                   <h1 className='text-sm font-semibold' ></h1>
  //                   <p className='text-xs font-semibold text-zinc-600 ' > </p>
  //                 <div className='text-zinc-400 font-semibold text-xs mt-2' > <h1 onClick={()=>{setcommentInputPanel(true)}} >Reply</h1> </div>
  //                 </div>
    
  //               </div> 
  //               })
  //             }
  //            {/* <h1 className='text-center text-gray-400 font-semibold mt-3' >No comments found</h1 */}
            

  //     </div>
        
  //       {/* comment submit */}
  //       <div ref={commentInputRef} className='w-full border-2 h-fit bg-white  rounded-lg absolute left-0 bottom-0' >
  //       <div className="w-full text-center mt-1 " >
  //       <i onClick={()=>{
  //         setcommentInputPanel(false)
  //       }}
  //        className="ri-arrow-down-wide-fill"></i> 
  //     </div>
  //       <form onSubmit={(e)=>{handleCommentSubmit(e)}} className=' w-full p-2 pb-4 px-4 flex gap-4 '  >
        
  //       <div className="h-12 w-12 rounded-full  overflow-hidden  " >
  //         <img src={user?.user?.profilePicture} className="h-full w-full  object-cover " alt="" />
  //          </div>         
        
  //        <input 
  //        onChange={(e)=>{
  //         setcomment(e.target.value)
  //        }}
  //        value={comment}
  //        type="text" name='comment' placeholder='add comments' className='p-2 w-[85%] border-2 rounded-[30px] px-6' />
  //       </form>
  //       </div>
       
        
  //       </div>
  // )

  

    return (
      <div  className="max-w-3xl mx-auto px-4  py-2">
        <div className='w-full  text-center' >
        <i onClick={()=>setcommentPanel(false)} className="ri-arrow-down-wide-line"></i>
        </div>
        <h2 onClick={()=>{
          setcommentInputPanel(true);
          setreplyCommentInput(false);
        }} className="text-xl font-bold mb-4">Comments</h2>
        <div className='w-full h-[2px] bg-zinc-600 rounded-lg mb-3' ></div>
        <div className=" h-[56vh] overflow-y-auto space-y-4 mb-2">
          {comments?.map((comment) => (
            <div key={comment._id}  className="flex flex-col">
              {/* Main Comment */}
              <div className="flex  justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg flex gap-2  border-2 w-fit shadow-md">
                <div className=' h-full w-20  ' >
                  <div className='w-12 h-12 overflow-hidden rounded-full' >
                  <img className='h-full w-full object-cover' src={comment.userData.profilePicture} alt="" />

                  </div>
                </div>
                 <div className='w-full' >
                 <p className="font-semibold">{comment.userData.username}</p>
                  <p className=' text-sm text-zinc-600 font-semibold' >{comment.content}</p>
                  <button
                    className="text-zinc-400 font-semibold text-sm "
                    onClick={() => {
                      setcommentInputPanel(false)
                      setreplyCommentInput(true)
                      setgetCommentId(comment._id)
                    }
                      
                    }
                  >
                    Reply
                  </button>
                 </div>
                </div>
              </div>
  
              {/* Replies */}
              {comment.replies?.length > 0 && (
                <div className="ml-8 mt-2  space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex  justify-end">
                      <div className="bg-zinc-200 flex px-3 py-2 rounded-lg w-fit  gap-2 shadow-md">
                      <div className='h-9 w-12 rounded-full overflow-hidden ' >
                        <img className='h-full -w-full object-cover' src={reply.userData.profilePicture} alt="" />
                      </div>
                      <div className='w-full   ' >

                        <p className="font-semibold "> {reply.userData?.username}</p>
                        <p className='font-semibold text-sm text-gray-500' >{reply.content}</p>
                        
                      </div>
                      
                      </div>
                    </div>
                  ))}
                </div>
              )}
  
              {/* Reply Input */}
              {/* { (
                <div className="ml-8 mt-2 flex">
                  <input
                    type="text"
                    className="border p-2 rounded-md flex-1"
                    placeholder="Write a reply..."
                  />
                  <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                    Send
                  </button>
                </div>
              )} */}
            </div>
          ))}
        </div>

            <form ref={commentInputRef} onSubmit={(e)=>{commentSubmitHandler(e)}} className='fixed bottom-0 rounded-md left-0 p-2 flex justify-between  w-full bg-zinc-400 ' >
              <div className='h-12 rounded-full w-12  overflow-hidden ' >
                <img className='h-full w-full object-cover' src={user?.user?.profilePicture} alt="" />
              </div>
              <input type="text" value={comment} onChange={(e)=>{setcomment(e.target.value)}} className='px-4 text- py-1 font-semibold rounded-lg'  placeholder='enter your comment' />
              <button className='px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold' > Send</button>
            </form>

            <form ref={replyInputRef} onSubmit={(e)=>{replyCommentSubmitHandler(e)}} className='fixed bottom-0 rounded-md left-0 p-2 translate-y-full flex justify-between  w-full bg-zinc-400 ' >
              <div className='h-12 rounded-full w-12  overflow-hidden ' >
                <img className='h-full w-full object-cover' src={user?.user?.profilePicture} alt="" />
              </div>
              <input type="text" onChange={(e)=>{setreplyComment(e.target.value)}} value={replyComment} className='px-4 text- py-1 font-semibold rounded-lg' placeholder='enter comments reply' />
              <button className='px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold' > Reply</button>
            </form>

      </div>
    );
  };
  



export default Comments

