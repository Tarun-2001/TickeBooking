const mongoose = require("mongoose");

const dbConnection = async (mongoURL) => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Mongoodb connected successfully");
  } catch (error) {
    console.log("Error while connecting database");
  }
};

module.exports = { dbConnection };
