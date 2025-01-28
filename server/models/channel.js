const mongoose=require("mongoose")

const Schema=new mongoose.Schema({
    channel:{
       type:String
    },
    title:{
        type:String
    },
    Thumbnail:{
        type:String
    },
    video:{
        type:String
    },
    description:{
        type:String
    },
    Likes:{
        type:Number,
        default:0
    },
    Subscribers:{
        type:Number,
        default:0
    },
})
const channelModel=mongoose.model("channel",Schema)
module.exports={channelModel}