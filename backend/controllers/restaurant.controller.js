import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Restaurant from "../models/restaurant.model.js";
import APIFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

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

// Get restaurants by its id
export const getRestaurantById = catchAsyncErrors(async (req, res, next) => {
  // api/v1/eats/stores/675784848344
  // api/v1/eats/:storeId

  const restaurant = await Restaurant.findById(req.params.storeId);

  if (!restaurant) {
    return next(new ErrorHandler("No Restaurant found with the ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: restaurant,
  });
});
