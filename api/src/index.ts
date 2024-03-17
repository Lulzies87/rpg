import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { Character } from "./character.model";

const app = express();

app.use(cors());
app.use(json());

app.get("/status", (_, res) => {
  res.status(200);
  res.json({ ok: true });
});

app.post("/api/characters", async (req, res) => {
  try {
    const { name, stats } = req.body;
    const character = new Character({ name, stats });
    await character.save();
    res.status(201).json({ message: "Character saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save character" });
  }
});

async function init() {
  const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

  if (!mongoConnectionString) {
    throw new Error("must configure mongo connection string");
  }

  await mongoose.connect(mongoConnectionString, {
    dbName: "rpg",
  });

  app.listen(3000, () => console.log("Listening on port 3000"));
}

init();
