import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/slice';

function Home() {
  const [video, setVideo] = useState([]);
  const [filteredVideo, setFilteredVideo] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const search = useSelector((state) => state.user.search) || ""; // Default to empty string if search is null

  async function getVideo() {
    try {
      const response = await axios.get("http://localhost:7000/channel/get", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVideo(response.data.response);
      console.log(response)
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      dispatch(setToken(localToken));
    }
    // Fetch videos when token is set
    if (token) {
      getVideo();
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (video.length > 0) {
      const filtered = video.filter((item) =>
        (item.title || "").toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVideo(filtered);
    }
  }, [video, search]);

  const handleThumbnailClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="home-container">
      <h2>Recommended Videos</h2>
      <div className="video-list">
        {filteredVideo.map((videoItem) => (
          <div
            key={videoItem.id}
            className="video-card"
            onClick={() => handleThumbnailClick(videoItem.id)}
          >
            <img
              src={videoItem.Thumbnail}
              alt={videoItem.title}
              className="video-thumbnail"
            />
            <div className="video-info">
              <h3>{videoItem.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
