import express from "express";
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import Holding from "./schema/holdingsSchema.js";
import Watchlist from "./schema/watchList.js";
import Position from './schema/positionSchema.js';

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`server is listening on http://localhost:${port}`);
});

app.use(cors());
app.get("/", (req, res) => {
    res.send("hello world");
})


