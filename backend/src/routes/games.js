import express, { Router } from "express";
import gamesController from "../controllers/gamesController.js"
import multer from "multer";
//Router que nos ayuda a color métodos
// que tendrá mi ruta
 
 
//Router nos ayuda a color los métodos que tendrá mi ruta
const router = express.Router();
 
 //configurar una carpeta multer
const upload = multer({dest: "public/"})


router.route("/")
.get(gamesController.getGames)
.post(upload.single("img"),gamesController.createGame)

router.route("/:id")
.put(upload.single("img"),gamesController.updateGame)
.delete(gamesController.deleteGame);

export default router;