
export const handleImageUpload = async (file:File) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Global_Thought"); // set in Cloudinary dashboard

    const res = await fetch("https://api.cloudinary.com/v1_1/dsdisn5xi/image/upload", {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    return data.secure_url; // This is the hosted image URL
};
