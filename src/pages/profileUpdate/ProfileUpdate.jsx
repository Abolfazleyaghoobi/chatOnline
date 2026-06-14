import { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./ProfileUpdate.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadToCloudinary from "../../lib/uploadImage";
import { AppContext } from "../../context/AppContext";
function ProfileUpdate() {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [bio, setBio] = useState("");
  const [prevImage, setPrevImage] = useState("");

  const { setUserData } = useContext(AppContext);
  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Upload profile Picture");
      }
      const docRef = doc(db, "users", uid);
      if (image) {
        const imageUrl = await uploadToCloudinary(image);
        setPrevImage(imageUrl);
        await updateDoc(docRef, {
          avatar: imageUrl,
          name: name,
          bio: bio,
        });

        toast.success("Profile updated successfully");
      } else {
        await updateDoc(docRef, {
          name: name,
          bio: bio,
        });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <div className="profile">
        <div className="profile-container">
          <form onSubmit={profileUpdate}>
            <h3>Profile Details</h3>
            <label htmlFor="avatar">
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name=""
                id="avatar"
                accept=".png,.jpg,.jpeg"
                hidden
              />
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : prevImage
                      ? prevImage
                      : assets.logo_icon
                }
                alt=""
              />
              upload profile image
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Youre name"
              required
            />
            <textarea
              name=""
              placeholder="write profile bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              id=""
            ></textarea>
            <button type="submit">save</button>
          </form>
          <img
            className="profile-pic"
            src={
              image
                ? URL.createObjectURL(image)
                : prevImage
                  ? prevImage
                  : assets.logo_icon
            }
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default ProfileUpdate;

// import { useEffect, useState } from "react";
// import assets from "../../assets/assets";
// import "./ProfileUpdate.css";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../../config/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore"; // updateDoc اضافه شد
// import { useNavigate } from "react-router-dom";

// function ProfileUpdate() {
//   const [image, setImage] = useState(false);
//   const [name, setName] = useState("");
//   const [uid, setUid] = useState("");
//   const navigate=useNavigate();
//   const [bio, setBio] = useState("");
//   const [loading, setLoading] = useState(false); // برای نمایش حالت در حال آپلود

//   useEffect(() => {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUid(user.uid);
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef); // باگ: کلمه await اینجا جا افتاده بود

//         if (docSnap.data().name) {
//           const data = docSnap.data();
//           if (data.name) setName(data.name);
//           if (data.bio) setBio(data.bio); // باگ: قبلاً اینجا نوشته بودید setName که اصلاح شد
//         }
//       }else{
//           navigate("/")
//       }
//     });
//   }, []);

//   // تابع آپلود عکس در کلودینری
//   // ________________موشکافی تاتع  عکس یا اپلود عکس_______

//   // تابع ذخیره اطلاعات فرم
//   // _________موشکافی تابغ ذخیره عکس_________
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault(); // جلوگیری از رفرش شدن صفحه
//     setLoading(true);

//     try {
//       let imageUrl = ""; // اگر عکسی آپلود نشود، لینک خالی می‌ماند یا می‌توانید لینک قبلی را نگه دارید

//       // اگر کاربر عکس جدیدی انتخاب کرده بود
//       if (image) {
//         imageUrl = await uploadToCloudinary(image);
//       }

//       // آپدیت کردن اطلاعات در فایربیس
//       const docRef = doc(db, "users", uid);
//       await updateDoc(docRef, {
//         name: name,
//         bio: bio,
//         ...(imageUrl && { avatarUrl: imageUrl }) // اگر عکس جدید بود، لینک عکس هم آپدیت بشه
//       });

//       alert("پروفایل با موفقیت آپدیت شد!");
//     } catch (error) {
//       console.error("خطا در بروزرسانی پروفایل:", error);
//       alert("مشکلی پیش آمد.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="profile">
//         <div className="profile-container">
//           <form onSubmit={handleProfileUpdate}> {/* متصل کردن تابع سابمیت به فرم */}
//             <h3>Profile Details</h3>
//             <label htmlFor="avatar">
//               <input
//                 onChange={(e) => setImage(e.target.files[0])}
//                 type="file"
//                 name=""
//                 id="avatar"
//                 accept=".png,.jpg,.jpeg"
//                 hidden
//               />
//               <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="Avatar Preview" />
//               upload profile image
//             </label>

//             <input
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               type="text"
//               placeholder="Your name"
//               required
//             />

//             <textarea
//               name=""
//               placeholder="write profile bio"
//               onChange={(e) => setBio(e.target.value)}
//               value={bio}
//               id=""
//             ></textarea>

//             <button type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </form>

//           <img className="profile-pic" src={image ? URL.createObjectURL(image) : assets.logo_icon} alt="Profile Pic" />
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfileUpdate;
