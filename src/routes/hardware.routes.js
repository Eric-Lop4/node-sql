import { Router } from "express";
import {
  getHardware,
  getHardwareById,
  createHardware,
  updateHardware,
  deleteHardware
} from "../controllers/hardware.controllers.js";

const router = Router();

router.get("/hardware", getHardware);
router.get("/hardware/:id", getHardwareById);
router.post("/hardware", createHardware);
router.put("/hardware/:id", updateHardware);
router.delete("/hardware/:id", deleteHardware);

export default router;
