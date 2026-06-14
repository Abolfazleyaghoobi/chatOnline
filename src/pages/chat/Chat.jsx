import { useContext, useEffect, useState } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { AppContext } from "../../context/AppContext";
import "./Chat.css";
function Chat() {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  },[chatData,userData])
  return (
    <div className="chat">
      {loading ? (
        <p className="loading">loading..</p>
      ) : (
        <div className="chat_container">
          <LeftSidebar />
          <ChatBox />
          <RightSidebar />
        </div>
      )}
    </div>
  );
}

export default Chat;
