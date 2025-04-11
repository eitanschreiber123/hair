import connectDB from "../../../../lib/mongodb";
import mongoose from "mongoose";
import {ActiveUserType, CartItemType, CartSubType, CartType, OrderType, SubType, OtherOrderType,UserType} from '../../../models'

export async function PUT(req) {
    try {
      await connectDB();
      const body = await req.json();
  
      if (!body || !body.user) {
        return Response.json({ error: "Missing 'user' in request body" }, { status: 400 });
      }
  
      // Replace existing active user (we assume only one)
      let updated;
  
      const existing = await ActiveUserType.findOne();
      if (existing) {
        existing.user = body.user;
        updated = await existing.save();
      } else {
        const newActive = new ActiveUserType({ user: body.user });
        updated = await newActive.save();
      }
  
      return Response.json(updated, { status: 200 });
    } catch (error) {
      console.error("Error updating active user:", error);
      return Response.json({ error: "Failed to update active user", details: error.message }, { status: 500 });
    }
  }
  