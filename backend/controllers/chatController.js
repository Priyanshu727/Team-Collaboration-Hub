const Chat = require('../models/messageModel'); // Import the Chat model
const User = require('../models/userModel'); // Assuming you are using User for sender information

// Send message controller
exports.sendMessage = async (req, res) => {
  try {
    const { content, chatRoom } = req.body; // Ensure these fields match the model

    // Check for missing fields
    if (!content || !chatRoom) {
      return res.status(400).json({ message: "Content and chat room are required" });
    }

    const newMessage = new Chat({
      sender: req.user._id,  // Sender is the authenticated user
      content,
      chatRoom,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
