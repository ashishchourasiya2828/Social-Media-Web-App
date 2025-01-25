import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

const ForgotpasswordEmail = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    const forgotPasswordHandler =async (e) => {
      e.preventDefault(); 
    
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/reset-password`,{email})

     if(response.status === 200)
     {
        navigate('/reset-password/Mail-Send')
     }


    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl mt-1 font-bold text-gray-700">Social Media App</h1>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={forgotPasswordHandler} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Back to Login Redirect */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>

  )
}

export default ForgotpasswordEmail