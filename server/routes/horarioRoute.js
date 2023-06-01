import { Router } from "express";

import { getHorarios, getHorario, postHorario, putHorario, deleteHorario  } from "../controllers/horarioController.js";

const router = Router();

router.get("/horarios", getHorarios);

router.get("/horarios/:id", getHorario);

router.post("/horarios", postHorario);

router.put("/horarios/:id", putHorario);

router.delete("/horarios/:id", deleteHorario);

export default router;