import { Schema, model } from 'mongoose';

const positionSchema = new Schema({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
})

const Position = new model("Position", positionSchema);

export default Position;