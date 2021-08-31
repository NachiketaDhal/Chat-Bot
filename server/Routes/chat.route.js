const express = require("express");

const {
  getAllChats,
  deleteAllChats,
  getAggrigatedChats,
} = require("../Controllers/chat.controller");

const router = express.Router();

router.get("/chats", getAllChats);
router.get("/chats/aggregated", getAggrigatedChats);
router.delete("/chats", deleteAllChats);

module.exports = router;
