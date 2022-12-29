import mongoose from "mongoose";

mongoose.connect("mongodb+srv://henrique:123@alura.nbs5d7c.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;