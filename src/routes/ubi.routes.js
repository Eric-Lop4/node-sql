import { Router } from "express";
import {
  getAllUbicaciones,
  getUbicacionById,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion
} from "../controllers/ubi.controllers.js";

const router = Router();

router.get("/ubicacion", getAllUbicaciones);
router.get("/ubicacion/:id", getUbicacionById);
router.post("/ubicacion", createUbicacion);
router.put("/ubicacion/:id", updateUbicacion);
router.delete("/ubicacion/:id", deleteUbicacion);

export default router;
