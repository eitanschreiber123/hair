import connectDB from "../../../../lib/mongodb";
import mongoose from "mongoose";
import {OtherOrderType, PickupOrderType} from '../../../models'

export async function GET(req) {
  try {
    await connectDB();

    const pickupOrders = await PickupOrderType.find();

    return new Response(JSON.stringify(pickupOrders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching pickup orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch pickup orders", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { location, order } = body;

    // Validate request body
    if (!location || !order) {
      return new Response(
        JSON.stringify({ error: "Missing 'location' or 'order' in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create and save the order in the 'otherordertypes' collection
    const newOrder = new OtherOrderType(order);
    await newOrder.save();

    // Push it into the matching PickupOrderType document
    const updatedPickupOrder = await PickupOrderType.findOneAndUpdate(
      { location },
      { $push: { orders: newOrder } },
      { new: true }
    );

    if (!updatedPickupOrder) {
      return new Response(
        JSON.stringify({ error: "Pickup order not found for this location" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(updatedPickupOrder),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error updating pickup order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update pickup order", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { location, orderId, status, amount } = body;

    if (!location || !orderId || !status) {
      return new Response(
        JSON.stringify({ error: "Missing 'location', 'orderId' or 'status'" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare update fields
    const updateFields = { status };
    if (amount !== undefined) {
      updateFields.amount = amount;
    }

    // Step 1: Update in the OtherOrderType collection
    const updatedOrder = await OtherOrderType.findByIdAndUpdate(
      orderId,
      updateFields,
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(
        JSON.stringify({ error: "Order not found in OtherOrderType collection" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 2: Update in PickupOrderType.orders embedded array
    const pickupOrderDoc = await PickupOrderType.findOne({ location });

    if (!pickupOrderDoc) {
      return new Response(
        JSON.stringify({ error: "Pickup order not found for this location" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const orderIndex = pickupOrderDoc.orders.findIndex(o => o._id.toString() === orderId);
    if (orderIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Order not found in pickup orders" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update fields in the embedded document
    pickupOrderDoc.orders[orderIndex].status = status;
    if (amount !== undefined) {
      pickupOrderDoc.orders[orderIndex].amount = amount;
    }

    await pickupOrderDoc.save();

    return new Response(
      JSON.stringify(pickupOrderDoc),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error updating order status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update order status", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
