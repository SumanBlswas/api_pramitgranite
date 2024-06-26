import express from "express";
import { productModel } from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const user = await productModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

productRouter.post("/add", async (req, res) => {
  const {
    img1,
    brand,
    title,
    description,
    price,
    size,
    love_count,
    rating,
    category,
  } = req.body;

  try {
    const user = new productModel({
      img1,
      brand,
      title,
      description,
      price,
      size,
      love_count,
      rating,
      category,
    });
    await user.save();
    res.status(200).send({ msg: "A new product has been added" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

productRouter.patch("/updates/:userID", async (req, res) => {
  const payload = req.body;
  const { userID } = req.params;
  try {
    await productModel.findByIdAndUpdate({ _id: userID }, payload);
    res.status(200).send({ msg: `Product with id ${userID} has been updated` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

productRouter.delete("/delete/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await productModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: `Product with id ${userID} has been deleted` });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

// for searching and filteration part
productRouter.get("/query", async (req, res) => {
  let { brand, title, price, size, category } = req.query;
  try {
    let filter = {};
    if (brand) {
      filter.brand = { $regex: brand };
    }
    if (title) {
      filter.title = { $regex: title };
    }
    if (price) {
      filter.price = { $regex: price };
    }
    if (size) {
      filter.size = { $regex: size };
    }
    if (category) {
      filter.category = { $regex: category };
    }
    let user = await productModel.find(filter);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

export { productRouter };
