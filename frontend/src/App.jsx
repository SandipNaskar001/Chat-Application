import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import {Loader}from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore";
const App = () => {
const{authUser,checkAuth,isCheckingAuth,onlineUsers}= useAuthStore()
const{theme}=useThemeStore()
console.log({onlineUsers})
useEffect(()=>{
  checkAuth()
},[checkAuth])
console.log({authUser})
if(isCheckingAuth && !authUser){
  return(
  <div className="flex items-center justify-center h-screen">
    <Loader className='size-10 animate-spin'></Loader>
  </div>
  )
}
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<Homepage/>:<Navigate to='/login'/>}></Route>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to='/'/>}></Route>

        <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to='/'/>}></Route>

        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to='/login'/>}/>
        <Route path="/settings" element={<Settings/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
