import connectDB from "../../../../lib/mongodb";
import mongoose from "mongoose";
import {ActiveUserType, CartItemType, CartSubType, CartType, OrderType, SubType, OtherOrderType,UserType} from '../../../models'

export async function POST(req) {
    try {
      await connectDB();
      const body = await req.json();
  
      const newOrder = new OrderType(body);
      const savedUser = await newOrder.save();
  
      return Response.json(savedUser, { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return Response.json({ error: "Failed to create user", details: error.message }, { status: 500 });
    }
  }
