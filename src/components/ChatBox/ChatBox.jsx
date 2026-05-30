import "./ChatBox.css";
import assets from "../../assets/assets";
function ChatBox() {
    return ( 
        <>
        {/* User profile */}
          <div className="chat-box">
            <div className="chat-user">
                <img src={assets.profile_img} alt="" />
                <p>Abolfazle <img className="dot" src={assets.green_dot} alt="" /></p>
                <img src={assets.help_icon} className="help" alt="" />
            </div>

            {/* chat  message */}

                <div className="chat-msg">
                    {/* message sender */}
                    <div className="s-msg">
                      <img src={assets.pic1}
                      className="msg-img" alt="" />
                            <div>
                                <img src={assets.profile_img} alt="" />
                                <p>2:30 PM</p>
                            </div>
                    </div>
                    <div className="s-msg">
                            <p className="msg">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            <div>
                                <img src={assets.profile_img} alt="" />
                                <p>2:30 PM</p>
                            </div>
                    </div>
                    {/* resive message */}
                    <div className="r-msg">
                            <p className="msg">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            <div>
                                <img src={assets.profile_img} alt="" />
                                <p>2:30 PM</p>
                            </div>
                    </div>


                </div>







            {/* unput chat */}
            <div className="chat-input">
                <input type="text" placeholder="send a message" />
                <input type="file" name="" id="image"  accept="image/png,image/jpeg" hidden/>
                <label htmlFor="image">
                    {/* choose icon gallery */}
                    <img src={assets.gallery_icon} alt="" />
                </label>
                {/* send icon */}
                <img src={assets.send_button} alt="" />

            </div>
          </div>
        </>
     );
     
}

export default ChatBox;