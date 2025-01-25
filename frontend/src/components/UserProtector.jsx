import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom';

const UserProtector = ({children}) => {
  const navigate = useNavigate();
  const {user} = useContext(userContext);
  
  useEffect(() => {
    console.log();
    
 const abc = async ()=>{
  if(!user){
    
    return navigate('/')
  }
 }

 abc();

   
  }, [user])
  
  return (
    <div>
        {children }
    </div>
  )
}

export default UserProtector