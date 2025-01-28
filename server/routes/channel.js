const channel=require("../controllers/channel")
const express=require("express")
const subscribe =require("../controllers/subscribe")
const {verifyToken}=require("../middleware/auth")

const channelrouter=express.Router()


channelrouter.post("/post",verifyToken,channel.upload)
channelrouter.get("/get",channel.get)
channelrouter.post("/getChannel",verifyToken,channel.getchannel)
channelrouter.post("/likes",verifyToken,channel.increment)
channelrouter.post("/subscribe",verifyToken,subscribe.Subscribers)


module.exports={channelrouter}