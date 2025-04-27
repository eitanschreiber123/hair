import connectDB from "../../../../lib/mongodb";
import mongoose from "mongoose";
import {ActiveUserType, CartItemType, CartSubType, CartType, OrderType, SubType, OtherOrderType,UserType} from '../../../models'
  
  // 🔁 PUT: Update an existing user by _id
  export async function PUT(req) {
    try {
      await connectDB();
      const body = await req.json();
      const { _id, customerData } = body;
  
      if (!_id || !customerData) {
        return Response.json({ error: "Missing _id or customerData for update" }, { status: 400 });
      }
  
      const updatedUser = await UserType.findByIdAndUpdate(
        _id,
        { $set: { customerData } },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return Response.json({ error: "User not found" }, { status: 404 });
      }
  
      return Response.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Error updating customer data:", error);
      return Response.json({ error: "Failed to update customer data", details: error.message }, { status: 500 });
    }
  }
  