// serviceRoutes.js
import express from "express"
import { getAllServices, addService, deleteService, getServiceById, updateService } from "../controllers/serviceControllers.js";
import uploadMiddlwere from "../middleware/uploadMiddlewere.js"
import adminMiddleware from "../middleware/adminMiddleware.js"
const router = express.Router();

router.get("/getAllServices", getAllServices);
router.get("/getServiceById/:id", getServiceById)
router.post("/addService",adminMiddleware, uploadMiddlwere.single('image'), addService);
router.delete("/delete-service/:serviceId",adminMiddleware, deleteService)
router.put("/update-service/:serviceId",adminMiddleware, updateService)
export default router;
