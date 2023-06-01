import { Router } from "express";
import { getEspecialidades, getEspecialidad, createEspecialidad, updateEspecialidad, deleteEspecialidad } from "../controllers/especialidadController.js";
const router = Router();

router.get("/especialidades", getEspecialidades);

router.get("/especialidades/:id", getEspecialidad);

router.post("/especialidades", createEspecialidad);

router.put("/especialidades/:id", updateEspecialidad);

router.delete("/especialidades/:id", deleteEspecialidad);

export default router;