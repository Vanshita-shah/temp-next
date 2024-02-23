import mongoose from "mongoose";

// Function to connect to MongoDB database
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Got an error while connecting");
  }
};
