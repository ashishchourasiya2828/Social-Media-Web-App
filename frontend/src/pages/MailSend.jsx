import React from 'react'
import { Link } from 'react-router-dom'

const MailSend = () => {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Email Sent Successfully
        </h1>
        <p className="text-gray-600 mb-6">
          We have sent you an email with instructions to reset your password.
          Please check your inbox.
        </p>

        {/* Redirect to Login Button */}
        <Link
          to="/"
          className="w-full inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Login
        </Link>
      </div>
    </div>  )
}

export default MailSend