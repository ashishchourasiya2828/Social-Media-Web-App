import React, { createContext, useState } from 'react'

export const userContext = createContext()

const UserContext = ({children}) => {

    const [user, setuser] = useState(null)

    const [token, settoken] = useState("")

console.log(user);
    
  return (
    <userContext.Provider value={{user,setuser,settoken,token}} >
        {children}
    </userContext.Provider>
  )
}

export default UserContext