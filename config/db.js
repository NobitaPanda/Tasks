const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Check karein ki MONGO_URI aapki .env file mein sahi hai
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;