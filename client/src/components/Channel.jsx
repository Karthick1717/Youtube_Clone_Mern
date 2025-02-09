import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Channel() {
  const [channel, setChannel] = useState("");
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const token = useSelector((state) => state.user.token);

  // Cloudinary Upload Function
  const uploadToCloudinary = async (file, preset) => {
    if (!file) {
      console.error("No file selected for upload.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dxi88zu70/upload`, // Replace with your Cloudinary Cloud Name
        formData
      );
      return res.data.secure_url; // Return uploaded file URL
    } catch (error) {
      console.error("Cloudinary Upload Failed:", error?.response?.data || error);
      return null;
    }
  };

  // Handle Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You need to be logged in to upload.");
      return;
    }

    if (!video || !thumbnail) {
      setMessage("Please select both a video and a thumbnail.");
      return;
    }

    try {
      setUploading(true);
      setMessage("Uploading files...");

      // Upload Video
      const uploadedVideoUrl = await uploadToCloudinary(video, "youtube");
      if (!uploadedVideoUrl) {
        setMessage("Video upload failed. Please try again.");
        setUploading(false);
        return;
      }
      setVideoUrl(uploadedVideoUrl);

      // Upload Thumbnail
      const uploadedThumbnailUrl = await uploadToCloudinary(thumbnail, "thumbnail");
      if (!uploadedThumbnailUrl) {
        setMessage("Thumbnail upload failed. Please try again.");
        setUploading(false);
        return;
      }
      setThumbnailUrl(uploadedThumbnailUrl);

      // Store Video Details in Database
      await axios.post(
        "https://youtube-steel-chi.vercel.app/channel/post",
        {
          channel,
          title,
          description,
          video: uploadedVideoUrl,
          Thumbnail: uploadedThumbnailUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Upload successful!");
      setUploading(false);
      
      // Reset form fields
      setChannel("");
      setTitle("");
      setVideo(null);
      setThumbnail(null);
      setDescription("");
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        required
      />

      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="video">Video</label>
      <input
        type="file"
        id="video"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        required
      />

      <label htmlFor="thumbnail">Thumbnail</label>
      <input
        type="file"
        id="thumbnail"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p>{message}</p>}

    </form>
  );
}
