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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />

        <Route element={<UserProtector />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotpasswordEmail />} />
        <Route path="/reset-password/Mail-Send" element={<MailSend />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
