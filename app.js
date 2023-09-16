import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import serviceRoutes from "./routes/serviceRoutes.js"
import realisationRoutes from "./routes/realisationRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { logInAdmin } from "./controllers/authControllers.js";
import authMiddleware from "./middleware/authMiddleware.js";
import profilRoutes from "./routes/profilRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(morgan("dev"))
const url = process.env.DB_URL;
const port = process.env.PORT || 5000;
app.use("*", cors({ origin: true, credentials: true }));
app.use(cookieParser());
mongoose
.connect(url)
.then(() => {
  console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });
// Define the storage location for uploaded files
app.use('/uploads', express.static('uploads')); // No leading slash in the path
app.use(express.json({ limit: "50mb" }));
app.post("/loginAdmin", logInAdmin)
app.use("/services", serviceRoutes)
app.use("/realisation", realisationRoutes)
app.use('/orders', orderRoutes)
app.use(morgan('dev'));
app.use(express.json({ limit: "50mb" }));
app.use("/profil",authMiddleware,profilRoutes)
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
