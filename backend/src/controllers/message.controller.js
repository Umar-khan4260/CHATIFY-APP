import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming you have user authentication and the user ID is available in req.user
    const filteredUserId =await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    res.status(200).json(filteredUserId);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};


export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const {id:userToChatId}= req.params;
    const message = await Message.find({
      $or:[
        {senderId:myId,receiverId:userToChatId},
        {senderId:userToChatId,receiverId:myId}
      ]
    })
    res.status(200).json(message);

  } catch (err) {
    res.status(500).json({ message: "server error" });
  } 

};

export const sendMessage = async (req,res)=>{
  try{
    const {text,image} = req.body;
    const {id:receiverId}=req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      imageUrl
    })
    await newMessage.save();
    res.status(201).json(newMessage);

  }catch(err){
    res.status(500).json({ message: "server error" });
  }
};

export const getChatPartners = async (req,res)=>{
  try{
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or:[
        {senderId:loggedInUserId},
        {receiverId:loggedInUserId}
      ]
    })
    
    const chatPartnerIds = [...new Set(
      messages.map(msg =>
        msg.senderId.toString() === loggedInUserId.toString()
        ?msg.receiverId.toString()
        :msg.senderId.toString()
      )
    )];

    const chatPartners = await User.find({_id:{$in:chatPartnerIds}}).select("-password")

    res.status(200).json(chatPartners);

  }catch(err){
    res.status(500).json({ message: "server error" });
  }
}