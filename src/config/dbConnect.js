import mongoose from "mongoose";
import getenv from "getenv";

const STRING_DB = getenv("STRING_DB");

mongoose.connect(STRING_DB);

let db = mongoose.connection;

export default db;
