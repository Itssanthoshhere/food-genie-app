import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/eats/stores", restaurantRoutes);

export default app;
