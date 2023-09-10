import express from "express";
import { getAllRealisation, addRealisation, deleteRealisation ,updateRealisation } from "../controllers/realisationControllers.js";
const router = express.Router()
router.get("/getAllRealisation", getAllRealisation)
router.post("/addNewRealisation", addRealisation)
router.delete("/delete/:realisationID", deleteRealisation)
router.put('/update-realisation/:realisationID',updateRealisation)
export default router 