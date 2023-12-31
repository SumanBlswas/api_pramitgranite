import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
  password: String,
  position: String,
  img: String,
  address: String,
});

const userModel = mongoose.model("user", userSchema);

export { userModel };
