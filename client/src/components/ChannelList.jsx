import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./ChannelList.css"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function ChannelList() {
    const {channel}=useParams()
    const [videos,setvideos]=useState([])
    const token=useSelector((state)=>state.user.token)
    const navigate=useNavigate()
    async function fetch(){
        if(token){
            const response=await axios.post("https://youtube-steel-chi.vercel.app/channel/getChannel",{channel},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setvideos(response.data.response)
            console.log(videos)
        }
    }
     
    useEffect(()=>{
         fetch()
    },[token])
  return (
     <>
      <h1 className="h1">{channel}</h1>
      {
        videos.map((item)=>{
            return(
                <div className="channel-container" onClick={()=>navigate(`/video/${item.id}`)}>
                    <img src={item.Thumbnail}/>
                    <p>{item.title}</p>
                </div>
            )
        })
      }
     </>
  )
}

export default ChannelList