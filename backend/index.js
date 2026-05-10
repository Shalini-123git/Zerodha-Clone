import express from "express";
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import Holding from "./schema/holdingsSchema.js";
import Watchlist from "./schema/watchList.js";
import Position from './schema/positionSchema.js';
import bodyParser from "body-parser";
import Order from "./schema/orderSchmea.js";


const port = process.env.PORT || 3000;
const app = express();

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongoDB");
    }catch (error) {
        console.log("mongo connection error", error)
    }
}

//db connection
dbConnection();

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("hello world");
})

app.get("/allPositions", async (req, res) => {
    const allPositions = await Position.find({});

    res.status(200).json(allPositions);
})

app.get("/allHoldings", async (req, res) => {
    const allHoldings = await Holding.find({});

    res.status(200).json(allHoldings);
})

app.get("/allwatchlist", async (req, res) => {
    const allwatchlist = await Watchlist.find({});

    res.status(200).json(allwatchlist);
})

app.get("/allOrders", async (req, res) => {
    const allOrders = await Order.find({});

    res.status(200).json(allOrders);
})


app.post("/newOrder", async (req, res) => {
    console.log(req.body.name);
    const newOrder = new Order({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode
    });

    await newOrder.save();
    res.send("order send!");
})

app.delete("/order/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, qty, price, mode } = req.body;

        await Watchlist.findByIdAndDelete(id);

        const sellOrder = new Order({
            name,
            qty,
            price,
            mode
        });

        await sellOrder.save();

        res.status(200).json({
            success: true,
            message: "Stock sold successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})
