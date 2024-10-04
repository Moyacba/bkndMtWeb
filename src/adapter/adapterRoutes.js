// src/routes/customerRoutes.js
import express from "express";
import { getOldProducts, getOldServices } from "./adapterController.js";

const router = express.Router();

// Obtener todos los servicios
router.get("/oldservices", getOldServices);

// Obtener todos los productos
router.get("/oldproducts", getOldProducts);

export default router;
