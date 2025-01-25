import React from 'react'
import UserRegister from './pages/UserRegister'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import ForgotpasswordEmail from './pages/Forgot-passwordEmail'
import ResetPassword from './pages/ResetPassword'
import MailSend from './pages/MailSend'
import UserProtector from './components/UserProtector'

const App = () => {




  return (
    <div>

      <Routes>
        <Route path="/" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} />

        <Route path='/home' element={
          <UserProtector>
            <Home/>
          </UserProtector> } />

        <Route path='/forgot-password' element={<ForgotpasswordEmail/>} />
        <Route path="/reset-password/Mail-Send" element={<MailSend/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
      </Routes>



    </div>
  )
}

export default App