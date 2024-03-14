import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(json());

app.get("/status", (_, res) => {
    res.status(200);
    res.json({ ok: true });
});

async function init() {
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

    if (!mongoConnectionString) {
        throw new Error("must configure mongo connection string");
    }

    await mongoose.connect(mongoConnectionString, {});

    app.listen(3000, () => console.log("Listening on port 3000"));
}

init();
