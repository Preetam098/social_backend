const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://prajapatpreetam88:Synetal123@cluster0.aluujxj.mongodb.net/social"
    );
   
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
