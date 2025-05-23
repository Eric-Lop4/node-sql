import { Router } from "express";
import {
  getAllTiposDisp,
  getTipoDispById,
  createTipoDisp,
  updateTipoDisp,
  deleteTipoDisp
} from "../controllers/typeDisp.controllers.js";

const router = Router();

router.get("/tipos", getAllTiposDisp);
router.get("/tipos/:id", getTipoDispById);
router.post("/tipos", createTipoDisp);
router.put("/tipos/:id", updateTipoDisp);
router.delete("/tipos/:id", deleteTipoDisp);

export default router;
