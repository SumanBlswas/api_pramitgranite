import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs/promises";
import { connection } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRouter.js";
// import { womenProductRouter } from "./routes/womenProductRoutes.js";
import { checker } from "./middlewares/checker.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./dist/api.html", "utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

app.use("/users", userRouter);
app.use("/products", productRouter);
// app.use("/womenproducts", womenProductRouter);
app.use("/admins", adminRouter);
app.use(checker);
app.use("/cart", cartRouter);

app.listen(process.env.PORT_NUMBER, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
  console.log(`Connected at the port ${process.env.PORT_NUMBER}`);
});
