import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";
  import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const navigate=useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        navigate("/chat");

      }else{
          navigate("/");
      }
    })
  },[])
  return (
    <>
    <ToastContainer/>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/profile" element={<ProfileUpdate/>}/>
     </Routes>
    </>
  );
}

export default App;
