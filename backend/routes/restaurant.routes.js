import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.route("/").get(getAllRestaurants);
router.route("/:storeId", getRestaurantById);

export default router;
