import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Channel.css'; 
import { useSelector } from 'react-redux';

export default function Channel() {
    const [channel, setchannel] = useState("");
    const [title, settitle] = useState("");
    const [video, setvideo] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [description, setdescription] = useState("");
    const token=useSelector((state)=>state.user.token)

    const handleSubmit = async (e) => {
        e.preventDefault();
          if(token==null){
            return null
          }
        const response = await axios.post("http://localhost:7000/channel/post", { channel, title, video, Thumbnail, description },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="channel">Channel</label>
            <input type="text" id="channel" onChange={(e) => setchannel(e.target.value)} required />
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={(e) => settitle(e.target.value)} required />
            <label htmlFor="video">Video</label>
            <input type="text" id="video" onChange={(e) => setvideo(e.target.value)} required />
            <label htmlFor="Thumbnail">Thumbnail</label>
            <input type="text" id="Thumbnail" onChange={(e) => setThumbnail(e.target.value)} required/>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={(e) => setdescription(e.target.value)} required/>
            <button type="submit">Upload</button>
        </form>
    );
}
