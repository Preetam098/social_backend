const users = require("../model/userSchema");

const profile = async (req, res) => {
  console.log(req.body);
  const { userId } = req.user;
  const data = await users.findById(userId);
  console.log(data)

  if (!data) {
    res.status(404);
    throw new Error("data not found");
  }
  res.status(200).json(data);
};

module.exports = { profile };
