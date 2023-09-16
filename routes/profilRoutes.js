import express from"express"
import { changeProfilInformations,changeProfilPassword } from "../controllers/profilControllers.js"
const router =express.Router()

router.patch("/",changeProfilInformations)
router.post("/changepassword",changeProfilPassword)
export default router