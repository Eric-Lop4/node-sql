import { Router } from "express";
import {
  getAllSO,
  getSOById,
  createSO,
  updateSO,
  deleteSO
} from "../controllers/so.controllers.js";

const router = Router();

router.get("/so", getAllSO);
router.get("/so/:id", getSOById);
router.post("/so", createSO);
router.put("/so/:id", updateSO);
router.delete("/so/:id", deleteSO);

export default router;
