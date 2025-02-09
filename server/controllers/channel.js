const { v4: uuidv4 } = require("uuid"); // Import the UUID generator
const { channelModel } = require("../models/channel");
const {userModel}=require("../models/user")

const upload = async (req, res) => {
  try {
    const uuid = uuidv4();
    const { channel, title, video, Thumbnail, description } = req.body;
    const email=req.user.email
    console.log(email)
    const response=await userModel.findOne({email})
    response.channel=channel
    response.videos=[...response.videos,{id:uuid}]
    await response.save()

    // Save the data with the UUID
    const saved = new channelModel({
      channel,
      title,
      video,
      Thumbnail,
      description,
      id:uuid, // Include the UUID in the document
    });

    await saved.save();

    res.json({ success: true, saved });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, error: "Failed to upload data" });
  }
};



const get=async(req,res)=>{
    const response=await channelModel.find({})
    res.json({response})
}


module.exports={upload,get}