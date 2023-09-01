import  express  from "express";
import { getAllRealisation,addRealisation } from "../controllers/realisationControllers.js";
const router =express.Router()
router.get ("/realisation",getAllRealisation)
router.post("/realisation",addRealisation)

export default router 