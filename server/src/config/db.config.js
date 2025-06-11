import mongoose from "mongoose";
import globalConfig from "./index.js";

const connectDB = async () => {
  try {
    await mongoose.connect(globalConfig.mongodbUri);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
