import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the restaurant name"],
    trim: true,
    maxLength: [100, "Restaurant name cannot be more than 100 characters"],
  },

  isVeg: {
    type: Boolean,
    default: false,
  },

  address: {
    type: String,
    required: [true, "Please provide address"],
  },

  ratings: {
    type: Number,
    default: 0,
    min: [0, "Ratings must be at least 0"],
    max: [5, "Ratings cannot exceed 5"],
  },

  numberOfReviews: {
    type: Number,
    default: 0,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },

    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (val) {
          return (
            val.length === 2 &&
            val[0] >= -180 &&
            val[0] <= 180 &&
            val[1] >= -90 &&
            val[1] <= 90
          );
        },
        message: "Coordinates must be a valid [longitude, latitude] array",
      },
    },
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      Comment: {
        type: String,
        required: true,
      },
    },
  ],

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

restaurantSchema.index({ location: "2dsphere" });
restaurantSchema.index({ name: "text" });

export default mongoose.model("Restaurant", restaurantSchema);
