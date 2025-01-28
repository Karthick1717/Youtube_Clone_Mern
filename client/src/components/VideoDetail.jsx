import React from 'react';
import {  useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoDetail.css';
import { useNavigate } from 'react-router-dom';
import icon from "../assets/icon.png";
import { useSelector} from 'react-redux';

const VideoDetail = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const token=useSelector((state)=>state.user.token)
  const navigate=useNavigate()
  const [sub,setsub]=useState()
  const [count,setcount]=useState(0)
  useEffect(() => {
    const getVideo = async () => {
      const response = await axios.get('http://localhost:7000/channel/get');
      setVideo(response.data.response);
    };
    getVideo();
  }, []);
  useEffect(() => {
    const getSubs = async () => {
      const response = await axios.get('http://localhost:7000/get',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setsub(response.data.message.Subscribers)
    };
    getSubs();
  }, [token]);

  useEffect(() => {
    if (video.length > 0) {
      const filteredVideos = video.filter((vid) => vid.id !== parseInt(videoId));
      const shuffledVideos = [...filteredVideos].sort(() => 0.5 - Math.random());
      setRelatedVideos(shuffledVideos.slice(0, 5));
    }
  }, [video, videoId]);

  const selectedVideo = video.find((video) => video.id === parseInt(videoId));
  console.log(selectedVideo)
  const handleClick=(id)=>{
         navigate(`/video/${id}`)
  }
  async function handleClicked(id){
    if(token){
    const response=await axios.post("http://localhost:7000/playlist",{id},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
     
  }

  const handleSubscribe=async(channel)=>{
    if(token){
    const response=await axios.post("http://localhost:7000/channel/subscribe",{channel},{
      headers:{
        Authorization:`Baerer ${token}`
      }
    })
    console.log(response)
    
  }
}
const handleLike = async (id) => {
  console.log("Clicked")
  if (!token) {
      console.error("No authentication token available.");
      return;
  }
  try {

      const response = await axios.post(
          "http://localhost:7000/channel/likes",
          { vid:id },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      setcount(response.data.Likes);
      window.location.reload()
  } catch (error) {
      console.error("An error occurred while handling like:", error);
  }
};


  return (
    <>
      <div className="video-detail-page">
        <div className="video-detail-container">
          <video
            src={selectedVideo?.video}
            controls
            autoPlay
            className="video-player"
          />
          <h2>{selectedVideo?.title}</h2>
          <p>{selectedVideo?.description}</p>
          <div className="channel-info">
        
          <img
              src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
              alt="Channel"
            onClick={()=>navigate(`channel/${selectedVideo?.channel}`)}/>
            <img src={icon} alt="icon" onClick={()=>{handleLike(selectedVideo?.id)}}></img>
            <p>{selectedVideo?.Likes}</p>
           <h4 className="channel" onClick={()=>navigate(`channel/${selectedVideo?.channel}`)}>{selectedVideo?.channel}</h4>
            <button className="Add-button" onClick={()=>handleClicked(selectedVideo?.id)}>Add to Playlist</button>
            <button className="subscribe-button" onClick={()=>handleSubscribe(selectedVideo?.channel)}>{selectedVideo?.Subscribers}  Subscribers</button>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="related-videos">
          <h3>Related Videos</h3>
          {relatedVideos.map((video) => (
            <div key={video.id}className="related-video">
              <img src={video.Thumbnail} alt={video.title} className="video-thumbnail"  onClick={()=>handleClick(video.id)} />
              <h4>{video.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
