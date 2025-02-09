const channel=require("../controllers/channel")
const express=require("express")
const {verifyToken}=require("../middleware/auth")
const channelrouter=express.Router()


channelrouter.post("/post",verifyToken,channel.upload)
channelrouter.get("/get",channel.get)



module.exports={channelrouter}