import mongoose from "mongoose";

let isConnected: boolean = false; // Variable to track the connection status

export const connectToMongoDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("Missing MongoDB URL");

  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error: any) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
