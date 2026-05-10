import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String
});

const Order = new model("Order", orderSchema);

export default Order;