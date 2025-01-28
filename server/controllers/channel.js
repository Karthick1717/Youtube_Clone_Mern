const {channelModel}=require("../models/channel")
const {videoModel}=require("../models/video")

const upload=async(req,res)=>{
    const {channel,title,video,Thumbnail,description}=req.body
    const saved=new channelModel({channel,title,video,Thumbnail,description})
    await saved.save()
    res.json({saved})
}
const get=async(req,res)=>{
    const response=await channelModel.find({})
    res.json({response})
}
const getchannel=async(req,res)=>{
    const {channel}=req.body
    const response=await channelModel.find({channel})
    res.json({response})
}
const increment=async (req,res)=>{
    const {vid}=req.body
    console.log(vid)
    const vnid=Number(vid)
    const id=req.user.id
    const response=await videoModel.findOne({userId:id,videoId:vnid})

    if(response){
        return res.send("already Liked")
    }
    const channel=await channelModel.findOne({id:vnid})
        if(!channel.Likes){
             channel.Likes=0
        }
   const liked=new videoModel({userId:id,videoId:vnid})
   await liked.save()
        channel.Likes+=1
        await channel.save()
    return res.json(channel)
}
module.exports={upload,get,getchannel,increment}