import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://pealh0320:245810@todo.uhmep5x.mongodb.net/?retryWrites=true&w=majority&appName=Todo";

mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

db.on("error", () => {
  console.log("error connecting to data base");
});

export default db;
