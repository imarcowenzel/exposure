import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    imageKey: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    posts: [
      {
        type: String,
      },
    ],
    googleProvider: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
