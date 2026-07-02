import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
function LeftSidebar() {
  const navigate = useNavigate();
  const {
    userData,
    chatData,
    messageId,
    setMessageId,

    chatUser,
    setChatUser,
    chatVisible,
    setChatVisible,
  } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const inputSearch = useRef(null);
  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);

        const currentUserId = userData?.id;
        if (!querySnap.empty && querySnap.docs[0].id !== currentUserId) {
          console.log("querySnap", querySnap.docs[0]);
          let userExist = false;

          chatData.some((user) => {
            if (user.rid === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });
          if (!userExist) {
            setUser(querySnap.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addChat = async () => {
    const messagesRef = collection(db, "messages");
    const chatRef = collection(db, "chats");
    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        message: [],
      });
      const senderId = userData?.id;
      const receiverId = user?.id;

      if (!senderId || !receiverId) return;

      await updateDoc(doc(chatRef, receiverId), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rid: senderId,
          updatedAt: Date.now(),
          messageSeen: false,
        }),
      });
      await updateDoc(doc(chatRef, userData.id), {
        chatData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rid: user.id,
          updatedAt: Date.now(),
          messageSeen: false,
        }),
      });
      toast.success("Chat added successfully");
      inputSearch.current.value = "";
      setShowSearch(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const setChat = async (item) => {
    try {
      setChatUser(item);

      setMessageId(item.messageId);

      setChatVisible(true);
    } catch (error) {
      console.log('error', error)

    }
  };
  return (
    <div className={`ls ${chatVisible ? "hidden" : ""}`}>
      <div className="ls-top">
        {/* logo and menu */}
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu ">
            <img src={assets.menu_icon} alt="" />
            <div className="subMenu">
              <p onClick={() => navigate("/profile")}>Edite profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        {/* search bar */}
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            onChange={inputHandler}
            ref={inputSearch}
            type="text"
            placeholder="Search here..."
          />
          <button onClick={addChat} className="addToChatList">
            Add
          </button>
        </div>
        {/* left sidebar list */}
        <div className="ls-list">
          {showSearch && user ? (
            <div className="friends add-user">
              <img src={user.avatar} alt="" />
              <p>{user.name}</p>
            </div>
          ) : (
            chatData.map((item, index) => {
              // console.log('item', item)

              return (
                <div
                  onClick={() => setChat(item)}
                  key={index}
                  className={`friends ${item.messageSeen || item.messageId === messageId ? "" : "border"}`}
                >
                  <img src={item.userData.avatar} alt="" />
                  {/* User name */}
                  <div>
                    <p>{item.userData.name}</p>
                    <span>{item.lastMessage}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
