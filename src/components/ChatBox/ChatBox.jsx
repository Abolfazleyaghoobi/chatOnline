import "./ChatBox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { reverse } from "firebase/firestore/pipelines";
function ChatBox() {
  const { userData, messageId, chatUser, messages, setMessages } =
  useContext(AppContext);
  
  const [input, setInput] = useState("");
const sendMessage = async () => {
  try {
    if (input && messageId) {
      await updateDoc(doc(db, "messages", messageId), {
        message: arrayUnion({
          sId: userData.id,
          text: input,
          createAt: new Date(),
        }),
      });

      const UserIDs = [chatUser.rid, userData.id];

      await Promise.all(
        UserIDs.map(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatSnapshot = await getDoc(userChatsRef);
          if (userChatSnapshot.exists()) {
            const userChatData = userChatSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId === messageId,
            );
            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId == userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        })
      );

      setInput(""); // خالی کردن input بعد از ارسال
    }
  } catch (error) {
    console.log("error", error);
  }
};
  useEffect(() => {
    if (messageId) {
      const unSub = onSnapshot(doc(db, "messages", messageId), (res) => {
        // console.log('unSub', unSub)
        if (res.data() && res.data().message) {
          setMessages(res.data().message.reverse())
          console.log(res.data().message.reverse());
        }
      });
      return () => {
        unSub();
      };
    }
  }, [messageId]);
  return chatUser ? (
    <>
      {/* User profile */}
      <div className="chat-box">
        <div className="chat-user">
          <img src={chatUser.userData.avatar} alt="" />
          <p>
            {chatUser.userData.name}{" "}
            <img className="dot" src={assets.green_dot} alt="" />
          </p>
          <img src={assets.help_icon} className="help" alt="" />
        </div>

        {/* chat  message */}

        <div className="chat-msg">
          {/* message sender */}
          <div className="s-msg">
            <img src={assets.pic1} className="msg-img" alt="" />
            <div>
              <img src={assets.profile_img} alt="" />
              <p>2:30 PM</p>
            </div>
          </div>
          <div className="s-msg">
            <p className="msg">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>
            <div>
              <img src={assets.profile_img} alt="" />
              <p>2:30 PM</p>
            </div>
          </div>
          {/* resive message */}
          <div className="r-msg">
            <p className="msg">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>
            <div>
              <img src={assets.profile_img} alt="" />
              <p>2:30 PM</p>
            </div>
          </div>
        </div>

        {/* unput chat */}
        <div className="chat-input">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="send a message"
          />
          <input
            type="file"
            name=""
            id="image"
            accept="image/png,image/jpeg"
            hidden
          />
          <label htmlFor="image">
            {/* choose icon gallery */}
            <img src={assets.gallery_icon} alt="" />
          </label>
          {/* send icon */}
          <img onClick={sendMessage} src={assets.send_button} alt="" />
        </div>
      </div>
    </>
  ) : (
    <div className="chat-welcome">
      <img src={assets.logo_icon} alt="" />
      <p>Welcome to your chat!</p>
    </div>
  );
}

export default ChatBox;
