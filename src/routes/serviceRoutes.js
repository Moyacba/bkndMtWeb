// src/routes/serviceRoutes.js
import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  deliveryService,
} from "../controllers/serviceController.js";

const router = express.Router();

// Obtener todos los servicios
router.get("/", getServices);

// Obtener un servicio por ID
router.get("/:id", getServiceById);

// Crear un nuevo servicio
router.post("/", createService);

// Crear un nuevo servicio
router.post("/delivery/:id", deliveryService);

// Actualizar un servicio
router.put("/:id", updateService);

// Eliminar un servicio
router.delete("/:id", deleteService);

export default router;
