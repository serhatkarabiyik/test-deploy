import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Boolean, required: true }, // 0 = admin, 1 = user
});

const User = mongoose.model("User", userSchema);

export default User;
