// serviceRoutes.js
import express from "express"
import { getAllServices, addService,deleteService } from "../controllers/serviceControllers.js";
const router = express.Router();

// Routes for services
router.get("/getAllServices", getAllServices);
router.post("/addService", addService);
router.delete("/delete-service/:serviceId", deleteService)
export default router;
