// serviceRoutes.js
import express from "express"
import { getAllServices, addService, deleteService, getServiceById, updateService } from "../controllers/serviceControllers.js";
const router = express.Router();

// Routes for services
router.get("/getAllServices", getAllServices);
router.get('/getServiceById/:serviceId', getServiceById)
router.post("/addService", addService);
router.delete("/delete-service/:serviceId", deleteService)
router.put("/update-service/:serviceId", updateService)
export default router;
