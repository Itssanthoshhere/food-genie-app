import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
  connectDB();
});
