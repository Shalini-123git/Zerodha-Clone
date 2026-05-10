import { Schema, model }from "mongoose";

const holdingSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
});

const Holding = new model("Holding", holdingSchema);

export default Holding;