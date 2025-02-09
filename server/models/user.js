const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const schema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    channel:{
        type:String,
        default:"Not yet Created"
    },
    subscribers:[],
    videos:[],
    Playlist:[{type:String}]
})
schema.pre("save",async function (next){
         if(!this.isModified("password")){
            return next()
         }
         const salt=await bcrypt.genSalt(10)
         this.password=await bcrypt.hash(this.password,salt)
         return next() 
})
const userModel=mongoose.model("User",schema)

module.exports={userModel}