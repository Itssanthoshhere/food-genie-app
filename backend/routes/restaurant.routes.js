import express from "express";
import { getAllRestaurants } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.route("/").get(getAllRestaurants);

export default router;
