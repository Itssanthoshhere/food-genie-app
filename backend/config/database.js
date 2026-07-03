import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI).then((con) => {
    console.log("Connected to MongoDB!");
  });
};

export default connectDB;
