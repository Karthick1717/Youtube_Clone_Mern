import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Playlist.css";
import { useNavigate } from "react-router-dom";

function Playlist() {
  const token = useSelector((state) => state.user.token);
  const [video, setVideo] = useState([]);
  const [id, setId] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const  navigate=useNavigate()

  // Function to fetch video data
  const fetchVideos = async () => {
    if (token) {
      try {
        const response = await axios.get("http://localhost:7000/channel/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideo(response.data.response);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
  };

  // Function to fetch playlist ID(s)
  const fetchPlaylistId = async () => {
    if (token) {
      try {
        const response = await axios.get("http://localhost:7000/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setId(response.data.message.Playlist || []);
      } catch (error) {
        console.error("Error fetching playlist ID(s):", error);
      }
    }
  };

  // Fetch data when token changes
  useEffect(() => {
    if (token) {
      fetchVideos();
      fetchPlaylistId();
    }
  }, [token]);


  useEffect(() => {
    if (video.length > 0 && id.length > 0) {
      const filteredVideos = video.filter((vid) => id.includes(vid.id));
      setFiltered(filteredVideos);
    }
  }, [video, id]);

  const handleDelete=async (id)=>{
    if(token){
        const response=await axios.delete(`http://localhost:7000/delete/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(response)
        window.location.reload()
    }
  }

  return (
    <div className="playlist">
      <h1>Playlist</h1>
      {filtered.length > 0 ? (
        filtered.map((item) => (
          <div key={item.id}>
            <img src={item.Thumbnail} onClick={()=>navigate(`/video/${item.id}`)}/>
            <h3>{item.title}</h3>
            <button className="delete" onClick={()=>handleDelete(item.id)}>delele</button>
          </div>
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
}

export default Playlist;
