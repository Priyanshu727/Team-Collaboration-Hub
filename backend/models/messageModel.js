const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,  // Make sure to use 'content' here, not 'message'
    required: [true, 'Message content is required'],
  },
  chatRoom: {
    type: String,  // Use 'chatRoom' for the room
    required: [true, 'Chat room is required'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
