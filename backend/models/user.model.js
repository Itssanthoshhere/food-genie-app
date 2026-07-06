import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Enter valid email"],
    },

    password: {
      type: String,
      required: [true, "Enter password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Confirm Password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same",
      },
    },

    phoneNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Enter valid phone number"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      public_id: String,
      url: String,
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

// Hash Password
// -> pre("save") => runs before data is saved

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  // Track when the password was changed (skip on first creation)
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
});

// Password compare at login time
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Checks whether the user's pass was changes after getting jwt token. If yes, the old token is invalid and the user must login again.
UserSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// Custom method to generate jwt token
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export default mongoose.model("User", UserSchema);
