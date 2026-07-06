import User from "../models/user.model.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

// Sign up
export const signUp = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, passwordConfirm, phoneNumber } = req.body;

  let avatar = [];

  // Avatar not provided while signup then,
  if (
    !req.body.avatar ||
    req.body.avatar === "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  ) {
    avatar = {
      public_id: "default",
      url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    };
  } else {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    avatar = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    avatar,
  });

  sendToken(user, 201, res);
});

// Sign in
export const signIn = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email id and password"), 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.correctPassword(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password not matched"));
  }

  sendToken(user, 200, res);
});
