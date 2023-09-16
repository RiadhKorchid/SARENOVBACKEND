import express from "express";
import { getAllRealisation, addRealisation, deleteRealisation, updateRealisation } from "../controllers/realisationControllers.js";
import upload from "../middleware/uploadMiddlewere.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router()
router.get("/getAllRealisation", getAllRealisation)
router.post("/addNewRealisation",adminMiddleware, upload.single("image"), addRealisation)
router.delete("/delete/:realisationID",adminMiddleware ,deleteRealisation)
router.put('/update-realisation/:realisationID',adminMiddleware, updateRealisation)
export default router 