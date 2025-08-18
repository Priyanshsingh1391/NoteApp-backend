// db.js


const mongoose = require("mongoose");
require("dotenv").config();


const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = connectToMongoDB;
