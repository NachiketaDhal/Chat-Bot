const Chat = require("../Models/Chat");

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      status: "Success",
      chats,
    });
  } catch (err) {
    res.status(404).json({
      status: `Failed ${err.message}`,
    });
  }
};

exports.getAggrigatedChats = async (req, res) => {
  try {
    const aggregatedChats = await Chat.aggregate([
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          chats: {
            $push: {
              message: "$message",
              name: "$name",
              classType: "$classType",
              createdAt: "$createdAt",
            },
          },
        },
      },
    ]);
    res.status(200).json({
      status: "Success",
      aggregatedChats,
    });
  } catch (err) {
    res.status(404).json({
      status: `Failed ${err.message}`,
    });
  }
};

exports.deleteAllChats = async (req, res) => {
  try {
    await Chat.deleteMany();
    res.status(200).json({
      status: "Successfully deleted",
    });
  } catch (err) {
    res.status(404).json({
      status: `Failed ${err.message}`,
    });
  }
};
