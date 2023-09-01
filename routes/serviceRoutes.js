// serviceRoutes.js
import express from "express"
import { getAllServices, addService } from "../controllers/serviceControllers.js";
const router = express.Router();

// Routes for services
router.get("/", getAllServices);
router.post("/", addService);

export default router;
