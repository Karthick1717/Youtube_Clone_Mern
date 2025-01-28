const mongoose=require("mongoose")

const video=new mongoose.Schema({
    videoId:{
        type:String
    },
    userId:{
        type:String
    }
})

const videoModel=mongoose.model("video",video)

module.exports={videoModel}