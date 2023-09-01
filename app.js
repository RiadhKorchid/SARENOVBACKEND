import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import serviceRoutes from "./routes/serviceRoutes.js"
import realisationRoutes from "./routes/realisationRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { signIn } from "./controllers/authControllers.js";
const app = express();
dotenv.config();
const url = process.env.DB_URL;
const port = process.env.PORT || 5000;
app.use("*", cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });

app.use(express.json({ limit: "50mb" }));
app.post("/login", signIn)
app.use("/service", serviceRoutes)
app.use("/realisation", realisationRoutes)
app.use('/orders', orderRoutes)
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
