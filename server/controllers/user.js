const bcrypt=require("bcrypt")
const {userModel}=require("../models/user")
const jwt=require("jsonwebtoken")


const register=async(req,res)=>{
    try{
    const {name,email,password}=req.body
    const check=await userModel.findOne({email})
    if(check){
        return res.status(400).json({message:"user already exists"})
    }
    const response=new userModel({name,email,password})
    response.save()
    res.status(201).json({message:"user created successfully"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:"Error"})
    }
}
const password = async (req, res) => {
  const id = req.user.id;
  const { password } = req.body;

  try {
      const user = await userModel.findOne({ _id: id });
      if (!user) {
          return res.status(400).json({ message: "User does not exist" });
      }

      user.password = password;
      await user.save(); 

      res.status(201).json({ message: "Password updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};


const login=async(req,res)=>{
    try{
      const {email,password}=req.body
      const response=await userModel.findOne({email})  
      if(!response) {
         return res.status(400).send("user not found")
      }
      bcrypt.compare(password,response.password,(err,decoder)=>{
        if(decoder){
     const token=jwt.sign({id:response._id,email:response.email},"secret_key",{expiresIn:"8h"})
      return res.status(200).json({token:token})
        }
        else{
            return res.status(400).send("Invalid password")
        }
     }
    )
} 
     catch(err){
        console.log(err)
        res.status(500).json({message:"Error"})
     }
}
      const get=async(req,res)=>{
        const id=req.user.id
        const response=await userModel.findOne({_id:id})
        console.log(req.user)
        res.status(200).json({message:response})
      }
      const playlist = async (req, res) => {
        try {
          const { id } = req.body;
          const Id = req.user.id;
          const user = await userModel.findOne({ _id:Id});
        if(user){
          if (!user.Playlist) {
            user.Playlist = [];
          }
          
      
          if (!user.Playlist.includes(id)) {
            user.Playlist.push(id);
          }
          await user.save();
          res.status(200).json({ message: 'Playlist updated successfully' });
        } 
        else{
            return res.json({message:"User Not Found"})
        }
    }
    catch (error) {
          console.error('Error updating playlist:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
    
      };
      const deletePlaylist=async (req,res)=>{
            const vid=req.params.id
            const id=req.user.id
            const user=await userModel.findOne({_id:id})
            if(user.Playlist.length>0){
                 const filtered=user.Playlist.filter((item)=>item!==Number(vid))
                 console.log(filtered)
                 user.Playlist=filtered
                 await user.save()
                 res.json({message:user})
            }
            else{
              return res.json({message:"No videos in Playlist"})
            }
      }
      
module.exports={register,login,get,password,playlist,deletePlaylist}