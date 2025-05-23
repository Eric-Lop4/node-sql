import { Router } from "express";
import {
  getAllOffice,
  getOfficeById,
  createOffice,
  updateOffice,
  deleteOffice
} from "../controllers/office.controlles.js";

const router = Router();

router.get("/office", getAllOffice);
router.get("/office/:id", getOfficeById);
router.post("/office", createOffice);
router.put("/office/:id", updateOffice);
router.delete("/office/:id", deleteOffice);

export default router;
