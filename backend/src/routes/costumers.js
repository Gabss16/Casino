import express, { Router } from "express";
import costumersController from "../controllers/costumersController.js"
//Router que nos ayuda a color métodos
// que tendrá mi ruta
 
 
//Router nos ayuda a color los métodos que tendrá mi ruta
const router = express.Router();
 
 
router.route("/")
.get(costumersController.getCostumers)
router.route("/:id")
.put(costumersController.updateCostumers)
.delete(costumersController.deleteCostumers);
 
export default router;