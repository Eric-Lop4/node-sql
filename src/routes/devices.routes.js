import { Router } from "express";
import {
  getDevices,
  getDevice,
  createDevice,
  updateDevice,
  deleteDevice
} from "../controllers/devices.controllers.js";

const router = Router();

router.get("/dispositivos", getDevices);
router.get("/dispositivos/:id", getDevice);
router.post("/dispositivos", createDevice);
router.put("/dispositivos/:id", updateDevice);
router.delete("/dispositivos/:id", deleteDevice);

export default router;
