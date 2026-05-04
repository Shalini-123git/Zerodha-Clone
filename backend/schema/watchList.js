import { Schema, model } from 'mongoose';

const watchListSchema = new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
})

const Watchlist = new model("Watchlist", watchListSchema);

export default Watchlist;