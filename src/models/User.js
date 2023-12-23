import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    role: { type: String, required: false, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);