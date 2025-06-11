import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;
