import React from "react";
import { Route, Routes } from "react-router-dom";

import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import ForgotpasswordEmail from "./pages/Forgot-passwordEmail";
import ResetPassword from "./pages/ResetPassword";
import MailSend from "./pages/MailSend";
import UserProtector from "./components/UserProtector";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";
import BottomNavBar from "./components/BottomNavBar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="page-content">{children}</div>
      <BottomNavBar/>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        <Route element={<UserProtector />}>
          <Route path="/home" element={
            <Layout>
              <Home />

            </Layout>
            } />
          <Route path="/profile" element={
             <Layout>
             <UserProfile />

           </Layout>
        } />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-post" element={
            <Layout>
              <CreatePost />

            </Layout>
            } />
        </Route>

        <Route path="/forgot-password" element={<ForgotpasswordEmail />} />
        <Route path="/reset-password/Mail-Send" element={<MailSend />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );

 
};

export default App;
