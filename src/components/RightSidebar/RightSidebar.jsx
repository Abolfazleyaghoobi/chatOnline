import "./RightSidebar.css";
import assets from "../../assets/assets"
import { logout } from "../../config/firebase";
function RightSidebar() {
    return (  <>
            <div className="rs">
                <div className="rs-profile">
                    <img src={assets.profile_img} alt="" />
                    <h3>Abolfazle <img src={assets.green_dot} className="dot" alt="" /></h3>
                    <p>Lorem ipsum dolor sit amet.</p>

                </div>
                <hr />
                <div className="rs-media">
                    <p>media</p>
                    <div>
                        <img src={assets.pic1} alt="" />
                        <img src={assets.pic2} alt="" />
                        <img src={assets.pic3} alt="" />
                        <img src={assets.pic4} alt="" />
                        <img src={assets.pic1} alt="" />
                        <img src={assets.pic1} alt="" />
                    </div>
                </div>
                <button onClick={()=>logout()}>logout</button>
            </div>
    </>);
}
export default RightSidebar;