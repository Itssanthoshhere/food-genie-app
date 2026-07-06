import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
  connectDB();
});
