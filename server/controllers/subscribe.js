const { channelModel } = require("../models/channel");
const { subModel } = require("../models/subscribe");

const Subscribers = async (req, res) => {
    const { channel } = req.body;
    const id = req.user.id;

    try {
        const existingSubscription = await subModel.findOne({ channel, userId:id });
        if (existingSubscription) {
            return res.status(400).send("User already exists");
        }

        const channelDoc = await channelModel.find({ channel });
        if (!channelDoc) {
            return res.status(404).send("Channel not found");
        }
        for (const doc of channelDoc) {
            doc.Subscribers += 1;
            await doc.save(); 
        }
        console.log(channelDoc)

        await new subModel({ channel, userId:id }).save();

        res.status(200).send(channelDoc);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports = { Subscribers };
