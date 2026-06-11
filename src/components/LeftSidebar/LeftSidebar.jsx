import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
function LeftSidebar() {
  const navigate=useNavigate();
  return (
    <div className="ls">
      <div className="ls-top">
        {/* logo and menu */}
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu ">
            <img src={assets.menu_icon} alt="" />
            <div className="subMenu">
              <p >Edite profile</p>
              <hr />
              <p >Logout</p>

            </div>
          </div>
        </div>
        {/* search bar */}
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here..." />
        </div>
        {/* left sidebar list */}
        <div className="ls-list">
          {Array(16)
            .fill("")
            .map((item, index) => (
                 <div key={index} className="friends">
                <img src={assets.profile_img} alt="" />
                {/* User name */}
                <div>
                  <p>Abolfazle Yaghoobi</p>
                  <span>How are you </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
