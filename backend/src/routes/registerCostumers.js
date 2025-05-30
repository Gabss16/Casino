
import express, { Router } from "express";
import registerCustomersController from "../controllers/registerCostumersController.js"
//Router que nos ayuda a color métodos
// que tendrá mi ruta
 
 
//Router nos ayuda a color los métodos que tendrá mi ruta
const router = express.Router();
 
 
router.route("/").post(registerCustomersController.register)

export default router;