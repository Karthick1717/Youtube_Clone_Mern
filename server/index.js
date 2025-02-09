const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const {userrouter}=require("./routes/user")
const {channelrouter}=require("./routes/channel")
const app=express()

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(express.json())

const connect=async ()=>{
    try{
    await mongoose.connect("mongodb+srv://karthick:Karthick@cluster0.bn3vm7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database connected")
    }
    catch(err){
    console.log(err)
    }
}
connect()
app.get("/check",(req,res)=>{
    res.send("Update")
})
app.use("/",userrouter)
app.use("/channel",channelrouter)
const port=7000 || process.env.PORT
app.listen(port,()=>{
    console.log(`${port} connected`)
}) 