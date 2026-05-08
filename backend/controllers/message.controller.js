import { getReciverSockeyId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedinId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedinId } }).select(
      "-password",
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error to get users", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("error to get messages", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save()

 const reciverSocketId=getReciverSockeyId(receiverId)
 if(reciverSocketId){
  io.to(reciverSocketId).emit("newMessage",newMessage)
 }

        res.status(200).json({ newMessage });
  } catch (error) {
    console.log("error to get users", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
