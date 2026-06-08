// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,doc,setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUh_JC5t1eryhIBuvbBjcYM1ehvSwgqCg",
  authDomain: "chat-online-abl.firebaseapp.com",
  projectId: "chat-online-abl",
  storageBucket: "chat-online-abl.firebasestorage.app",
  messagingSenderId: "179780882924",
  appId: "1:179780882924:web:2b01edc72cd313c815b0c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db=getFirestore(app);
const  sinup=async (username,email,password)=>{
  try {
      const res= await createUserWithEmailAndPassword(auth,email,password);
      tost.success("Account created successfully")

      const user=res.user;
      await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"ali is very fun",
        lastSeen:Date.now()
      })
      await setDoc(doc(db,"chats",user.uid),{
        chatData:[]
      })
  } catch (error) {
      console.error(error)
         toast.error(error.code.split("/")[1].split("-").join(" "))

  }
}
const login=async (email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);

  } catch (error) {
    console.error(error)
    toast.error(error.code.split("/")[1].split("-").join(" "))
  }
}
const logout=async ()=>{ 
  try {
    await signOut(auth);
    
  } catch (error) {
    console.error(error)
    toast.error(error.code.split("/")[1].split("-").join(" "))
    
  }
}
export {sinup,login,logout,auth,db};