import { Router } from "express";
import {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment
} from "../controllers/assign.controllers.js";

const router = Router();

// Rutas para la tabla pers_Dispositivos_Asignacion
router.get("/dispositivos-asignacion", getAssignments);
router.get("/dispositivos-asignacion/:idEmpleado/:idDispositivo", getAssignment);
router.post("/dispositivos-asignacion", createAssignment);
router.put("/dispositivos-asignacion/:idEmpleado/:idDispositivo", updateAssignment);
router.delete("/dispositivos-asignacion/:idEmpleado/:idDispositivo", deleteAssignment);

export default router;
