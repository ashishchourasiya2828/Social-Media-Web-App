import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {

    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [error, seterror] = useState("")
    const [success, setsuccess] = useState("")

    const navigate = useNavigate()
    const {token} = useParams()

    const passwordHandler =async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            seterror("Password do not match");
            return;
        }

        try{
        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/reset-password/${token}`,{password})
            
        if(response.status === 200){
            setsuccess("password is being reset successfully")
            setInterval(() => {
                navigate('/')
            }, 2000);
        }
        

        }catch(err){
            seterror("cannot reset password");
        }

        seterror("")





      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-xl">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
              Reset Your Password
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Enter your new password below to reset it.
            </p>
    
            {/* Form */}
            <form className="space-y-4" onSubmit={passwordHandler}>
              {/* New Password Input */}
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={(e)=>{
                    setpassword(e.target.value)
                  }}
                />
              </div>
    
              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e)=>{
                    setconfirmPassword(e.target.value)
                  }}
                />
              </div>
                  
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Reset Password
              </button>
            </form>
    
            {/* Back to Login Link */}
            <p className="text-sm text-gray-600 text-center mt-4">
              Remembered your password?{' '}
              <Link to="/" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      );
}

export default ResetPassword