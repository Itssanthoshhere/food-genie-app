import User from "../models/user.model.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/sendToken.js";
import cloudinary from "cloudinary";

// Sign up
export const signUp = catchAsyncErrors(async (req, res) => {
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
