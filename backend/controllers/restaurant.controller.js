import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Restaurant from "../models/restaurant.model.js";
import APIFeatures from "../utils/apiFeatures.js";

// Get all the restaurants
export const getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Restaurant.find(), req.query)
    .search()
    .filter(["ratings", "isVeg"])
    .sort();

  const restaurants = await apiFeatures.query;
  res.status(200).json({
    status: "Success",
    count: restaurants.length,
    restaurants: restaurants,
  });

  // /api/restaurants/keyword=kfc
  // .search()

  // /api/restaurants?sort=rating

  // req from client -> restaurant.find() -> APIFeatures -> Execute query -> Send response back to the client
});
