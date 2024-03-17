import mongoose, { Schema, model } from "mongoose";

export interface Character {
  name: string;
  stats: {
    hp: number;
    stamina: number;
    attack: number;
    defence: number;
  };
}

const schema = new Schema<Character>({
  name: String,
  stats: {
    hp: Number,
    stamina: Number,
    attack: Number,
    defence: Number,
  },
});

export const Character = model<Character>("Character", schema, "characters");
