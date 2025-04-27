import connectDB from "../../../../lib/mongodb";
import mongoose from "mongoose";
import {ActiveUserType, CartItemType, CartSubType, CartType, OrderType, SubType, OtherOrderType,UserType} from '../../../models'

export async function GET(req, res) {
  try {
    await connectDB(); // Ensure Mongoose connection

    // Fetch all documents from the 'usertypes' collection using Mongoose
    const users = await UserType.find({}).lean(); 

    return Response.json(users.length ? users : [], { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
export async function POST(req) {
    try {
      await connectDB();
      const body = await req.json();
  
      const newUser = new UserType(body);
      const savedUser = await newUser.save();
  
      return Response.json(savedUser, { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return Response.json({ error: "Failed to create user", details: error.message }, { status: 500 });
    }
  }
