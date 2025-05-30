import { config } from "../config.js";
import gamesModel from "../models/Games.js"; // asumo que tu archivo se llama así

import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret
});

const gamesController = {};

// Obtener todos los juegos (GET)
gamesController.getGames = async (req, res) => {
  try {
    const games = await gamesModel.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener juegos" });
  }
};

// Crear un juego nuevo (POST)
gamesController.createGame = async (req, res) => {
  try {
    const { name, category, max_bet, min_bet } = req.body;
    let imageURL = "";

    // Subir imagen si existe
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"]
      });
      imageURL = result.secure_url;
    }

    const newGame = new gamesModel({ name, category, max_bet, min_bet, img: imageURL });
    await newGame.save();

    res.json({ message: "Juego guardado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear juego" });
  }
};

// Actualizar un juego por ID (PUT / PATCH)
gamesController.updateGame = async (req, res) => {
  try {
    const { id } = req.params; // id del juego a actualizar
    const { name, category, max_bet, min_bet } = req.body;
    let imageURL;

    // Si hay nueva imagen la subimos
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"]
      });
      imageURL = result.secure_url;
    }

    const updateData = { name, category, max_bet, min_bet };
    if (imageURL) updateData.img = imageURL;

    const updatedGame = await gamesModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedGame) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    res.json({ message: "Juego actualizado correctamente", updatedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar juego" });
  }
};

// Eliminar un juego por ID (DELETE)
gamesController.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGame = await gamesModel.findByIdAndDelete(id);

    if (!deletedGame) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    res.json({ message: "Juego eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar juego" });
  }
};

export default gamesController;
