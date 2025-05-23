import { Router } from "express";
import {
  getAllEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
} from "../controllers/empleados.controllers.js";

const router = Router();

router.get("/empleados", getAllEmpleados);
router.get("/empleados/:id", getEmpleadoById);
router.post("/empleados", createEmpleado);
router.put("/empleados/:id", updateEmpleado);
router.delete("/empleados/:id", deleteEmpleado);

export default router;
