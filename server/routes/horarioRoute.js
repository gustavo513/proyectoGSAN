import { Router } from "express";

import { getHorarios, getHorario, postHorario, putHorario, deleteHorario  } from "../controllers/horarioController.js";

const router = Router();

router.get("/horario", getHorarios);

router.get("/horario/:id", getHorario);

router.post("/horario", postHorario);

router.put("/horario/:id", putHorario);

router.delete("/horario/:id", deleteHorario);

export default router;