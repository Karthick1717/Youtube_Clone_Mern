const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const {userrouter}=require("./routes/user")
const {channelrouter}=require("./routes/channel")
const app=express()

app.use(cors())
app.use(express.json())

const connect=async ()=>{
    try{
    await mongoose.connect("mongodb+srv://karthickk2022:Karthick2004@reciepe.vc4jidx.mongodb.net/Project?retryWrites=true&w=majority&appName=reciepe")
    console.log("Database connected")
    }
    catch(err){
    console.log(err)
    }
}
connect()
app.use("/",userrouter)
app.use("/channel",channelrouter)
const port=7000 || process.env.PORT
app.listen(port,()=>{
    console.log(`${port} connected`)
}) 