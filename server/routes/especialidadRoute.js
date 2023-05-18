import { Router } from "express";
import { getEspecialidades, getEspecialidad, createEspecialidad, updateEspecialidad, deleteEspecialidad } from "../controllers/especialidadController.js";
const router = Router();

router.get("/especialidad", getEspecialidades);

router.get("/especialidad/:id", getEspecialidad);

router.post("/especialidad", createEspecialidad);

router.put("/especialidad/:id", updateEspecialidad);

router.delete("/especialidad/:id", deleteEspecialidad);

export default router;