import { useState } from "react";
import assets from "../../assets/assets";
import "./ProfileUpdate.css";
function ProfileUpdate() {
  const [image,setImage]=useState(false);
  return (
    <>
      <div className="profile">
        <div className="profile-container">
          <form>
            <h3>Profile Details</h3>
            <label htmlFor="avatar">
              <input
              onChange={(e)=>setImage(e.target.files[0 ])}
                type="file"
                name=""
                id="avatar"
                accept=".png,.jpg,.jpeg"
                hidden
              />
              <img src={image ? URL.createObjectURL(image): assets.avatar_icon} alt="" />
              upload profile image
            </label>
            <input type="text" placeholder="Youre name" required />
            <textarea name="" placeholder="write profile bio" id=""></textarea>
            <button type="submit">save</button>
          </form>
          <img className="profile-pic" src={image?URL.createObjectURL(image):assets.logo_icon} alt="" />



        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;
