  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // نامی که در مرحله 1 ساختید (مثلا chat_avatars)
    formData.append("cloud_name", "dtbkjeuls"); // Cloud Name شما

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtbkjeuls/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url; // این همون لینک نهایی عکس آپلود شده است
    } catch (error) {
      console.error("خطا در آپلود عکس:", error);
      return null;
    }
  };
  export default uploadToCloudinary;