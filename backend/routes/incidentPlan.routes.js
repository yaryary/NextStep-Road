import { Router } from "express";
import { generateIncidentPlan } from "../controllers/incidentPlan.controller.js";

const router = Router();
router.post("/", generateIncidentPlan);

export default router;