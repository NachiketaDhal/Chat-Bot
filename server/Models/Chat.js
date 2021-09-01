const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    classType: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
