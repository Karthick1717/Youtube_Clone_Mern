const express=require("express")
const user=require("../controllers/user")
const {verifyToken}=require("../middleware/auth")
const userrouter=express.Router()

userrouter.post("/register",user.register)
userrouter.post("/login",user.login)
userrouter.get("/get",verifyToken,user.get)
userrouter.post("/password",verifyToken,user.password)
userrouter.post("/playlist",verifyToken,user.playlist)
userrouter.delete("/delete/:id",verifyToken,user.deletePlaylist)

module.exports={userrouter}