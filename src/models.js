import connectDB from "../lib/mongodb";
import mongoose from "mongoose";

const CartItemTypeSchema = new mongoose.Schema({ hair: Number, liquid: Number })
const CartSubTypeSchema = new mongoose.Schema({ weekly: CartItemTypeSchema, monthly: CartItemTypeSchema })
const CartTypeSchema = new mongoose.Schema({ sub: CartSubTypeSchema, one: CartItemTypeSchema })
const OrderTypeSchema = new mongoose.Schema({ date:String,boxes: Number,name:String,address:String,email:String,payment:String,info:String, location:String,user: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" } }, { strict: false });
const OtherOrderTypeSchema = new mongoose.Schema({name: String, date: String, status: String})
const PickupOrderTypeSchema = new mongoose.Schema({ location: String, orders:[]}, { strict: false });
const SubTypeSchema = new mongoose.Schema({ sub:String,boxes: Number,name:String,address:String,email:String,payment:String,info:String,location:String})
const HistoryTypeSchema = new mongoose.Schema({price: Number, items: CartItemTypeSchema, date: String})
const CustomerPaymentTypeSchema = new mongoose.Schema({cardName:String, cardNumber: String, expiryDate: String, cvv: Number})
const CustomerInfoTypeSchema = new mongoose.Schema({address: String, payment: CustomerPaymentTypeSchema})
const BarberInfoTypeSchema = new mongoose.Schema({address: String, info: String,payment: String,subPayment: String,subInfo:String})
const CustomerSubTypeSchema = new mongoose.Schema({sub:String, price: Number, items: CartItemTypeSchema})
const CustomerDataTypeSchema = new mongoose.Schema({cart: CartTypeSchema, history: [], sub: CustomerSubTypeSchema, info: CustomerInfoTypeSchema})
const BarberDataTypeSchema = new mongoose.Schema({orders: [], info:BarberInfoTypeSchema}, { strict: false })
const UserTypeSchema = new mongoose.Schema({name: String,
    email: String,
    password: String,
    address: String,
    orders:[],
    info: String,
    payment: String,
    subPayment: String,
    subInfo:String,
    cart: CartTypeSchema,
    customerData: CustomerDataTypeSchema, barberData:BarberDataTypeSchema}, { strict: false })
    const ActiveUserTypeSchema = new mongoose.Schema({ user: UserTypeSchema })
    const EmployeeTypeSchema = new mongoose.Schema({name: String,email: String,password: String})

export const ActiveUserType = mongoose.models.ActiveUserType || mongoose.model("ActiveUserType", ActiveUserTypeSchema, "activeusertypes");
export const CartItemType = mongoose.models.CartItemType || mongoose.model("CartItemType", CartItemTypeSchema, "cartitemtypes");
export const CartSubType = mongoose.models.CartSubType || mongoose.model("CartSubType", CartSubTypeSchema, "cartsubtypes");
export const CartType = mongoose.models.CartType || mongoose.model("CartType", CartTypeSchema, "carttypes");
export const OrderType = mongoose.models.OrderType || mongoose.model("OrderType", OrderTypeSchema, "ordertypes");
export const PickupOrderType = mongoose.models.PickupOrderType || mongoose.model("PickupOrderType", PickupOrderTypeSchema, "pickupordertypes");
export const SubType = mongoose.models.SubType || mongoose.model("SubType", SubTypeSchema, "subtypes");
export const OtherOrderType = mongoose.models.OtherOrderType || mongoose.model("OtherOrderType", OtherOrderTypeSchema, "otherordertypes")
export const UserType = mongoose.models.UserType || mongoose.model("UserType", UserTypeSchema, "usertypes");
export const EmployeeType = mongoose.models.EmployeeType || mongoose.model("EmployeeType", EmployeeTypeSchema, "employeetypes");
export const HistoryType = mongoose.models.HistoryType || mongoose.model("HistoryType", HistoryTypeSchema, "historytypes");