import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  img1: File,
  brand: String,
  title: String,
  description: String,
  price: String,
  size: String,
  love_count: String,
  rating: String,
  category: String,
});

const productModel = mongoose.model("menProduct", productSchema);

export { productModel };
