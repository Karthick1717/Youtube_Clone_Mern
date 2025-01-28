const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    channel:{
        type:String
    },
    userId:{
        type:String
    }
})

const subModel=mongoose.model("subscribe",schema)

module.exports={subModel}