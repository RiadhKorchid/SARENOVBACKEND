import express from "express";
import { getAllRealisation, addRealisation, deleteRealisation } from "../controllers/realisationControllers.js";
const router = express.Router()
router.get("/getAllRealisation", getAllRealisation)
router.post("/addNewRealisation", addRealisation)
router.delete("/delete/:realisationID", deleteRealisation)
export default router 