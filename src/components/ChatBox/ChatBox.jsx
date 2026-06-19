import "./ChatBox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { reverse } from "firebase/firestore/pipelines";
import uploadToCloudinary from "../../lib/uploadImage";
function ChatBox() {
  const { userData, messageId, chatUser, messages, setMessages ,   chatVisible,setChatVisible} =
  useContext(AppContext);
  // console.log('chatVisible', chatVisible)
  
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
          }),
        );

        setInput(""); // خالی کردن input بعد از ارسال
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendImage = async (e) => {
    try {
      const fileImage = e.target.files[0];
      const fileUrl = await uploadToCloudinary(fileImage);
      if (fileUrl && messageId) {
        await updateDoc(doc(db, "messages", messageId), {
          message: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createAt: new Date(),
          }),
        });
      }
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
            userChatData.chatData[chatIndex].lastMessage = "Image";
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId == userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        }),
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const convertTimestamp = (timestamp) => {
    // console.log('timestamp', timestamp)
    let date = timestamp.toDate();
    const hours = date.getHours();
    const minute = date.getMinutes();
    if (hours > 12) {
      return hours - 12 + ":" + minute + " PM";
    } else {
      return hours - 12 + ":" + minute + "AM";
    }
  };
  useEffect(() => {
    if (messageId) {
      const unSub = onSnapshot(doc(db, "messages", messageId), (res) => {
        // console.log('unSub', unSub)
        if (res.data() && res.data().message) {
          setMessages(res.data().message.reverse());
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
      <div className={`chat-box ${chatVisible ?"":"hidden"}`}>
        <div className="chat-user">
          <img src={chatUser.userData.avatar} alt="" />
          <p>
            {chatUser.userData.name}{" "}
         
            {Date.now() - chatUser.userData.lastSeen <= 70000 ?    <img className="dot" src={assets.green_dot} alt="" />: null}


          </p>
          <img src={assets.help_icon} className="help" alt="" />
          <img onClick={()=>setChatVisible(false)} src={assets.arrow_icon} className="arrow" alt="" />
        </div>

        {/* chat  message */}

        <div className="chat-msg">
          {messages.map((msg, index) => {
            // console.log('msg', msg)

            return (
              <div
                key={index}
                className={msg.sId === userData.id ? "s-msg" : "r-msg"}
              >
                {msg["image"] ? (
                  <img className="imageee" src={msg.image} alt="" />
                ) : (
                  <p className="msg">{msg.text}</p>
                )}

                <div>
                  <img
                    src={
                      msg.sId === userData.id
                        ? userData.avatar
                        : chatUser.userData.avatar
                    }
                    alt=""
                  />
                  <p>{convertTimestamp(msg.createAt)}</p>
                </div>
              </div>
            );
          })}
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
            onChange={sendImage}
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
    <div  className={`chat-welcome `}>
      <img src={assets.logo_icon} alt="" />
      <p>Welcome to your chat!</p>
    </div>
  );
}

export default ChatBox;
