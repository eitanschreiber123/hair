import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = { useNewUrlParser: true, useUnifiedTopology: true };

let isConnected = false; // Track connection status

async function connectDB() {
  if (isConnected) {
    console.log("⚡ Using existing Mongoose connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, options);
    isConnected = true;
    console.log("✅ Mongoose connected to MongoDB");
  } catch (error) {
    console.error("❌ Mongoose connection error:", error);
    process.exit(1);
  }
}

export default connectDB;
